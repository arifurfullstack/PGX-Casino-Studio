import mongoose, { Schema, Document, Model } from "mongoose";
import { IntegrationConfigData } from "@/types";

export interface IIntegrationConfig extends Document, IntegrationConfigData {
  createdAt: Date;
  updatedAt: Date;
}

const CryptoConfigSchema = new Schema(
  {
    enabled: { type: Boolean, default: true },
    mode: { type: String, enum: ["test", "live"], default: "test" },
    merchantName: { type: String, default: "All I Gaming Holding Desk" },
    usdtTrc20Address: { type: String, default: "TYDny59kU... (Set in Admin)" },
    usdtErc20Address: { type: String, default: "0x71C... (Set in Admin)" },
    btcAddress: { type: String, default: "bc1q... (Set in Admin)" },
    instructions: {
      type: String,
      default: "Send exactly 500 USDT (TRC20 or ERC20) or equivalent BTC. Submit your Transaction Hash (TxID) below for instant verification.",
    },
    gatewayApiKey: { type: String, default: "" },
    gatewayIpnSecret: { type: String, default: "" },
  },
  { _id: false }
);

const StripeConfigSchema = new Schema(
  {
    enabled: { type: Boolean, default: false },
    mode: { type: String, enum: ["test", "live"], default: "test" },
    publishableKey: { type: String, default: "" },
    secretKey: { type: String, default: "" },
    webhookSecret: { type: String, default: "" },
    currency: { type: String, default: "usd" },
  },
  { _id: false }
);

const ResendConfigSchema = new Schema(
  {
    apiKey: { type: String, default: "" },
  },
  { _id: false }
);

const MailgunConfigSchema = new Schema(
  {
    apiKey: { type: String, default: "" },
    domain: { type: String, default: "" },
    region: { type: String, enum: ["us", "eu"], default: "us" },
  },
  { _id: false }
);

const SmtpConfigSchema = new Schema(
  {
    host: { type: String, default: "" },
    port: { type: Number, default: 587 },
    user: { type: String, default: "" },
    pass: { type: String, default: "" },
    secure: { type: Boolean, default: false },
  },
  { _id: false }
);

const ModulePricingSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    isEnabled: { type: Boolean, default: true },
  },
  { _id: false }
);

const IntegrationConfigSchema = new Schema<IIntegrationConfig>(
  {
    payment: {
      activeGateway: {
        type: String,
        enum: ["crypto", "stripe", "manual"],
        default: "crypto",
      },
      crypto: { type: CryptoConfigSchema, default: () => ({}) },
      stripe: { type: StripeConfigSchema, default: () => ({}) },
    },
    email: {
      activeProvider: {
        type: String,
        enum: ["resend", "mailgun", "smtp", "disabled"],
        default: "disabled",
      },
      fromName: { type: String, default: "All I Gaming Concierge" },
      fromEmail: { type: String, default: "notifications@alligaming.com" },
      adminAlertEmail: { type: String, default: "sales@alligaming.com" },
      resend: { type: ResendConfigSchema, default: () => ({}) },
      mailgun: { type: MailgunConfigSchema, default: () => ({}) },
      smtp: { type: SmtpConfigSchema, default: () => ({}) },
    },
    addonModules: [ModulePricingSchema],
  },
  { timestamps: true }
);

export const IntegrationConfigModel: Model<IIntegrationConfig> =
  mongoose.models.IntegrationConfig ||
  mongoose.model<IIntegrationConfig>("IntegrationConfig", IntegrationConfigSchema);
