import nodemailer from "nodemailer";
import { getIntegrationConfig } from "./integrationService";
import { CustomerInquiry, Reservation } from "@/types";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  try {
    const config = await getIntegrationConfig();
    const { email } = config;

    if (email.activeProvider === "disabled") {
      console.log(`[Email Service - Disabled] Email to ${options.to} was not sent (Provider is disabled in Admin).`);
      return { success: true };
    }

    const fromAddress = `"${email.fromName}" <${email.fromEmail}>`;

    // 1. Resend REST API
    if (email.activeProvider === "resend") {
      if (!email.resend.apiKey) {
        return { success: false, error: "Resend API key is not configured in Admin settings." };
      }

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${email.resend.apiKey.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [options.to],
          subject: options.subject,
          html: options.html,
          text: options.text || options.subject,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Resend API error:", errorData);
        return {
          success: false,
          error: errorData.message || `Resend HTTP error ${res.status}`,
        };
      }

      return { success: true };
    }

    // 2. Mailgun REST API
    if (email.activeProvider === "mailgun") {
      const { apiKey, domain, region } = email.mailgun;
      if (!apiKey || !domain) {
        return { success: false, error: "Mailgun API key and Domain must be configured in Admin settings." };
      }

      const baseUrl = region === "eu" ? "https://api.eu.mailgun.net/v3" : "https://api.mailgun.net/v3";
      const endpoint = `${baseUrl}/${domain.trim()}/messages`;

      const formData = new URLSearchParams();
      formData.append("from", fromAddress);
      formData.append("to", options.to);
      formData.append("subject", options.subject);
      formData.append("html", options.html);
      if (options.text) formData.append("text", options.text);

      const authHeader = "Basic " + Buffer.from(`api:${apiKey.trim()}`).toString("base64");

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => "Unknown Mailgun error");
        console.error("Mailgun API error:", errorText);
        return { success: false, error: `Mailgun HTTP ${res.status}: ${errorText}` };
      }

      return { success: true };
    }

    // 3. Custom SMTP (via Nodemailer)
    if (email.activeProvider === "smtp") {
      const { host, port, user, pass, secure } = email.smtp;
      if (!host || !user || !pass) {
        return { success: false, error: "SMTP Host, Username, and Password are required in Admin settings." };
      }

      const transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: fromAddress,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.subject,
      });

      return { success: true };
    }

    return { success: false, error: `Unsupported email provider: ${email.activeProvider}` };
  } catch (error) {
    console.error("Failed to dispatch email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error sending email",
    };
  }
}

/**
 * Dispatches automated transactional emails on new inquiry submission
 */
