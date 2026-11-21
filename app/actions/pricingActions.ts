"use server";

import { revalidatePath } from "next/cache";
import { updatePricingConfig } from "@/services/pricingService";
import { PricingConfig } from "@/types";

export async function updatePricingConfigAction(config: Partial<PricingConfig>) {
  try {
    const success = await updatePricingConfig(config);
    revalidatePath("/admin/pricing");
    revalidatePath("/admin");
    revalidatePath("/packages");
    revalidatePath("/select-design");
    revalidatePath("/");
    return { success };
  } catch (error) {
    console.error("Update pricing action error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update pricing",
    };
  }
}
