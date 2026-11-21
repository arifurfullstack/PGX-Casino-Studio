import { connectToDatabase } from "@/lib/mongodb";
import { CustomerInquiryModel } from "@/models";
import { CustomerInquiry, TimelineOption } from "@/types";

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

  return {
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
}
