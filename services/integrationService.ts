import { connectToDatabase } from "@/lib/mongodb";
import { IntegrationConfigModel } from "@/models";
import { IntegrationConfigData } from "@/types";

export const DEFAULT_INTEGRATION_CONFIG: IntegrationConfigData = {
  payment: {
    activeGateway: "crypto",
    crypto: {
      enabled: true,
      mode: "test",
      merchantName: "All I Gaming Holding Desk",
      usdtTrc20Address: "TYDny59kU75P6B8s75X97P73Lq92RkL41q",
      usdtErc20Address: "0x71C8364860D4e022f3E9D58E2E5B1b4f494A49e7",
      btcAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      instructions: "Send exactly 500 USDT (TRC20 or ERC20) or equivalent BTC. Submit your Transaction Hash (TxID) below for instant verification.",
      gatewayApiKey: "",
      gatewayIpnSecret: "",
    },
    stripe: {
      enabled: false,
      mode: "test",
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
      secretKey: process.env.STRIPE_SECRET_KEY || "",
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
      currency: "usd",
    },
  },
  email: {
    activeProvider: "disabled",
    fromName: "All I Gaming Concierge",
    fromEmail: process.env.EMAIL_FROM || "sales@alligaming.com",
    adminAlertEmail: process.env.ADMIN_ALERT_EMAIL || "admin@alligaming.com",
    resend: {
      apiKey: process.env.RESEND_API_KEY || "",
    },
    mailgun: {
      apiKey: process.env.MAILGUN_API_KEY || "",
      domain: process.env.MAILGUN_DOMAIN || "mg.alligaming.com",
      region: "us",
    },
    smtp: {
      host: process.env.SMTP_HOST || "smtp.mailgun.org",
      port: Number(process.env.SMTP_PORT) || 587,
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
      secure: false,
    },
  },
  addonModules: [
    { id: "live-dealer", name: "Live Dealer Casino", price: 10000, isEnabled: true },
    { id: "sportsbook", name: "Sportsbook Integration", price: 10000, isEnabled: true },
    { id: "poker", name: "Poker Platform", price: 20000, isEnabled: true },
    { id: "sweepstakes", name: "Sweepstakes Engine", price: 25000, isEnabled: true },
  ],
};

export async function getIntegrationConfig(): Promise<IntegrationConfigData> {
  try {
    await connectToDatabase();
    const doc = await IntegrationConfigModel.findOne().lean();
    if (doc) {
      return {
        payment: {
          activeGateway: doc.payment?.activeGateway || DEFAULT_INTEGRATION_CONFIG.payment.activeGateway,
          crypto: {
            ...DEFAULT_INTEGRATION_CONFIG.payment.crypto,
            ...(doc.payment?.crypto || {}),
          },
          stripe: {
            ...DEFAULT_INTEGRATION_CONFIG.payment.stripe,
            ...(doc.payment?.stripe || {}),
          },
        },
        email: {
          activeProvider: doc.email?.activeProvider || DEFAULT_INTEGRATION_CONFIG.email.activeProvider,
          fromName: doc.email?.fromName || DEFAULT_INTEGRATION_CONFIG.email.fromName,
          fromEmail: doc.email?.fromEmail || DEFAULT_INTEGRATION_CONFIG.email.fromEmail,
          adminAlertEmail: doc.email?.adminAlertEmail || DEFAULT_INTEGRATION_CONFIG.email.adminAlertEmail,
          resend: {
            ...DEFAULT_INTEGRATION_CONFIG.email.resend,
            ...(doc.email?.resend || {}),
          },
          mailgun: {
            ...DEFAULT_INTEGRATION_CONFIG.email.mailgun,
            ...(doc.email?.mailgun || {}),
          },
          smtp: {
            ...DEFAULT_INTEGRATION_CONFIG.email.smtp,
            ...(doc.email?.smtp || {}),
          },
        },
        addonModules: doc.addonModules?.length ? doc.addonModules : DEFAULT_INTEGRATION_CONFIG.addonModules,
      };
    }
  } catch (error) {
    console.warn("MongoDB get integration config fallback to defaults:", error);
  }

  return DEFAULT_INTEGRATION_CONFIG;
}

export async function updateIntegrationConfig(
  updates: Partial<IntegrationConfigData>
): Promise<boolean> {
  try {
    await connectToDatabase();
    await IntegrationConfigModel.findOneAndUpdate(
      {},
      { $set: updates },
      { upsert: true, new: true }
    );
    return true;
  } catch (error) {
    console.error("Failed to update integration config:", error);
    return false;
  }
}

/**
 * Returns sanitized config safe for client-side rendering (NO secret keys)
 */
export async function getPublicPaymentConfig() {
  const config = await getIntegrationConfig();
  return {
    activeGateway: config.payment.activeGateway,
    crypto: {
      enabled: config.payment.crypto.enabled,
      mode: config.payment.crypto.mode,
      merchantName: config.payment.crypto.merchantName,
      usdtTrc20Address: config.payment.crypto.usdtTrc20Address,
      usdtErc20Address: config.payment.crypto.usdtErc20Address,
      btcAddress: config.payment.crypto.btcAddress,
      instructions: config.payment.crypto.instructions,
    },
    stripe: {
      enabled: config.payment.stripe.enabled,
      mode: config.payment.stripe.mode,
      publishableKey: config.payment.stripe.publishableKey,
      currency: config.payment.stripe.currency,
    },
  };
}
