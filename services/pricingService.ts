import { connectToDatabase } from "@/lib/mongodb";
import { PricingConfigModel } from "@/models";
import {
  DEFAULT_STARTER_PACKAGE,
  DEFAULT_ADDON_MODULES,
  DEFAULT_PRICING_CONFIG,
} from "@/config/default-package";
import {
  StarterPackage,
  AddonModule,
  PricingConfig,
  CalculatedPackage,
} from "@/types";

export async function getPricingConfig(): Promise<PricingConfig> {
  try {
    await connectToDatabase();
    const doc = await PricingConfigModel.findOne().lean();
    if (doc) {
      return {
        starterPackagePrice: doc.starterPackagePrice,
        ggrCompanyShare: doc.ggrCompanyShare,
        ggrOperatorShare: doc.ggrOperatorShare,
        reservationFee: doc.reservationFee,
        reservationDiscountPercent: doc.reservationDiscountPercent,
        reservationDurationHours: doc.reservationDurationHours,
      };
    }
  } catch (error) {
    console.warn("MongoDB get pricing error (using fallback defaults):", error);
  }

  return DEFAULT_PRICING_CONFIG;
}

export async function updatePricingConfig(config: Partial<PricingConfig>): Promise<boolean> {
  try {
    await connectToDatabase();
    await PricingConfigModel.findOneAndUpdate(
      {},
      { $set: config },
      { upsert: true, new: true }
    );
    return true;
  } catch (error) {
    console.error("MongoDB update pricing error:", error);
    return false;
  }
}

export function getStarterPackage(): StarterPackage {
  return DEFAULT_STARTER_PACKAGE;
}

export function getAddonModules(): AddonModule[] {
  return DEFAULT_ADDON_MODULES;
}

/**
 * Calculates dynamic package total, 5% reservation discount, and remaining balance.
 */
export function calculatePackage(
  selectedModuleIds: string[],
  basePrice = DEFAULT_PRICING_CONFIG.starterPackagePrice
): CalculatedPackage {
  const allModules = getAddonModules();
  const selectedModules = allModules.filter((m) =>
    selectedModuleIds.includes(m.id)
  );

  const addonsTotal = selectedModules.reduce((sum, mod) => sum + mod.price, 0);
  const packageTotal = basePrice + addonsTotal;

  // 5% reservation discount on total package
  const discountPercent = DEFAULT_PRICING_CONFIG.reservationDiscountPercent;
  const reservationDiscountAmount = Math.round((packageTotal * discountPercent) / 100);
  const discountedTotal = packageTotal - reservationDiscountAmount;

  const reservationFee = DEFAULT_PRICING_CONFIG.reservationFee;
  const remainingBalance = discountedTotal - reservationFee;

  return {
    basePrice,
    selectedModules,
    addonsTotal,
    packageTotal,
    reservationDiscountAmount,
    discountedTotal,
    reservationFee,
    remainingBalance,
  };
}
