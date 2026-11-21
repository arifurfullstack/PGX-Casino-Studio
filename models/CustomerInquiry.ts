import mongoose, { Schema, Document, Model } from "mongoose";
import { TimelineOption, InquiryStatus } from "@/types";

export interface ICustomerInquiry extends Document {
  referenceNumber: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  whatsappNumber?: string;
  companyName?: string;
  intendedTimeline: TimelineOption;
  projectRequirements?: string;
  selectedDesignId: string;
  selectedDesignName: string;
  selectedAddonIds: string[];
  totalPrice: number;
  status: InquiryStatus;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerInquirySchema = new Schema<ICustomerInquiry>(
  {
    referenceNumber: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phoneNumber: { type: String, required: true },
    whatsappNumber: { type: String },
    companyName: { type: String },
    intendedTimeline: {
      type: String,
      enum: [
        "immediately",
        "within_30_days",
        "within_1_3_months",
        "within_3_6_months",
        "just_exploring",
      ],
      required: true,
    },
    projectRequirements: { type: String },
    selectedDesignId: { type: String, required: true },
    selectedDesignName: { type: String, required: true },
    selectedAddonIds: [{ type: String }],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "new_inquiry",
        "contacted",
        "reviewing_requirements",
        "reservation_active",
        "offer_sent",
        "agreement_completed",
        "in_development",
        "completed",
        "cancelled",
      ],
      default: "new_inquiry",
      index: true,
    },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

export const CustomerInquiryModel: Model<ICustomerInquiry> =
  mongoose.models.CustomerInquiry ||
  mongoose.model<ICustomerInquiry>("CustomerInquiry", CustomerInquirySchema);

export default CustomerInquiryModel;
