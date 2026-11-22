import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { getDesignBySlug } from "@/services/casinoService";

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".avif") return "image/avif";
  if (ext === ".gif") return "image/gif";
  return "application/octet-stream";
}

function isSameOriginRequest(request: NextRequest): boolean {
  const secFetchSite = request.headers.get("sec-fetch-site");
  const secFetchDest = request.headers.get("sec-fetch-dest");

  // Block direct browser top-level navigation to the image endpoint (e.g. "Open in new tab")
  if (secFetchDest === "document") {
    return false;
  }

  // Modern browsers send Sec-Fetch-Site: same-origin for in-app fetch()
  if (secFetchSite && secFetchSite !== "same-origin" && secFetchSite !== "same-site") {
    return false;
  }

  const referer = request.headers.get("referer");
  const host = request.headers.get("host");
  if (referer && host) {
    try {
      const refUrl = new URL(referer);
      if (refUrl.host !== host) {
        return false;
      }
    } catch {
      return false;
    }
  }

  return true;
}

export async function GET(request: NextRequest) {
  try {
    if (!isSameOriginRequest(request)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const pageId = searchParams.get("pageId");

    if (!slug || !pageId) {
      return new NextResponse("Missing parameters", { status: 400 });
    }

    const design = await getDesignBySlug(slug);
    if (!design) {
      return new NextResponse("Design not found", { status: 404 });
    }

    let targetUrl: string | null = null;
    if (pageId === "__primary__") {
      targetUrl = design.image;
    } else {
      const page = (design.previewImages || []).find((p) => p.id === pageId);
      if (page?.url) {
        targetUrl = page.url;
      }
    }

    if (!targetUrl) {
      return new NextResponse("Demo page not found", { status: 404 });
    }

    const privacyHeaders: Record<string, string> = {
      "Cache-Control": "private, no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
      "Content-Disposition": "inline",
      "X-Robots-Tag": "noindex, noimageindex, noarchive",
      "X-Content-Type-Options": "nosniff",
    };

    // Remote image (e.g. Cloudinary)
    if (/^https?:\/\//i.test(targetUrl)) {
      const upstream = await fetch(targetUrl, {
        cache: "no-store",
      });
      if (!upstream.ok) {
        return new NextResponse("Upstream image unavailable", { status: 502 });
      }
      const contentType = upstream.headers.get("content-type") || "image/png";
      const arrayBuffer = await upstream.arrayBuffer();
      return new NextResponse(arrayBuffer, {
        status: 200,
        headers: {
          ...privacyHeaders,
          "Content-Type": contentType,
        },
      });
    }

    // Local public/ image fallback
    if (targetUrl.startsWith("/")) {
      const publicRoot = path.resolve(process.cwd(), "public");
      const resolved = path.resolve(publicRoot, targetUrl.replace(/^\/+/, ""));
      // Prevent directory traversal outside public/
      if (!resolved.startsWith(publicRoot + path.sep)) {
        return new NextResponse("Invalid path", { status: 400 });
      }
      const fileBuffer = await readFile(resolved);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          ...privacyHeaders,
          "Content-Type": getMimeType(resolved),
        },
      });
    }

    return new NextResponse("Unsupported image URL", { status: 400 });
  } catch (error) {
    console.error("Protected demo image proxy error:", error);
    return new NextResponse("Failed to load demo image", { status: 500 });
  }
}
