import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICasinoCustomerUser extends Document {
  email: string;
  passwordHash: string;
  salt: string;
  fullName: string;
  companyName?: string;
  phoneNumber: string;
  whatsappNumber?: string;
  role: "client";
  status: "active" | "suspended";
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerUserSchema = new Schema<ICasinoCustomerUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    whatsappNumber: { type: String, trim: true },
    role: { type: String, default: "client" },
    status: { type: String, enum: ["active", "suspended"], default: "active" },
    adminNotes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const CustomerUserModel: Model<ICasinoCustomerUser> =
  mongoose.models.CustomerUser ||
  mongoose.model<ICasinoCustomerUser>("CustomerUser", CustomerUserSchema);

export default CustomerUserModel;
