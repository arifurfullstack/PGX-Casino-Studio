import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { uploadBufferToCloudinary } from "@/lib/cloudinary";

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15MB
const ALLOWED_MIME_TYPES: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/webp": ".webp",
  "image/avif": ".avif",
};

export async function POST(request: NextRequest) {
  try {
    const authed = await isAdminAuthenticated();
    if (!authed) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folderRaw = formData.get("folder");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    const ext = ALLOWED_MIME_TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        {
          success: false,
          error: "Unsupported file type. Please upload PNG, JPG, WebP, or AVIF.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: "File exceeds 15MB limit. Please compress the image and try again.",
        },
        { status: 413 }
      );
    }

    const safeFolder =
      typeof folderRaw === "string" && /^[a-zA-Z0-9/_-]+$/.test(folderRaw)
        ? folderRaw
        : "alli-gaming/previews";

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
      const result = await uploadBufferToCloudinary(buffer, safeFolder);
      return NextResponse.json({
        success: true,
        url: result.url,
        publicId: result.publicId,
        width: result.width,
        height: result.height,
        format: result.format,
      });
    } catch (cloudinaryError) {
      // Graceful local storage fallback if Cloudinary is unavailable/offline
      console.warn(
        "Cloudinary upload failed, falling back to local public/uploads:",
        cloudinaryError
      );
      const subDir = safeFolder.replace(/^\/+|\/+$/g, "");
      const uploadDir = path.resolve(process.cwd(), "public", "uploads", subDir);
      await mkdir(uploadDir, { recursive: true });

      const uniqueName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 8)}${ext}`;
      const filePath = path.join(uploadDir, uniqueName);
      await writeFile(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${subDir}/${uniqueName}`,
        publicId: undefined,
      });
    }
  } catch (error) {
    console.error("Admin multipart upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 }
    );
  }
}
