"use server";

import { createCustomerInquiry, CreateInquiryInput } from "@/services/inquiryService";

export async function submitInquiryAction(input: CreateInquiryInput) {
  try {
    const inquiry = await createCustomerInquiry(input);
    return { success: true, referenceNumber: inquiry.referenceNumber };
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return { success: false, error: "Failed to submit inquiry. Please try again or contact us directly via WhatsApp/Telegram." };
  }
}
