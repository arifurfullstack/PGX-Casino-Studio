export type ReservationStatus =
  | "pending_payment"
  | "active"
  | "agreement_completed"
  | "expired"
  | "refund_pending"
  | "refunded"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Reservation {
  id: string;
  reservationId: string;
  inquiryId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  selectedDesignName: string;
  selectedAddons: string[];
  originalPackagePrice: number;
  discountPercent: number;
  discountedPrice: number;
  reservationFee: number;
  remainingBalance: number;
  paymentStatus: PaymentStatus;
  paymentTransactionId?: string;
  status: ReservationStatus;
  startTime: string;
  expiresAt: string;
  refundInitiatedAt?: string;
  refundCompletedAt?: string;
  createdAt: string;
  updatedAt?: string;
}
