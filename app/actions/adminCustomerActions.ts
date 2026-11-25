"use server";

import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  updateCustomerStatusInDb,
  updateCustomerAdminNotesInDb,
  deleteCustomerByEmailInDb,
} from "@/services/adminCustomerService";

export async function toggleCustomerStatusAction(
  email: string,
  newStatus: "active" | "suspended"
): Promise<{ success: boolean; message: string }> {
  if (!(await isAdminAuthenticated())) {
    return { success: false, message: "Unauthorized." };
  }
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
  if (!(await isAdminAuthenticated())) {
    return { success: false, message: "Unauthorized." };
  }
  if (!email) {
    return { success: false, message: "Email is required." };
  }

  const result = await updateCustomerAdminNotesInDb(email, notes);
  if (result.success) {
    revalidatePath("/admin/customers");
  }
  return result;
}

export async function deleteCustomerAction(
  email: string
): Promise<{ success: boolean; message: string }> {
  if (!(await isAdminAuthenticated())) {
    return { success: false, message: "Unauthorized." };
  }
  if (!email) {
    return { success: false, message: "Email is required." };
  }

  const result = await deleteCustomerByEmailInDb(email);
  if (result.success) {
    revalidatePath("/admin/customers");
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin/reservations");
    revalidatePath("/admin");
  }
  return result;
}
