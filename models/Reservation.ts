import mongoose, { Schema, Document, Model } from "mongoose";
import { ReservationStatus, PaymentStatus } from "@/types";

export interface IReservation extends Document {
  reservationId: string;
  inquiryId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  selectedDesignName: string;
  selectedAddons: string[];
  originalPackagePrice: number;
  discountPercent: number;
  discountedPrice: number;
  reservationFee: number;
  remainingBalance: number;
  paymentStatus: PaymentStatus;
  paymentTransactionId?: string;
  status: ReservationStatus;
  startTime: Date;
  expiresAt: Date;
  refundInitiatedAt?: Date;
  refundCompletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    reservationId: { type: String, required: true, unique: true, index: true },
    inquiryId: { type: String, required: true, index: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true, index: true },
    customerPhone: { type: String, required: true },
    selectedDesignName: { type: String, required: true },
    selectedAddons: [{ type: String }],
    originalPackagePrice: { type: Number, required: true },
    discountPercent: { type: Number, default: 5 },
    discountedPrice: { type: Number, required: true },
    reservationFee: { type: Number, default: 500 },
    remainingBalance: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
      index: true,
    },
    paymentTransactionId: { type: String },
    status: {
      type: String,
      enum: [
        "pending_payment",
        "active",
        "agreement_completed",
        "expired",
        "refund_pending",
        "refunded",
        "cancelled",
      ],
      default: "pending_payment",
      index: true,
    },
    startTime: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true, index: true },
    refundInitiatedAt: { type: Date },
    refundCompletedAt: { type: Date },
  },
  { timestamps: true }
);

export const ReservationModel: Model<IReservation> =
  mongoose.models.Reservation ||
  mongoose.model<IReservation>("Reservation", ReservationSchema);

export default ReservationModel;
