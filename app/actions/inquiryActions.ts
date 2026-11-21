"use server";

import { createCustomerInquiry, CreateInquiryInput } from "@/services/inquiryService";
import { createReservation, CreateReservationInput } from "@/services/reservationService";

export async function submitInquiryAction(input: CreateInquiryInput) {
  try {
    const inquiry = await createCustomerInquiry(input);
    return {
      success: true,
      inquiryId: inquiry.id,
      referenceNumber: inquiry.referenceNumber,
    };
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return {
      success: false,
      error: "Failed to submit inquiry. Please try again or contact us directly via WhatsApp/Telegram.",
    };
  }
}

export async function createReservationAction(input: CreateReservationInput) {
  try {
    const res = await createReservation(input);
    return {
      success: true,
      reservationId: res.reservationId,
      discountedPrice: res.discountedPrice,
      remainingBalance: res.remainingBalance,
      expiresAt: res.expiresAt,
    };
  } catch (error) {
    console.error("Reservation creation error:", error);
    return {
      success: false,
      error: "Failed to create reservation holding. Please try again.",
    };
  }
}
