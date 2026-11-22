"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Upload, Loader2, Eye } from "lucide-react";
import Link from "next/link";
import { CasinoDesign, DesignPreviewImage, DesignStatus } from "@/types";
import { saveDesignAction } from "@/app/actions/designActions";
import MultiPngManager from "./MultiPngManager";
import WebsiteDemoModal from "@/components/designs/WebsiteDemoModal";

interface DesignFormProps {
  initialDesign?: CasinoDesign;
  isNew?: boolean;
}

export default function DesignForm({ initialDesign, isNew = false }: DesignFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [name, setName] = useState(initialDesign?.name || "");
  const [slug, setSlug] = useState(initialDesign?.slug || "");
  const [subtitle, setSubtitle] = useState(initialDesign?.subtitle || "");
  const [image, setImage] = useState(initialDesign?.image || "/images/card-royal-prestige-art.png");
  const [status, setStatus] = useState<DesignStatus>(initialDesign?.status || "active");
  const [order, setOrder] = useState<number>(initialDesign?.order ?? 0);
  const [tagsStr, setTagsStr] = useState(initialDesign?.tags?.join(", ") || "");
  const [previewImages, setPreviewImages] = useState<DesignPreviewImage[]>(
    initialDesign?.previewImages || []
  );

  const handleNameChange = (val: string) => {
    setName(val);
    if (isNew && !slugTouched) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  const handleThumbUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadingThumb(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "alli-gaming/thumbnails");

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const res = await response.json();

      if (response.ok && res.success && res.url) {
        setImage(res.url);
      } else {
        alert("Thumbnail upload failed: " + (res.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Thumbnail upload failed. Please try again.");
    } finally {
      setUploadingThumb(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      alert("Name and slug are required.");
      return;
    }

    setSaving(true);
    const tags = tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await saveDesignAction({
      slug: slug.trim(),
      name: name.trim(),
      subtitle: subtitle.trim(),
      image,
      previewImages,
      tags,
      status,
      order: Number(order),
      isNew,
    });

    if (res.success) {
      router.push("/admin/designs");
      router.refresh();
    } else {
      alert("Failed to save design: " + (res.error || "Unknown error"));
      setSaving(false);
    }
  };

  const draftDesign: CasinoDesign = {
    id: initialDesign?.id || slug || "draft",
    slug: slug || "preview",
    name: name || "Untitled Theme",
    subtitle,
    image,
    previewImages,
    status,
    order,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-purple-900/40">
        <Link
          href="/admin/designs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-purple-200 bg-purple-950/70 hover:bg-purple-900 border border-purple-500/40 transition-all cursor-pointer"
          >
            <Eye size={16} />
            <span>Preview Demo</span>
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 shadow-[0_0_20px_rgba(255,215,0,0.35)] transition-all disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} className="stroke-[2.5]" />
            )}
            <span>{isNew ? "Create Theme" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Details + Thumbnail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Core Fields */}
        <div className="lg:col-span-2 space-y-5 p-6 rounded-2xl bg-[#080214] border border-purple-900/40">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Theme Metadata
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                Theme Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Royal Prestige"
                className="w-full px-4 py-2.5 rounded-xl bg-[#04010a] border border-purple-500/35 text-white text-sm focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                URL Slug *
              </label>
              <input
                type="text"
                required
                disabled={!isNew}
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                placeholder="e.g. royal-prestige"
                className="w-full px-4 py-2.5 rounded-xl bg-[#04010a] border border-purple-500/35 text-white text-sm disabled:opacity-50 focus:outline-none focus:border-[#FFD700]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
              Subtitle / Design Concept
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Luxury Lion & Gold VIP Experience"
              className="w-full px-4 py-2.5 rounded-xl bg-[#04010a] border border-purple-500/35 text-white text-sm focus:outline-none focus:border-[#FFD700]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                Display Order
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#04010a] border border-purple-500/35 text-white text-sm focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                Storefront Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as DesignStatus)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#04010a] border border-purple-500/35 text-white text-sm focus:outline-none focus:border-[#FFD700]"
              >
                <option value="active">Active (Visible)</option>
                <option value="hidden">Hidden</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="VIP, Gold, Slots"
                className="w-full px-4 py-2.5 rounded-xl bg-[#04010a] border border-purple-500/35 text-white text-sm focus:outline-none focus:border-[#FFD700]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Primary Thumbnail */}
        <div className="space-y-4 p-6 rounded-2xl bg-[#080214] border border-purple-900/40 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Primary Thumbnail
            </h2>
            <div className="relative aspect-[3/2] rounded-xl bg-[#04010a] border border-purple-500/35 overflow-hidden mb-3">
              <Image
                src={image}
                alt={name || "Casino preview"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <p className="text-xs text-gray-400">
              Shown on the Homepage &amp; Catalog cards.
            </p>
          </div>

          <label className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-center text-purple-200 bg-purple-950/70 hover:bg-purple-900 border border-purple-500/40 cursor-pointer transition-all flex items-center justify-center gap-2">
            {uploadingThumb ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Upload size={16} />
            )}
            <span>{uploadingThumb ? "Uploading..." : "Upload New Thumbnail"}</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/avif"
              disabled={uploadingThumb}
              onChange={handleThumbUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Minimal Demo Website Pages Manager */}
      <MultiPngManager
        previewImages={previewImages}
        onChange={(images) => setPreviewImages(images)}
        designSlug={slug}
      />

      {/* Live Admin Demo Preview Modal */}
      <WebsiteDemoModal
        design={previewOpen ? draftDesign : null}
        onClose={() => setPreviewOpen(false)}
        allowUnsavedAdminPreview={true}
      />
    </form>
  );
}
