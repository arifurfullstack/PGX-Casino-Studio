import { NextResponse } from "next/server";
import {
  getPgxGatewaySettings,
  verifyPgxWebhookSignature,
} from "@/services/paymentService";
import {
  getReservationById,
  updateReservationStatus,
} from "@/services/reservationService";
import { dispatchReservationEmails } from "@/services/emailService";
import { connectToDatabase } from "@/lib/mongodb";
import { ReservationModel } from "@/models";

export const dynamic = "force-dynamic";

interface PgxWebhookPayload {
  id?: string;
  event?: string;
  type?: string;
  status?: string;
  transactionId?: string;
  paymentRef?: string;
  sessionId?: string;
  orderId?: string;
  grossAmount?: number;
  amountMinor?: number;
  currency?: string;
  metadata?: {
    rawOrderId?: string;
    [key: string]: unknown;
  };
}

/**
 * Resolves a reservation even if PGX normalized `AIG-RES-00001` into `ORD-0001`.
 */
async function resolveReservationId(payload: PgxWebhookPayload): Promise<string | null> {
  const rawOrderId =
    (typeof payload.metadata?.rawOrderId === "string" && payload.metadata.rawOrderId) ||
    payload.orderId ||
    "";

  if (!rawOrderId) return null;

  const exact = await getReservationById(rawOrderId);
  if (exact) return exact.reservationId;

  // Fallback for normalized ORD-XXXX format
  const digits = rawOrderId.replace(/\D/g, "");
  if (digits) {
    await connectToDatabase();
    const doc = await ReservationModel.findOne({
      reservationId: new RegExp(`${digits}$`, "i"),
    })
      .select("reservationId")
      .lean();
    if (doc?.reservationId) return doc.reservationId;
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const { webhookSecret } = getPgxGatewaySettings();
    if (!webhookSecret) {
      return NextResponse.json(
        { error: "PGX_WEBHOOK_SECRET is not configured" },
        { status: 500 }
      );
    }

    const rawBody = await req.text();
    const signature = req.headers.get("x-pgx-signature");
    const timestamp = req.headers.get("x-pgx-timestamp");

    if (!verifyPgxWebhookSignature(rawBody, signature, webhookSecret, timestamp)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    let payload: PgxWebhookPayload;
    try {
      payload = JSON.parse(rawBody) as PgxWebhookPayload;
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const eventType = payload.event || payload.type || "";
    const reservationId = await resolveReservationId(payload);

    if (!reservationId) {
      return NextResponse.json(
        { error: "Reservation not found for orderId" },
        { status: 422 }
      );
    }

    const reservation = await getReservationById(reservationId);
    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation record not found" },
        { status: 422 }
      );
    }

    if (eventType === "payment.completed" || eventType === "payment.succeeded") {
      // Idempotency guard: safe to retry duplicate webhook deliveries
      if (reservation.paymentStatus === "paid") {
        return NextResponse.json({
          received: true,
          idempotent: true,
          reservationId,
        });
      }

      // Strict amount & currency verification
      const expectedAmount = reservation.reservationFee || 500;
      const paidAmount =
        typeof payload.grossAmount === "number"
          ? payload.grossAmount
          : typeof payload.amountMinor === "number"
            ? payload.amountMinor / 100
            : undefined;

      const currency = (payload.currency || "USD").toUpperCase();
      if (
        paidAmount === undefined ||
        Math.abs(paidAmount - expectedAmount) > 0.01 ||
        currency !== "USD"
      ) {
        return NextResponse.json(
          { error: "Payment amount or currency mismatch" },
          { status: 422 }
        );
      }

      const txRef = `pgx:${payload.transactionId || payload.paymentRef || payload.id || Date.now()}`;
      await updateReservationStatus(reservationId, "active", "paid", txRef);

      reservation.paymentTransactionId = txRef;
      reservation.paymentStatus = "paid";
      reservation.status = "active";

      dispatchReservationEmails(reservation).catch((err) =>
        console.error("[PGX Webhook Email Error]:", err)
      );

      return NextResponse.json({
        received: true,
        status: "paid",
        reservationId,
      });
    }

    if (eventType === "payment.failed" || eventType === "payment.cancelled") {
      if (reservation.paymentStatus === "pending") {
        await updateReservationStatus(
          reservationId,
          reservation.status,
          "failed"
        );
      }
      return NextResponse.json({
        received: true,
        status: "failed",
        reservationId,
      });
    }

    return NextResponse.json({ error: "Unhandled event type" }, { status: 422 });
  } catch (error) {
    console.error("PGX webhook processing error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook processing error" },
      { status: 500 }
    );
  }
}
