"use server";

import { revalidatePath } from "next/cache";
import {
  getIntegrationConfig,
  updateIntegrationConfig,
} from "@/services/integrationService";
import { sendEmail } from "@/services/emailService";
import {
  createStripeReservationSession,
  recordCryptoPayment,
} from "@/services/paymentService";
import { IntegrationConfigData } from "@/types";

export async function getIntegrationConfigAction(): Promise<IntegrationConfigData> {
  return getIntegrationConfig();
}

export async function saveIntegrationConfigAction(data: IntegrationConfigData) {
  try {
    const success = await updateIntegrationConfig(data);
    revalidatePath("/admin/settings");
    revalidatePath("/admin");
    revalidatePath("/select-design");
    return { success };
  } catch (error) {
    console.error("Save integration config error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save configuration",
    };
  }
}

export async function testEmailAction(targetEmail: string) {
  try {
    const config = await getIntegrationConfig();
    const provider = config.email.activeProvider;

    if (provider === "disabled") {
      return {
        success: false,
        error: "Email provider is set to Disabled in settings. Please select Resend, Mailgun, or SMTP first.",
      };
    }

    const testHtml = `
      <div style="font-family: sans-serif; background: #0c041c; color: #fff; padding: 25px; border-radius: 12px; border: 2px solid #ffd700; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #ffd700; margin-top: 0;">✓ All I Gaming — Email Test Passed!</h2>
        <p>This is a test notification confirming that your <strong>${provider.toUpperCase()}</strong> credentials are functioning properly.</p>
        <p style="color: #a78bfa; font-size: 13px;">Sender: ${config.email.fromName} &lt;${config.email.fromEmail}&gt;</p>
        <p style="color: #9ca3af; font-size: 12px; border-top: 1px solid #3b1675; padding-top: 10px; margin-top: 15px;">
          Timestamp: ${new Date().toUTCString()}
        </p>
      </div>
    `;

    const result = await sendEmail({
      to: targetEmail,
      subject: `[Test Success] All I Gaming Email Integration (${provider.toUpperCase()})`,
      html: testHtml,
    });

    return result;
  } catch (error) {
    console.error("Email test failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Test email failed",
    };
  }
}

export async function initiateStripePaymentAction(input: {
  reservationId: string;
  customerEmail: string;
  customerName: string;
  designName: string;
  returnUrl?: string;
}) {
  return createStripeReservationSession(input);
}

export async function submitCryptoPaymentAction(
  param1: string | { reservationId: string; txHash: string; cryptoNetwork?: string; network?: string },
  param2?: string,
  param3?: string
) {
  if (typeof param1 === "object") {
    const { reservationId, txHash, cryptoNetwork, network } = param1;
    return recordCryptoPayment(reservationId, txHash, cryptoNetwork || network || "USDT-TRC20");
  }
  return recordCryptoPayment(param1, param2 || "", param3 || "USDT-TRC20");
}
