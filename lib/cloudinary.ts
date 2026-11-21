import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "mv5kht9o",
  api_key: process.env.CLOUDINARY_API_KEY || "453256946441197",
  api_secret: process.env.CLOUDINARY_API_SECRET || "PM9ILwgB8xeG4TYxpeQfD_yG32A",
  secure: true,
});

export interface UploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
}

/**
 * Uploads a base64 or data URL string to Cloudinary
 */
export async function uploadToCloudinary(
  fileBase64: string,
  folder = "alli-gaming/designs"
): Promise<UploadResult> {
  const result: UploadApiResponse = await cloudinary.uploader.upload(fileBase64, {
    folder,
    resource_type: "auto",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
  };
}

/**
 * Deletes an image from Cloudinary by public ID
 */
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const res = await cloudinary.uploader.destroy(publicId);
    return res.result === "ok";
  } catch (error) {
    console.error("Cloudinary deletion failed:", error);
    return false;
  }
}

export default cloudinary;
