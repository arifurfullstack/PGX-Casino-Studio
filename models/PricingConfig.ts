import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPricingConfig extends Document {
  starterPackagePrice: number;
  ggrCompanyShare: number;
  ggrOperatorShare: number;
  reservationFee: number;
  reservationDiscountPercent: number;
  reservationDurationHours: number;
  updatedAt: Date;
}

const PricingConfigSchema = new Schema<IPricingConfig>(
  {
    starterPackagePrice: { type: Number, default: 15000, required: true },
    ggrCompanyShare: { type: Number, default: 25, required: true },
    ggrOperatorShare: { type: Number, default: 75, required: true },
    reservationFee: { type: Number, default: 1000, required: true },
    reservationDiscountPercent: { type: Number, default: 5, required: true },
    reservationDurationHours: { type: Number, default: 120, required: true },
  },
  { timestamps: true }
);

export const PricingConfigModel: Model<IPricingConfig> =
  mongoose.models.PricingConfig ||
  mongoose.model<IPricingConfig>("PricingConfig", PricingConfigSchema);

export default PricingConfigModel;
