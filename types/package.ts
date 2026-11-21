export interface IncludedItem {
  title: string;
  sub?: string;
}

export interface StarterPackage {
  basePrice: number;
  currency: string;
  title: string;
  subtitle: string;
  description: string;
  includes: IncludedItem[];
  excludes: string[];
}

export interface AddonModule {
  id: string;
  name: string;
  slug: string;
  price: number;
  description?: string;
  iconKey: "video" | "trophy" | "spade" | "coins" | "ticket" | "dices" | "crown";
  isEnabled: boolean;
  order: number;
}

export interface PricingConfig {
  starterPackagePrice: number;
  ggrCompanyShare: number;
  ggrOperatorShare: number;
  reservationFee: number;
  reservationDiscountPercent: number;
  reservationDurationHours: number;
}

export interface CalculatedPackage {
  basePrice: number;
  selectedModules: AddonModule[];
  addonsTotal: number;
  packageTotal: number;
  reservationDiscountAmount: number;
  discountedTotal: number;
  reservationFee: number;
  remainingBalance: number;
}
