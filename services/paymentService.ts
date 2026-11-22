import Stripe from "stripe";
import { getIntegrationConfig } from "./integrationService";
import { updateReservationStatus, getReservationById } from "./reservationService";
import { dispatchReservationEmails } from "./emailService";

export interface CreateStripeSessionInput {
  reservationId: string;
  customerEmail: string;
  customerName: string;
  designName: string;
  returnUrl?: string;
}

export async function createStripeReservationSession(
  input: CreateStripeSessionInput
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const config = await getIntegrationConfig();
    const { stripe } = config.payment;

    if (!stripe.enabled || !stripe.secretKey) {
      return {
        success: false,
        error: "Stripe card gateway is not enabled or secret key is missing in Admin settings.",
      };
    }

    const stripeClient = new Stripe(stripe.secretKey.trim());
    const origin =
      input.returnUrl ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const session = await stripeClient.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: stripe.currency || "usd",
            product_data: {
              name: `5-Day Reservation Holding — ${input.designName}`,
              description: `100% Refundable $500 USD holding deposit. Locks 5% package discount for 120 hours. Ref: ${input.reservationId}`,
            },
            unit_amount: 50000, // $500.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: input.customerEmail,
      client_reference_id: input.reservationId,
      metadata: {
        reservationId: input.reservationId,
        customerName: input.customerName,
        designName: input.designName,
      },
      success_url: `${origin}/select-design?success=1&reservationId=${input.reservationId}`,
      cancel_url: `${origin}/select-design?cancelled=1&reservationId=${input.reservationId}`,
    });

    return { success: true, url: session.url || undefined };
  } catch (error) {
    console.error("Stripe session creation failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to initiate Stripe checkout",
    };
  }
}

export async function recordCryptoPayment(
  reservationId: string,
  txHash: string,
  network = "USDT-TRC20"
): Promise<{ success: boolean; error?: string }> {
  try {
    const reservation = await getReservationById(reservationId);
    if (!reservation) {
      return { success: false, error: "Reservation holding not found." };
    }

    await updateReservationStatus(reservationId, "active", "paid");
    reservation.paymentTransactionId = `${network}:${txHash.trim()}`;
    reservation.paymentStatus = "paid";
    reservation.status = "active";

    // Trigger confirmation receipt email
    dispatchReservationEmails(reservation).catch((err) =>
      console.error("[Crypto Email Error]:", err)
    );

    return { success: true };
  } catch (error) {
    console.error("Crypto payment record failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to register crypto payment",
    };
  }
}
