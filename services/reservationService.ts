import { connectToDatabase } from "@/lib/mongodb";
import { ReservationModel } from "@/models";
import { Reservation, ReservationStatus, PaymentStatus } from "@/types";
import { getPricingConfig } from "./pricingService";
import {
  dispatchReservationExpiredEmails,
  dispatchAgreementCompletedEmails,
  dispatchRefundCompletedEmails,
} from "./emailService";

export interface CreateReservationInput {
  inquiryId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  selectedDesignName: string;
  selectedAddons: string[];
  originalPackagePrice: number;
}

export async function createReservation(input: CreateReservationInput): Promise<Reservation> {
  await connectToDatabase();

  const [count, pricingConfig] = await Promise.all([
    ReservationModel.countDocuments(),
    getPricingConfig(),
  ]);
  const reservationId = `AIG-RES-${(count + 1).toString().padStart(5, "0")}`;

  const discountPercent = pricingConfig.reservationDiscountPercent;
  const discountAmount = Math.round((input.originalPackagePrice * discountPercent) / 100);
  const discountedPrice = input.originalPackagePrice - discountAmount;
  const reservationFee = pricingConfig.reservationFee;
  const remainingBalance = Math.max(0, discountedPrice - reservationFee);

  const now = new Date();
  const durationMs = pricingConfig.reservationDurationHours * 60 * 60 * 1000;
  const expiresAt = new Date(now.getTime() + durationMs);

  const doc = await ReservationModel.create({
    reservationId,
    inquiryId: input.inquiryId,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    customerPhone: input.customerPhone,
    selectedDesignName: input.selectedDesignName,
    selectedAddons: input.selectedAddons,
    originalPackagePrice: input.originalPackagePrice,
    discountPercent,
    discountedPrice,
    reservationFee,
    remainingBalance,
    paymentStatus: "paid", // Simulation: marked paid upon reservation confirmation
    status: "active",
    startTime: now,
    expiresAt,
  });

  return {
    id: doc._id.toString(),
    reservationId: doc.reservationId,
    inquiryId: doc.inquiryId,
    customerName: doc.customerName,
    customerEmail: doc.customerEmail,
    customerPhone: doc.customerPhone,
    selectedDesignName: doc.selectedDesignName,
    selectedAddons: doc.selectedAddons,
    originalPackagePrice: doc.originalPackagePrice,
    discountPercent: doc.discountPercent,
    discountedPrice: doc.discountedPrice,
    reservationFee: doc.reservationFee,
    remainingBalance: doc.remainingBalance,
    paymentStatus: doc.paymentStatus,
    status: doc.status,
    startTime: doc.startTime.toISOString(),
    expiresAt: doc.expiresAt.toISOString(),
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

export async function getReservationById(reservationId: string): Promise<Reservation | null> {
  await connectToDatabase();
  const doc = await ReservationModel.findOne({ reservationId }).lean();
  if (!doc) return null;

  return {
    id: (doc._id as unknown as string).toString(),
    reservationId: doc.reservationId,
    inquiryId: doc.inquiryId,
    customerName: doc.customerName,
    customerEmail: doc.customerEmail,
    customerPhone: doc.customerPhone,
    selectedDesignName: doc.selectedDesignName,
    selectedAddons: doc.selectedAddons,
    originalPackagePrice: doc.originalPackagePrice,
    discountPercent: doc.discountPercent,
    discountedPrice: doc.discountedPrice,
    reservationFee: doc.reservationFee,
    remainingBalance: doc.remainingBalance,
    paymentStatus: doc.paymentStatus,
    status: doc.status,
    startTime: doc.startTime.toISOString(),
    expiresAt: doc.expiresAt.toISOString(),
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  };
}

export async function getAllReservations(): Promise<Reservation[]> {
  try {
    await connectToDatabase();
    // Auto-check and expire any reservations past 120h threshold
    await checkAndExpireReservations();
    const docs = await ReservationModel.find().sort({ createdAt: -1 }).lean();

    return docs.map((doc) => ({
      id: (doc._id as unknown as string).toString(),
      reservationId: doc.reservationId,
      inquiryId: doc.inquiryId,
      customerName: doc.customerName,
      customerEmail: doc.customerEmail,
      customerPhone: doc.customerPhone,
      selectedDesignName: doc.selectedDesignName,
      selectedAddons: doc.selectedAddons,
      originalPackagePrice: doc.originalPackagePrice,
      discountPercent: doc.discountPercent,
      discountedPrice: doc.discountedPrice,
      reservationFee: doc.reservationFee,
      remainingBalance: doc.remainingBalance,
      paymentStatus: doc.paymentStatus,
      status: doc.status,
      startTime: doc.startTime.toISOString(),
      expiresAt: doc.expiresAt.toISOString(),
      createdAt: doc.createdAt?.toISOString(),
      updatedAt: doc.updatedAt?.toISOString(),
    }));
  } catch (error) {
    console.warn("MongoDB get all reservations error:", error);
    return [];
  }
}

export async function updateReservationStatus(
  reservationId: string,
  status: ReservationStatus,
  paymentStatus?: PaymentStatus
): Promise<boolean> {
  await connectToDatabase();
  const updateData: { status: ReservationStatus; paymentStatus?: PaymentStatus; refundCompletedAt?: Date } = { status };
  if (paymentStatus) {
    updateData.paymentStatus = paymentStatus;
  }
  if (status === "refunded") {
    updateData.refundCompletedAt = new Date();
  }

  const res = await ReservationModel.updateOne({ reservationId }, { $set: updateData });

  if (res.modifiedCount > 0) {
    // Dispatch lifecycle automated transactional email in background
    getReservationById(reservationId).then((updated) => {
      if (!updated) return;
      if (status === "agreement_completed") {
        dispatchAgreementCompletedEmails(updated).catch((err) =>
          console.warn("[Email] Agreement email dispatch error:", err)
        );
      } else if (status === "refunded") {
        dispatchRefundCompletedEmails(updated).catch((err) =>
          console.warn("[Email] Refund email dispatch error:", err)
        );
      }
    }).catch((err) => console.warn("[Reservation] Status update hook error:", err));
  }

  return res.modifiedCount > 0;
}

export interface ExpirationCheckResult {
  checkedCount: number;
  expiredCount: number;
  expiredReservationIds: string[];
}

export async function checkAndExpireReservations(): Promise<ExpirationCheckResult> {
  await connectToDatabase();
  const now = new Date();

  const overdueReservations = await ReservationModel.find({
    status: "active",
    expiresAt: { $lte: now },
  });

  const expiredReservationIds: string[] = [];

  for (const res of overdueReservations) {
    if (res.status === "agreement_completed") {
      continue;
    }

    res.status = "expired";
    res.refundInitiatedAt = now;
    await res.save();
    expiredReservationIds.push(res.reservationId);
    console.log(`[Auto-Expire Cron] Reservation ${res.reservationId} has expired. Refund initiated.`);

    // Dispatch automated expiration email
    const reservationDto: Reservation = {
      id: res._id.toString(),
      reservationId: res.reservationId,
      inquiryId: res.inquiryId,
      customerName: res.customerName,
      customerEmail: res.customerEmail,
      customerPhone: res.customerPhone,
      selectedDesignName: res.selectedDesignName,
      selectedAddons: res.selectedAddons,
      originalPackagePrice: res.originalPackagePrice,
      discountPercent: res.discountPercent,
      discountedPrice: res.discountedPrice,
      reservationFee: res.reservationFee,
      remainingBalance: res.remainingBalance,
      paymentStatus: res.paymentStatus,
      status: res.status,
      startTime: res.startTime.toISOString(),
      expiresAt: res.expiresAt.toISOString(),
      refundInitiatedAt: res.refundInitiatedAt?.toISOString(),
      createdAt: res.createdAt?.toISOString(),
    };

    dispatchReservationExpiredEmails(reservationDto).catch((err) =>
      console.warn(`[Auto-Expire Cron] Email dispatch error for ${res.reservationId}:`, err)
    );
  }

  return {
    checkedCount: overdueReservations.length,
    expiredCount: expiredReservationIds.length,
    expiredReservationIds,
  };
}

export function getExpiringReservationsCount(reservations: Reservation[]): number {
  const now = Date.now();
  return reservations.filter((r) => {
    if (r.status !== "active") return false;
    const diff = new Date(r.expiresAt).getTime() - now;
    return diff > 0 && diff <= 24 * 60 * 60 * 1000;
  }).length;
}
