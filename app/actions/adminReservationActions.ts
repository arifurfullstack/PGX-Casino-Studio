"use server";

import { revalidatePath } from "next/cache";
import { updateReservationStatus } from "@/services/reservationService";
import { ReservationStatus, PaymentStatus } from "@/types";

export async function updateReservationStatusAction(
  reservationId: string,
  status: ReservationStatus,
  paymentStatus?: PaymentStatus
) {
  try {
    const success = await updateReservationStatus(reservationId, status, paymentStatus);
    revalidatePath("/admin/reservations");
    revalidatePath("/admin");
    return { success };
  } catch (error) {
    console.error("Update reservation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update reservation",
    };
  }
}
