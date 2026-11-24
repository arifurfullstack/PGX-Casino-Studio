import crypto from "node:crypto";
import { getIntegrationConfig } from "./integrationService";
import {
  updateReservationStatus,
  getReservationById,
} from "./reservationService";
import { dispatchReservationEmails } from "./emailService";

export interface CreateCardSessionInput {
  reservationId: string;
  customerEmail: string;
  customerName: string;
  designName: string;
  returnUrl?: string;
}

export type CreateStripeSessionInput = CreateCardSessionInput;

export function getPgxGatewaySettings() {
  return {
    apiUrl: (process.env.PGX_GATEWAY_URL || "https://api.pgxgateway.com")
      .trim()
      .replace(/\/+$/, ""),
    merchantRefId: (process.env.PGX_MERCHANT_REF_ID || "").trim(),
    webhookSecret: (process.env.PGX_WEBHOOK_SECRET || "").trim(),
  };
}

/**
 * Verifies an incoming PGX Gateway webhook signature using constant-time HMAC-SHA256.
 * Supports both timestamped production signatures (`${timestamp}.${rawBody}`) and raw body signatures.
 */
export function verifyPgxWebhookSignature(
  rawBody: string | Buffer,
  signature: string | null | undefined,
  secret: string,
  timestamp?: string | null
): boolean {
  if (!signature || !secret) return false;
  const cleanSig = signature.trim();
  if (!/^[a-f0-9]{64}$/i.test(cleanSig)) return false;

  try {
    const providedDigest = Buffer.from(cleanSig, "hex");
    const bodyText = typeof rawBody === "string" ? rawBody : rawBody.toString("utf8");

    if (timestamp) {
      const tsDigest = crypto
        .createHmac("sha256", secret)
        .update(`${timestamp.trim()}.${bodyText}`)
        .digest();
      if (
        tsDigest.length === providedDigest.length &&
        crypto.timingSafeEqual(tsDigest, providedDigest)
      ) {
        return true;
      }
    }

    const rawDigest = crypto.createHmac("sha256", secret).update(rawBody).digest();
    if (
      rawDigest.length === providedDigest.length &&
      crypto.timingSafeEqual(rawDigest, providedDigest)
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Initiates a server-to-server hosted card checkout session via PGX Gateway.
 * Never loads or invokes client-side Stripe SDKs.
 */
export async function createPgxReservationSession(
  input: CreateCardSessionInput
): Promise<{ success: boolean; url?: string; sessionId?: string; error?: string }> {
  try {
    const [config, reservation] = await Promise.all([
      getIntegrationConfig(),
      getReservationById(input.reservationId),
    ]);

    const cardConfig = config.payment.stripe;
    const { apiUrl, merchantRefId } = getPgxGatewaySettings();

    if (!cardConfig.enabled) {
      return {
        success: false,
        error: "Card gateway is currently disabled in Admin settings.",
      };
    }

    if (!merchantRefId) {
      return {
        success: false,
        error: "PGX_MERCHANT_REF_ID is not configured on the server.",
      };
    }

    const origin = (
      input.returnUrl ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://royalcasinoclub.com"
    )
      .trim()
      .replace(/\/+$/, "");

    const amount = reservation?.reservationFee || 1000;
    const currency = (cardConfig.currency || "USD").toUpperCase();

    const response = await fetch(`${apiUrl}/api/v1/checkout/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        refId: merchantRefId,
        amount,
        currency,
        orderId: input.reservationId,
        productName: `5-Day Reservation Holding — ${input.designName}`,
        customerEmail: input.customerEmail,
        successUrl: `${origin}/confirmation/reservation?id=${encodeURIComponent(input.reservationId)}&payment=success`,
        cancelUrl: `${origin}/select-design?cancelled=1&reservationId=${encodeURIComponent(input.reservationId)}`,
        webhookUrl: `${origin}/api/webhooks/pgx`,
        mode: cardConfig.mode === "test" ? "test" : "live",
      }),
      signal: AbortSignal.timeout(15000),
    });

    const data = (await response.json()) as {
      success?: boolean;
      checkoutUrl?: string;
      sessionId?: string;
      paymentRef?: string;
      message?: string;
    };

    if (!response.ok || !data.success || !data.checkoutUrl) {
      return {
        success: false,
        error: data.message || "Failed to initiate PGX Gateway checkout session.",
      };
    }

    return {
      success: true,
      url: data.checkoutUrl,
      sessionId: data.sessionId || data.paymentRef,
    };
  } catch (error) {
    console.error("PGX Gateway session creation failed:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to initiate card checkout session",
    };
  }
}

// Backward-compatible export alias for existing server actions
export const createStripeReservationSession = createPgxReservationSession;

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

    const txRef = `${network}:${txHash.trim()}`;
    await updateReservationStatus(reservationId, "active", "paid", txRef);
    reservation.paymentTransactionId = txRef;
    reservation.paymentStatus = "paid";
    reservation.status = "active";

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