export async function dispatchInquiryEmails(inquiry: CustomerInquiry): Promise<void> {
  const config = await getIntegrationConfig();
  const adminEmail = config.email.adminAlertEmail;

  // 1. Email to Customer
  const customerHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #080214; color: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #7c3aed;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffd700; font-size: 24px; text-transform: uppercase; margin: 0;">ALL I GAMING</h1>
        <p style="color: #a78bfa; font-size: 13px; margin-top: 4px;">B2B Online Casino Platform & Turnkey Solutions</p>
      </div>

      <div style="background: #110526; padding: 20px; border-radius: 12px; border: 1px solid #4c1d95; margin-bottom: 20px;">
        <h2 style="font-size: 18px; color: #ffffff; margin-top: 0;">Selection Request Received</h2>
        <p style="color: #d1d5db; font-size: 14px; line-height: 1.6;">Dear <strong>${inquiry.fullName}</strong>,</p>
        <p style="color: #9ca3af; font-size: 13px; line-height: 1.6;">Thank you for submitting your custom platform requirements. Our senior technical director has received your inquiry and will reach out to schedule an onboarding consultation.</p>
        
        <table style="width: 100%; font-size: 13px; color: #e5e7eb; margin-top: 15px; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #2e1065;">
            <td style="padding: 8px 0; color: #9ca3af;">Reference Number:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #ffd700; text-align: right;">${inquiry.referenceNumber}</td>
          </tr>
          <tr style="border-bottom: 1px solid #2e1065;">
            <td style="padding: 8px 0; color: #9ca3af;">Selected Design Theme:</td>
            <td style="padding: 8px 0; font-weight: bold; text-align: right;">${inquiry.selectedDesignName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #2e1065;">
            <td style="padding: 8px 0; color: #9ca3af;">Estimated Total:</td>
            <td style="padding: 8px 0; font-weight: bold; color: #34d399; text-align: right;">$${inquiry.totalPrice.toLocaleString()} USD</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9ca3af;">Target Launch Timeline:</td>
            <td style="padding: 8px 0; text-align: right;">${inquiry.intendedTimeline.replace(/_/g, " ")}</td>
          </tr>
        </table>
      </div>

      <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 25px;">
        Need instant assistance? Contact our VIP team on WhatsApp: <strong>+1 (416) 477-0191</strong>
      </p>
    </div>
  `;

  await sendEmail({
    to: inquiry.email,
    subject: `All I Gaming — Inquiry Confirmation [${inquiry.referenceNumber}]`,
    html: customerHtml,
  });

  // 2. Alert Email to Admin
  if (adminEmail) {
    const adminHtml = `
      <div style="font-family: sans-serif; background: #0c041c; color: #fff; padding: 25px; border-radius: 12px; border: 1px solid #ffd700;">
        <h2 style="color: #ffd700; margin-top: 0;">🚀 New Customer Inquiry Received</h2>
        <p>A new prospective casino operator has submitted a platform selection:</p>
        <ul>
          <li><strong>Client:</strong> ${inquiry.fullName} (${inquiry.companyName || "N/A"})</li>
          <li><strong>Email:</strong> ${inquiry.email}</li>
          <li><strong>Phone:</strong> ${inquiry.phoneNumber}</li>
          <li><strong>WhatsApp:</strong> ${inquiry.whatsappNumber || "Same as phone"}</li>
          <li><strong>Design Theme:</strong> ${inquiry.selectedDesignName}</li>
          <li><strong>Package Estimate:</strong> $${inquiry.totalPrice.toLocaleString()} USD</li>
          <li><strong>Timeline:</strong> ${inquiry.intendedTimeline}</li>
          <li><strong>Requirements:</strong> ${inquiry.projectRequirements || "None provided"}</li>
        </ul>
        <p style="margin-top: 20px;"><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://alligaming.com"}/admin/inquiries" style="background: #ffd700; color: #000; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: bold;">View in Admin CRM →</a></p>
      </div>
    `;

    await sendEmail({
      to: adminEmail,
      subject: `[Lead Alert] New Casino Inquiry: ${inquiry.fullName} ($${inquiry.totalPrice.toLocaleString()} USD)`,
      html: adminHtml,
    });
  }
}

/**
 * Dispatches automated transactional emails on 5-Day Reservation Confirmation ($1,000 USD lock)
 */
export async function dispatchReservationEmails(reservation: Reservation): Promise<void> {
  const config = await getIntegrationConfig();
  const adminEmail = config.email.adminAlertEmail;
  const expiryDate = new Date(reservation.expiresAt).toUTCString();

  // 1. Email to Customer
  const customerHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #080214; color: #ffffff; padding: 30px; border-radius: 16px; border: 2px solid #ffd700;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffd700; font-size: 24px; text-transform: uppercase; margin: 0;">ALL I GAMING</h1>
        <p style="color: #34d399; font-size: 13px; font-weight: bold; margin-top: 4px;">★ 5-DAY PRICE LOCK &amp; ${reservation.discountPercent}% DISCOUNT CONFIRMED ★</p>
      </div>

      <div style="background: #110526; padding: 20px; border-radius: 12px; border: 1px solid #4c1d95; margin-bottom: 20px;">
        <h2 style="font-size: 18px; color: #ffffff; margin-top: 0;">Your Design is Reserved!</h2>
        <p style="color: #d1d5db; font-size: 14px; line-height: 1.6;">Dear <strong>${reservation.customerName}</strong>,</p>
        <p style="color: #9ca3af; font-size: 13px; line-height: 1.6;">
          We have recorded your <strong>$1,000 USD refundable holding deposit</strong>. Your selected casino frontend design and exclusive ${reservation.discountPercent}% package discount are officially reserved for the next <strong>120 hours (5 full days)</strong>.
        </p>

        <div style="background: #080214; border: 1px solid #ffd700; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <table style="width: 100%; font-size: 13px; color: #e5e7eb;">
            <tr>
              <td style="color: #9ca3af; padding: 4px 0;">Reservation ID:</td>
              <td style="font-weight: bold; color: #ffd700; text-align: right;">${reservation.reservationId}</td>
            </tr>
            <tr>
              <td style="color: #9ca3af; padding: 4px 0;">Reserved Theme:</td>
              <td style="font-weight: bold; text-align: right;">${reservation.selectedDesignName}</td>
            </tr>
            <tr>
              <td style="color: #9ca3af; padding: 4px 0;">Original Price:</td>
              <td style="text-align: right; text-decoration: line-through; color: #9ca3af;">$${reservation.originalPackagePrice.toLocaleString()} USD</td>
            </tr>
            <tr>
              <td style="color: #34d399; font-weight: bold; padding: 4px 0;">${reservation.discountPercent}% Exclusive Savings:</td>
              <td style="color: #34d399; font-weight: bold; text-align: right;">-$${Math.round((reservation.originalPackagePrice * reservation.discountPercent) / 100).toLocaleString()} USD</td>
            </tr>
            <tr>
              <td style="color: #9ca3af; padding: 4px 0;">Locked Package Total:</td>
              <td style="font-weight: bold; color: #ffffff; text-align: right;">$${reservation.discountedPrice.toLocaleString()} USD</td>
            </tr>
            <tr>
              <td style="color: #ffd700; font-weight: bold; padding: 4px 0;">Deposit Paid Today:</td>
              <td style="font-weight: bold; color: #ffd700; text-align: right;">$${reservation.reservationFee} USD (100% Refundable)</td>
            </tr>
            <tr style="border-top: 1px solid #4c1d95;">
              <td style="color: #ffffff; font-weight: bold; padding: 6px 0;">Remaining Handover Balance:</td>
              <td style="font-weight: bold; color: #ffd700; font-size: 15px; text-align: right;">$${reservation.remainingBalance.toLocaleString()} USD</td>
            </tr>
          </table>
        </div>

        <p style="color: #ef4444; font-size: 12px; font-weight: bold;">
          ⏰ Holding Expiration: ${expiryDate}
        </p>
        <p style="color: #9ca3af; font-size: 11px;">
          Note: The $1,000 fee is credited toward your final project balance upon agreement execution. If no agreement is finalized within 120 hours, the hold is released and the $1,000 deposit is fully refunded.
        </p>
      </div>

      <p style="color: #9ca3af; font-size: 12px; text-align: center;">
        Your designated onboarding manager will contact you within business hours.
      </p>
    </div>
  `;

  await sendEmail({
    to: reservation.customerEmail,
    subject: `All I Gaming — $1,000 Reservation Confirmed [${reservation.reservationId}]`,
    html: customerHtml,
  });

  // 2. Alert Email to Admin
  if (adminEmail) {
    const adminHtml = `
      <div style="font-family: sans-serif; background: #0c041c; color: #fff; padding: 25px; border-radius: 12px; border: 2px solid #34d399;">
        <h2 style="color: #34d399; margin-top: 0;">💰 $1,000 Reservation Deposit Secured!</h2>
        <p>A client has locked a 5-day holding reservation:</p>
        <ul>
          <li><strong>Reservation ID:</strong> ${reservation.reservationId}</li>
          <li><strong>Client:</strong> ${reservation.customerName} (${reservation.customerEmail} / ${reservation.customerPhone})</li>
          <li><strong>Design Theme:</strong> ${reservation.selectedDesignName}</li>
          <li><strong>Locked Package Total:</strong> $${reservation.discountedPrice.toLocaleString()} USD (${reservation.discountPercent}% Discount Applied)</li>
          <li><strong>Remaining Balance:</strong> $${reservation.remainingBalance.toLocaleString()} USD</li>
          <li><strong>Expires At:</strong> ${expiryDate}</li>
        </ul>
        <p style="margin-top: 20px;"><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://alligaming.com"}/admin/reservations" style="background: #34d399; color: #000; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: bold;">Open Reservation Dossier →</a></p>
      </div>
    `;

    await sendEmail({
      to: adminEmail,
      subject: `[Payment Secured] $1,000 Reservation: ${reservation.customerName} (${reservation.reservationId})`,
      html: adminHtml,
    });
  }
}

/**
 * Dispatches automated transactional emails when a 120-Hour Reservation Hold Expires
 * (Design released & 100% refund initiated per PRD Section 12 & 15)
 */
export async function dispatchReservationExpiredEmails(reservation: Reservation): Promise<void> {
  const config = await getIntegrationConfig();
  const adminEmail = config.email.adminAlertEmail;

  // 1. Email to Customer
  const customerHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #080214; color: #ffffff; padding: 30px; border-radius: 16px; border: 2px solid #ef4444;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffd700; font-size: 24px; text-transform: uppercase; margin: 0;">ALL I GAMING</h1>
        <p style="color: #ef4444; font-size: 13px; font-weight: bold; margin-top: 4px;">RESERVATION HOLD EXPIRED — REFUND INITIATED</p>
      </div>

      <div style="background: #110526; padding: 20px; border-radius: 12px; border: 1px solid #4c1d95; margin-bottom: 20px;">
        <h2 style="font-size: 18px; color: #ffffff; margin-top: 0;">5-Day Reservation Period Concluded</h2>
        <p style="color: #d1d5db; font-size: 14px; line-height: 1.6;">Dear <strong>${reservation.customerName}</strong>,</p>
        <p style="color: #9ca3af; font-size: 13px; line-height: 1.6;">
          Your 120-hour (5-day) reservation hold on the <strong>${reservation.selectedDesignName}</strong> casino platform solution has concluded without an executed turnkey agreement.
        </p>

        <div style="background: #080214; border: 1px solid #ef4444; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <table style="width: 100%; font-size: 13px; color: #e5e7eb;">
            <tr>
              <td style="color: #9ca3af; padding: 4px 0;">Reservation ID:</td>
              <td style="font-weight: bold; color: #ffd700; text-align: right;">${reservation.reservationId}</td>
            </tr>
            <tr>
              <td style="color: #9ca3af; padding: 4px 0;">Reserved Theme:</td>
              <td style="font-weight: bold; text-align: right;">${reservation.selectedDesignName}</td>
            </tr>
            <tr>
              <td style="color: #9ca3af; padding: 4px 0;">Reservation Fee:</td>
              <td style="font-weight: bold; color: #34d399; text-align: right;">$${reservation.reservationFee} USD</td>
            </tr>
            <tr style="border-top: 1px solid #4c1d95;">
              <td style="color: #ffffff; font-weight: bold; padding: 6px 0;">Refund Status:</td>
              <td style="font-weight: bold; color: #34d399; font-size: 14px; text-align: right;">Full $1,000 Refund Initiated</td>
            </tr>
          </table>
        </div>

        <p style="color: #d1d5db; font-size: 13px; line-height: 1.6;">
          As guaranteed by our 100% Refundable Policy, your full $1,000 USD holding deposit has been queued for immediate return to your original payment method. The temporary design lock and 5% price incentive have now been released.
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 12px;">
          Should you wish to resume your casino platform deployment in the future, our enterprise team remains at your service.
        </p>
      </div>

      <p style="color: #9ca3af; font-size: 12px; text-align: center;">
        All I Gaming Platform Solutions • 24/7 Global Turnkey Services
      </p>
    </div>
  `;

  await sendEmail({
    to: reservation.customerEmail,
    subject: `All I Gaming — Reservation Expired & Refund Initiated [${reservation.reservationId}]`,
    html: customerHtml,
  });

  // 2. Alert Email to Admin
  if (adminEmail) {
    const adminHtml = `
      <div style="font-family: sans-serif; background: #0c041c; color: #fff; padding: 25px; border-radius: 12px; border: 2px solid #ef4444;">
        <h2 style="color: #ef4444; margin-top: 0;">⚠️ Reservation Expired — Action Required: Process $1,000 Refund</h2>
        <p>A 5-day holding reservation has reached its 120-hour expiration limit:</p>
        <ul>
          <li><strong>Reservation ID:</strong> ${reservation.reservationId}</li>
          <li><strong>Client:</strong> ${reservation.customerName} (${reservation.customerEmail})</li>
          <li><strong>Design Theme:</strong> ${reservation.selectedDesignName} (Hold Released)</li>
          <li><strong>Deposit to Refund:</strong> $${reservation.reservationFee} USD</li>
        </ul>
        <p style="margin-top: 20px;"><a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://alligaming.com"}/admin/reservations" style="background: #ef4444; color: #fff; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: bold;">Process Refund in Admin Dashboard →</a></p>
      </div>
    `;

    await sendEmail({
      to: adminEmail,
      subject: `[Action Required] Reservation Expired: ${reservation.customerName} (${reservation.reservationId})`,
      html: adminHtml,
    });
  }
}

/**
 * Dispatches automated transactional emails when a Commercial Agreement is Completed
 * ($1,000 reservation fee is credited toward the final invoice balance)
 */
export async function dispatchAgreementCompletedEmails(reservation: Reservation): Promise<void> {
  const config = await getIntegrationConfig();
  const adminEmail = config.email.adminAlertEmail;

  // 1. Email to Customer
  const customerHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #080214; color: #ffffff; padding: 30px; border-radius: 16px; border: 2px solid #ffd700;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffd700; font-size: 24px; text-transform: uppercase; margin: 0;">ALL I GAMING</h1>
        <p style="color: #34d399; font-size: 13px; font-weight: bold; margin-top: 4px;">★ TURNKEY AGREEMENT EXECUTED ★</p>
      </div>

      <div style="background: #110526; padding: 20px; border-radius: 12px; border: 1px solid #4c1d95; margin-bottom: 20px;">
        <h2 style="font-size: 18px; color: #ffffff; margin-top: 0;">Agreement Confirmed — $1,000 Credited</h2>
        <p style="color: #d1d5db; font-size: 14px; line-height: 1.6;">Dear <strong>${reservation.customerName}</strong>,</p>
        <p style="color: #9ca3af; font-size: 13px; line-height: 1.6;">
          Congratulations! Your turnkey online casino solution agreement for <strong>${reservation.selectedDesignName}</strong> has been officially executed.
        </p>

        <div style="background: #080214; border: 1px solid #ffd700; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <table style="width: 100%; font-size: 13px; color: #e5e7eb;">
            <tr>
              <td style="color: #9ca3af; padding: 4px 0;">Reservation / Agreement Ref:</td>
              <td style="font-weight: bold; color: #ffd700; text-align: right;">${reservation.reservationId}</td>
            </tr>
            <tr>
              <td style="color: #9ca3af; padding: 4px 0;">Selected Theme:</td>
              <td style="font-weight: bold; text-align: right;">${reservation.selectedDesignName}</td>
            </tr>
            <tr>
              <td style="color: #9ca3af; padding: 4px 0;">Locked Package Price:</td>
              <td style="font-weight: bold; text-align: right;">$${reservation.discountedPrice.toLocaleString()} USD</td>
            </tr>
            <tr>
              <td style="color: #34d399; font-weight: bold; padding: 4px 0;">Reservation Credit Applied:</td>
              <td style="font-weight: bold; color: #34d399; text-align: right;">-$${reservation.reservationFee} USD</td>
            </tr>
            <tr style="border-top: 1px solid #4c1d95;">
              <td style="color: #ffffff; font-weight: bold; padding: 6px 0;">Remaining Project Balance:</td>
              <td style="font-weight: bold; color: #ffd700; font-size: 16px; text-align: right;">$${reservation.remainingBalance.toLocaleString()} USD</td>
            </tr>
          </table>
        </div>

        <p style="color: #d1d5db; font-size: 13px; line-height: 1.6;">
          Your $1,000 holding deposit has been fully credited toward your project total. Your dedicated technical account manager will now schedule the engineering onboarding kick-off.
        </p>
      </div>

      <p style="color: #9ca3af; font-size: 12px; text-align: center;">
        Welcome to the All I Gaming operator network.
      </p>
    </div>
  `;

  await sendEmail({
    to: reservation.customerEmail,
    subject: `All I Gaming — Agreement Executed & $1,000 Credited [${reservation.reservationId}]`,
    html: customerHtml,
  });

  // 2. Alert Email to Admin
  if (adminEmail) {
    const adminHtml = `
      <div style="font-family: sans-serif; background: #0c041c; color: #fff; padding: 25px; border-radius: 12px; border: 2px solid #ffd700;">
        <h2 style="color: #ffd700; margin-top: 0;">🎉 Agreement Executed — $1,000 Credited</h2>
        <p>Agreement signed and confirmed for reservation ${reservation.reservationId}:</p>
        <ul>
          <li><strong>Client:</strong> ${reservation.customerName} (${reservation.customerEmail})</li>
          <li><strong>Theme:</strong> ${reservation.selectedDesignName}</li>
          <li><strong>Total Package Value:</strong> $${reservation.discountedPrice.toLocaleString()} USD</li>
          <li><strong>Remaining Milestone Balance:</strong> $${reservation.remainingBalance.toLocaleString()} USD</li>
        </ul>
      </div>
    `;

    await sendEmail({
      to: adminEmail,
      subject: `[Agreement Executed] ${reservation.customerName} (${reservation.reservationId})`,
      html: adminHtml,
    });
  }
}

/**
 * Dispatches automated transactional emails when a $1,000 Reservation Refund is Processed
 */
export async function dispatchRefundCompletedEmails(reservation: Reservation): Promise<void> {
  const customerHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #080214; color: #ffffff; padding: 30px; border-radius: 16px; border: 2px solid #34d399;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #ffd700; font-size: 24px; text-transform: uppercase; margin: 0;">ALL I GAMING</h1>
        <p style="color: #34d399; font-size: 13px; font-weight: bold; margin-top: 4px;">REFUND COMPLETED — RECEIPT</p>
      </div>

      <div style="background: #110526; padding: 20px; border-radius: 12px; border: 1px solid #4c1d95; margin-bottom: 20px;">
        <h2 style="font-size: 18px; color: #ffffff; margin-top: 0;">$1,000 Holding Deposit Refunded</h2>
        <p style="color: #d1d5db; font-size: 14px; line-height: 1.6;">Dear <strong>${reservation.customerName}</strong>,</p>
        <p style="color: #9ca3af; font-size: 13px; line-height: 1.6;">
          Your <strong>$1,000 USD refundable holding deposit</strong> for reservation reference <strong>${reservation.reservationId}</strong> has been successfully returned to your original payment method.
        </p>

        <div style="background: #080214; border: 1px solid #34d399; padding: 15px; border-radius: 8px; margin: 15px 0;">
          <table style="width: 100%; font-size: 13px; color: #e5e7eb;">
            <tr>
              <td style="color: #9ca3af; padding: 4px 0;">Reservation ID:</td>
              <td style="font-weight: bold; color: #ffd700; text-align: right;">${reservation.reservationId}</td>
            </tr>
            <tr>
              <td style="color: #9ca3af; padding: 4px 0;">Refund Amount:</td>
              <td style="font-weight: bold; color: #34d399; font-size: 15px; text-align: right;">$1,000.00 USD</td>
            </tr>
            <tr>
              <td style="color: #9ca3af; padding: 4px 0;">Processed Date:</td>
              <td style="font-weight: bold; color: #ffffff; text-align: right;">${new Date().toUTCString()}</td>
            </tr>
          </table>
        </div>

        <p style="color: #9ca3af; font-size: 12px;">
          Depending on your card issuer or network, the funds typically appear on your statement within 3–7 business days (or within minutes for crypto transfers).
        </p>
      </div>
    </div>
  `;

  await sendEmail({
    to: reservation.customerEmail,
    subject: `All I Gaming — $1,000 Refund Processed [${reservation.reservationId}]`,
    html: customerHtml,
  });
}
