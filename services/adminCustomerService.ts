import { connectToDatabase } from "@/lib/mongodb";
import { CustomerUserModel, CustomerInquiryModel, ReservationModel } from "@/models";

interface CustomerUserDoc {
  _id: { toString(): string };
  email?: string;
  fullName?: string;
  companyName?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  status?: string;
  adminNotes?: string;
  createdAt?: Date | string;
}

interface InquiryDoc {
  _id: { toString(): string };
  email?: string;
  fullName?: string;
  companyName?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  adminNotes?: string;
  totalPrice?: number;
  referenceNumber?: string;
  selectedDesignName?: string;
  status?: string;
  createdAt?: Date | string;
}

interface ReservationDoc {
  customerEmail?: string;
  reservationId?: string;
  selectedDesignName?: string;
  discountedPrice?: number;
  status?: string;
  expiresAt?: Date | string;
  createdAt?: Date | string;
}

export interface AdminCustomerRecord {
  id: string;
  email: string;
  fullName: string;
  companyName: string;
  phoneNumber: string;
  whatsappNumber: string;
  isRegistered: boolean;
  status: "active" | "suspended";
  adminNotes?: string;
  inquiriesCount: number;
  reservationsCount: number;
  totalPipelineValue: number;
  hasActiveHold: boolean;
  activeHoldExpiresAt?: string;
  registeredAt?: string;
  lastActivityDate: string;
  inquiries: {
    referenceNumber: string;
    designName: string;
    totalPrice: number;
    status: string;
    createdAt: string;
  }[];
  reservations: {
    reservationId: string;
    designName: string;
    discountedPrice: number;
    status: string;
    expiresAt: string;
  }[];
}

export async function getAdminCustomersList(): Promise<AdminCustomerRecord[]> {
  try {
    await connectToDatabase();

    const [users, inquiries, reservations] = await Promise.all([
      CustomerUserModel.find({}).sort({ createdAt: -1 }).lean(),
      CustomerInquiryModel.find({}).sort({ createdAt: -1 }).lean(),
      ReservationModel.find({}).sort({ createdAt: -1 }).lean(),
    ]);

    // Map to group all data by normalized lowercase email
    const customerMap = new Map<string, AdminCustomerRecord>();

    // 1. Process registered portal users
    for (const u of (users as unknown as CustomerUserDoc[])) {
      const email = (u.email || "").toLowerCase().trim();
      if (!email) continue;

      customerMap.set(email, {
        id: u._id.toString(),
        email,
        fullName: u.fullName || "Operator Client",
        companyName: u.companyName || "Private Gaming Group",
        phoneNumber: u.phoneNumber || "",
        whatsappNumber: u.whatsappNumber || u.phoneNumber || "",
        isRegistered: true,
        status: (u.status as "active" | "suspended") || "active",
        adminNotes: u.adminNotes || "",
        inquiriesCount: 0,
        reservationsCount: 0,
        totalPipelineValue: 0,
        hasActiveHold: false,
        registeredAt: u.createdAt ? new Date(u.createdAt).toISOString() : undefined,
        lastActivityDate: u.createdAt ? new Date(u.createdAt).toISOString() : new Date().toISOString(),
        inquiries: [],
        reservations: [],
      });
    }

    // 2. Process inquiries
    for (const inq of (inquiries as unknown as InquiryDoc[])) {
      const email = (inq.email || "").toLowerCase().trim();
      if (!email) continue;

      let record = customerMap.get(email);
      if (!record) {
        // Guest customer from quote submission
        record = {
          id: inq._id.toString(),
          email,
          fullName: inq.fullName || "Prospective Client",
          companyName: inq.companyName || "Unregistered Group",
          phoneNumber: inq.phoneNumber || "",
          whatsappNumber: inq.whatsappNumber || inq.phoneNumber || "",
          isRegistered: false,
          status: "active",
          adminNotes: inq.adminNotes || "",
          inquiriesCount: 0,
          reservationsCount: 0,
          totalPipelineValue: 0,
          hasActiveHold: false,
          lastActivityDate: inq.createdAt ? new Date(inq.createdAt).toISOString() : new Date().toISOString(),
          inquiries: [],
          reservations: [],
        };
        customerMap.set(email, record);
      }

      record.inquiriesCount += 1;
      record.totalPipelineValue += Number(inq.totalPrice) || 0;
      record.inquiries.push({
        referenceNumber: inq.referenceNumber || "",
        designName: inq.selectedDesignName || "Turnkey Casino",
        totalPrice: Number(inq.totalPrice) || 0,
        status: inq.status || "new_inquiry",
        createdAt: inq.createdAt ? new Date(inq.createdAt).toISOString() : "",
      });

      // Update latest activity
      if (inq.createdAt && new Date(inq.createdAt) > new Date(record.lastActivityDate)) {
        record.lastActivityDate = new Date(inq.createdAt).toISOString();
      }
    }

    // 3. Process reservations
    const now = new Date();
    for (const res of (reservations as unknown as ReservationDoc[])) {
      const email = (res.customerEmail || "").toLowerCase().trim();
      if (!email) continue;

      const record = customerMap.get(email);
      if (record) {
        record.reservationsCount += 1;
        const isHoldActive = res.status === "active" && Boolean(res.expiresAt) && new Date(res.expiresAt as string | Date) > now;
        if (isHoldActive && res.expiresAt) {
          record.hasActiveHold = true;
          record.activeHoldExpiresAt = new Date(res.expiresAt as string | Date).toISOString();
        }

        record.reservations.push({
          reservationId: res.reservationId || "",
          designName: res.selectedDesignName || "Turnkey Casino",
          discountedPrice: Number(res.discountedPrice) || 0,
          status: res.status || "active",
          expiresAt: res.expiresAt ? new Date(res.expiresAt).toISOString() : "",
        });

        if (res.createdAt && new Date(res.createdAt) > new Date(record.lastActivityDate)) {
          record.lastActivityDate = new Date(res.createdAt).toISOString();
        }
      }
    }

    // Sort by latest activity descending
    return Array.from(customerMap.values()).sort(
      (a, b) => new Date(b.lastActivityDate).getTime() - new Date(a.lastActivityDate).getTime()
    );
  } catch (error) {
    console.error("Error fetching admin customers:", error);
    return [];
  }
}

export async function updateCustomerStatusInDb(
  email: string,
  status: "active" | "suspended"
): Promise<{ success: boolean; message: string }> {
  try {
    await connectToDatabase();
    const normalizedEmail = email.toLowerCase().trim();

    const user = await CustomerUserModel.findOneAndUpdate(
      { email: normalizedEmail },
      { $set: { status } },
      { new: true }
    );

    if (!user) {
      return { success: false, message: "Customer account not found for this email." };
    }

    return { success: true, message: `Account status updated to ${status}.` };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to update status.";
    return { success: false, message: errorMsg };
  }
}

export async function updateCustomerAdminNotesInDb(
  email: string,
  notes: string
): Promise<{ success: boolean; message: string }> {
  try {
    await connectToDatabase();
    const normalizedEmail = email.toLowerCase().trim();

    await CustomerUserModel.findOneAndUpdate(
      { email: normalizedEmail },
      { $set: { adminNotes: notes } }
    );

    return { success: true, message: "Admin notes updated." };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to update notes.";
    return { success: false, message: errorMsg };
  }
}
