"use server";

import { revalidatePath } from "next/cache";
import { updateCustomerStatusInDb, updateCustomerAdminNotesInDb } from "@/services/adminCustomerService";

export async function toggleCustomerStatusAction(
  email: string,
  newStatus: "active" | "suspended"
): Promise<{ success: boolean; message: string }> {
  if (!email) {
    return { success: false, message: "Email is required." };
  }

  const result = await updateCustomerStatusInDb(email, newStatus);
  if (result.success) {
    revalidatePath("/admin/customers");
    revalidatePath("/admin");
  }
  return result;
}

export async function updateCustomerNotesAction(
  email: string,
  notes: string
): Promise<{ success: boolean; message: string }> {
  if (!email) {
    return { success: false, message: "Email is required." };
  }

  const result = await updateCustomerAdminNotesInDb(email, notes);
  if (result.success) {
    revalidatePath("/admin/customers");
  }
  return result;
}
