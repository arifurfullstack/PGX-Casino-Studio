"use server";

import { revalidatePath } from "next/cache";
import { updateInquiryStatus } from "@/services/inquiryService";
import { InquiryStatus } from "@/types";

export async function updateInquiryStatusAction(
  id: string,
  status: InquiryStatus,
  adminNotes?: string
) {
  try {
    const success = await updateInquiryStatus(id, status, adminNotes);
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { success };
  } catch (error) {
    console.error("Update inquiry status error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update inquiry",
    };
  }
}
