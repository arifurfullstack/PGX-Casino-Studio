"use server";

import { revalidatePath } from "next/cache";
import {
  createCasinoDesign,
  updateCasinoDesign,
  deleteCasinoDesign,
} from "@/services/casinoService";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";
import { DesignStatus, DesignPreviewImage } from "@/types";

export async function uploadDesignImageAction(
  base64Data: string,
  folder = "alli-gaming/designs"
) {
  try {
    const result = await uploadToCloudinary(base64Data, folder);
    return { success: true, url: result.url, publicId: result.publicId };
  } catch (error) {
    console.error("Cloudinary upload action failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}

export async function deleteDesignImageAction(publicId: string) {
  try {
    const success = await deleteFromCloudinary(publicId);
    return { success };
  } catch (error) {
    console.error("Cloudinary delete action failed:", error);
    return { success: false };
  }
}

export async function toggleDesignStatusAction(
  slug: string,
  newStatus: DesignStatus
) {
  try {
    await updateCasinoDesign(slug, { status: newStatus });
    revalidatePath("/admin/designs");
    revalidatePath("/designs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Toggle design status error:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function deleteDesignAction(slug: string) {
  try {
    await deleteCasinoDesign(slug);
    revalidatePath("/admin/designs");
    revalidatePath("/designs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete design error:", error);
    return { success: false, error: "Failed to delete design" };
  }
}

export async function saveDesignAction(formData: {
  slug: string;
  name: string;
  subtitle?: string;
  image: string;
  previewImages?: DesignPreviewImage[];
  tags?: string[];
  status?: DesignStatus;
  order?: number;
  isNew?: boolean;
}) {
  try {
    if (formData.isNew) {
      await createCasinoDesign({
        slug: formData.slug,
        name: formData.name,
        subtitle: formData.subtitle,
        image: formData.image,
        previewImages: formData.previewImages || [],
        tags: formData.tags || [],
        status: formData.status || "active",
        order: formData.order ?? 0,
      });
    } else {
      await updateCasinoDesign(formData.slug, {
        name: formData.name,
        subtitle: formData.subtitle,
        image: formData.image,
        previewImages: formData.previewImages,
        tags: formData.tags,
        status: formData.status,
        order: formData.order,
      });
    }

    revalidatePath("/admin/designs");
    revalidatePath("/designs");
    revalidatePath(`/designs/${formData.slug}`);
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Save design action error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save design",
    };
  }
}
