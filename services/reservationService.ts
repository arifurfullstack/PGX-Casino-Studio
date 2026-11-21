import { connectToDatabase } from "@/lib/mongodb";
import { ReservationModel } from "@/models";
import { Reservation, ReservationStatus, PaymentStatus } from "@/types";

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

  const count = await ReservationModel.countDocuments();
  const reservationId = `AIG-RES-${(count + 1).toString().padStart(5, "0")}`;

  const discountPercent = 5;
  const discountAmount = Math.round((input.originalPackagePrice * discountPercent) / 100);
  const discountedPrice = input.originalPackagePrice - discountAmount;
  const reservationFee = 500;
  const remainingBalance = discountedPrice - reservationFee;

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days (120 hours)

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
  const updateData: { status: ReservationStatus; paymentStatus?: PaymentStatus } = { status };
  if (paymentStatus) {
    updateData.paymentStatus = paymentStatus;
  }

  const res = await ReservationModel.updateOne({ reservationId }, { $set: updateData });
  return res.modifiedCount > 0;
}
