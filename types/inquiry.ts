export type TimelineOption =
  | "immediately"
  | "within_30_days"
  | "within_1_3_months"
  | "within_3_6_months"
  | "just_exploring";

export type InquiryStatus =
  | "new_inquiry"
  | "contacted"
  | "reviewing_requirements"
  | "reservation_active"
  | "offer_sent"
  | "agreement_completed"
  | "in_development"
  | "completed"
  | "cancelled";

export interface CustomerInquiry {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  whatsappNumber?: string;
  companyName?: string;
  intendedTimeline: TimelineOption;
  projectRequirements?: string;
  selectedDesignId: string;
  selectedDesignName: string;
  selectedAddonIds: string[];
  totalPrice: number;
  status: InquiryStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}
