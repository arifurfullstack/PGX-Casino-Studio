import { connectToDatabase } from "@/lib/mongodb";
import { CustomerUserModel, CustomerInquiryModel, ReservationModel } from "@/models";
import { CustomerInquiry, Reservation } from "@/types";

export interface CustomerDashboardData {
  user: {
    id: string;
    email: string;
    fullName: string;
    companyName?: string;
    phoneNumber: string;
    whatsappNumber?: string;
  };
  activeReservation: Reservation | null;
  reservations: Reservation[];
  inquiries: CustomerInquiry[];
  totalQuotesCount: number;
  totalPipelineValue: number;
}

export async function getCustomerDashboardData(email: string): Promise<CustomerDashboardData | null> {
  await connectToDatabase();
  const normalizedEmail = email.toLowerCase().trim();

  const userDoc = await CustomerUserModel.findOne({ email: normalizedEmail }).lean();
  if (!userDoc) return null;

  const [inquiryDocs, reservationDocs] = await Promise.all([
    CustomerInquiryModel.find({ email: normalizedEmail }).sort({ createdAt: -1 }).lean(),
    ReservationModel.find({ customerEmail: normalizedEmail }).sort({ createdAt: -1 }).lean(),
  ]);

  const inquiries: CustomerInquiry[] = inquiryDocs.map((doc) => ({
    id: (doc._id as unknown as string).toString(),
    referenceNumber: doc.referenceNumber,
    fullName: doc.fullName,
    email: doc.email,
    phoneNumber: doc.phoneNumber,
    whatsappNumber: doc.whatsappNumber,
    companyName: doc.companyName,
    intendedTimeline: doc.intendedTimeline,
    projectRequirements: doc.projectRequirements,
    selectedDesignId: doc.selectedDesignId,
    selectedDesignName: doc.selectedDesignName,
    selectedAddonIds: doc.selectedAddonIds || [],
    totalPrice: doc.totalPrice,
    status: doc.status,
    adminNotes: doc.adminNotes,
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  }));

  const reservations: Reservation[] = reservationDocs.map((doc) => ({
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
    startTime: doc.startTime?.toISOString(),
    expiresAt: doc.expiresAt?.toISOString(),
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  }));

  const activeReservation = reservations.find((r) => r.status === "active") || null;
  const totalPipelineValue = reservations.reduce((sum, r) => sum + r.discountedPrice, 0);

  return {
    user: {
      id: (userDoc._id as unknown as string).toString(),
      email: userDoc.email,
      fullName: userDoc.fullName,
      companyName: userDoc.companyName,
      phoneNumber: userDoc.phoneNumber,
      whatsappNumber: userDoc.whatsappNumber,
    },
    activeReservation,
    reservations,
    inquiries,
    totalQuotesCount: inquiries.length,
    totalPipelineValue,
  };
}
