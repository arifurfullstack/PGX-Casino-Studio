import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getIntegrationConfig } from "@/services/integrationService";
import { updateReservationStatus, getReservationById } from "@/services/reservationService";
import { dispatchReservationEmails } from "@/services/emailService";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const config = await getIntegrationConfig();
    const { stripe } = config.payment;

    if (!stripe.secretKey) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
    }

    const stripeClient = new Stripe(stripe.secretKey.trim());
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event: Stripe.Event;

    if (stripe.webhookSecret && sig) {
      try {
        event = stripeClient.webhooks.constructEvent(body, sig, stripe.webhookSecret.trim());
      } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
      }
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const reservationId = session.client_reference_id || session.metadata?.reservationId;

      if (reservationId) {
        await updateReservationStatus(reservationId, "active", "paid");
        const reservation = await getReservationById(reservationId);
        if (reservation) {
          reservation.paymentTransactionId = `stripe:${session.payment_intent || session.id}`;
          reservation.paymentStatus = "paid";
          reservation.status = "active";
          dispatchReservationEmails(reservation).catch((err) =>
            console.error("[Webhook Email Error]:", err)
          );
        }
        console.log(`[Stripe Webhook] Reservation ${reservationId} successfully marked paid.`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook processing error" },
      { status: 500 }
    );
  }
}
