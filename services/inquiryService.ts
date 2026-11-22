import { connectToDatabase } from "@/lib/mongodb";
import { CustomerInquiryModel } from "@/models";
import { CustomerInquiry, TimelineOption, InquiryStatus } from "@/types";
import { dispatchInquiryEmails } from "./emailService";

export interface CreateInquiryInput {
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
}

export async function createCustomerInquiry(
  input: CreateInquiryInput
): Promise<CustomerInquiry> {
  await connectToDatabase();

  const count = await CustomerInquiryModel.countDocuments();
  const referenceNumber = `AIG-REQ-${(count + 1).toString().padStart(5, "0")}`;

  const doc = await CustomerInquiryModel.create({
    referenceNumber,
    ...input,
    status: "new_inquiry",
  });

  const result: CustomerInquiry = {
    id: doc._id.toString(),
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
    selectedAddonIds: doc.selectedAddonIds,
    totalPrice: doc.totalPrice,
    status: doc.status,
    adminNotes: doc.adminNotes,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };

  // Dispatch transactional notification emails in background
  dispatchInquiryEmails(result).catch((err) =>
    console.error("[Inquiry Email Error]:", err)
  );

  return result;
}

export async function getAllInquiries(): Promise<CustomerInquiry[]> {
  try {
    await connectToDatabase();
    const docs = await CustomerInquiryModel.find().sort({ createdAt: -1 }).lean();

    return docs.map((doc) => ({
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
  } catch (error) {
    console.warn("MongoDB get inquiries error:", error);
    return [];
  }
}

export async function getInquiryById(id: string): Promise<CustomerInquiry | null> {
  try {
    await connectToDatabase();
    const doc = await CustomerInquiryModel.findById(id).lean();
    if (!doc) return null;

    return {
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
    };
  } catch (error) {
    console.warn("MongoDB get inquiry by id error:", error);
    return null;
  }
}

export async function getInquiryByReferenceNumber(
  referenceNumber: string
): Promise<CustomerInquiry | null> {
  try {
    await connectToDatabase();
    const doc = await CustomerInquiryModel.findOne({ referenceNumber }).lean();
    if (!doc) return null;

    return {
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
    };
  } catch (error) {
    console.warn("MongoDB get inquiry by ref error:", error);
    return null;
  }
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  adminNotes?: string
): Promise<boolean> {
  await connectToDatabase();
  const updateData: { status: InquiryStatus; adminNotes?: string } = { status };
  if (adminNotes !== undefined) {
    updateData.adminNotes = adminNotes;
  }

  const res = await CustomerInquiryModel.findByIdAndUpdate(id, updateData);
  return !!res;
}
