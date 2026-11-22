import mongoose, { Schema, Document, Model } from "mongoose";
import { DesignStatus } from "@/types";

export interface ICasinoDesign extends Document {
  slug: string;
  name: string;
  subtitle?: string;
  image: string;
  previewImages: {
    id: string;
    title: string;
    url: string;
    order: number;
    pagePath?: string;
    publicId?: string;
    category?: string;
  }[];
  tags: string[];
  status: DesignStatus;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PreviewImageSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    order: { type: Number, default: 0 },
    pagePath: { type: String },
    publicId: { type: String },
    category: { type: String },
  },
  { _id: false }
);

const CasinoDesignSchema = new Schema<ICasinoDesign>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String, required: true },
    previewImages: [PreviewImageSchema],
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["active", "hidden", "unavailable"],
      default: "active",
      index: true,
    },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export const CasinoDesignModel: Model<ICasinoDesign> =
  mongoose.models.CasinoDesign ||
  mongoose.model<ICasinoDesign>("CasinoDesign", CasinoDesignSchema);

export default CasinoDesignModel;
