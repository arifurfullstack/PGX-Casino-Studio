export type PaymentGatewayType = "crypto" | "stripe" | "manual";

export interface CryptoGatewayConfig {
  enabled: boolean;
  mode: "test" | "live";
  merchantName: string;
  usdtTrc20Address: string;
  usdtErc20Address: string;
  btcAddress: string;
  instructions: string;
  gatewayApiKey?: string;
  gatewayIpnSecret?: string;
}

export interface StripeGatewayConfig {
  enabled: boolean;
  mode: "test" | "live";
  publishableKey: string;
  secretKey: string;
  webhookSecret: string;
  currency: string;
}

export interface PaymentIntegrations {
  activeGateway: PaymentGatewayType;
  crypto: CryptoGatewayConfig;
  stripe: StripeGatewayConfig;
}

export type EmailProviderType = "resend" | "mailgun" | "smtp" | "disabled";

export interface ResendConfig {
  apiKey: string;
}

export interface MailgunConfig {
  apiKey: string;
  domain: string;
  region: "us" | "eu";
}

export interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  secure: boolean;
}

export interface EmailIntegrations {
  activeProvider: EmailProviderType;
  fromName: string;
  fromEmail: string;
  adminAlertEmail: string;
  resend: ResendConfig;
  mailgun: MailgunConfig;
  smtp: SmtpConfig;
}

export interface ModulePricingItem {
  id: string;
  name: string;
  price: number;
  isEnabled: boolean;
}

export interface IntegrationConfigData {
  payment: PaymentIntegrations;
  email: EmailIntegrations;
  addonModules?: ModulePricingItem[];
}

export interface PublicPaymentConfig {
  activeGateway: PaymentGatewayType;
  crypto: {
    enabled: boolean;
    mode: "test" | "live";
    merchantName: string;
    usdtTrc20Address: string;
    usdtErc20Address: string;
    btcAddress: string;
    instructions: string;
  };
  stripe: {
    enabled: boolean;
    mode: "test" | "live";
    publishableKey: string;
    currency: string;
  };
}
