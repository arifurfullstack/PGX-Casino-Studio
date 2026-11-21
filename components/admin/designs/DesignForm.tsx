"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Upload, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { CasinoDesign, DesignPreviewImage, DesignStatus } from "@/types";
import { saveDesignAction, uploadDesignImageAction } from "@/app/actions/designActions";
import MultiPngManager from "./MultiPngManager";

interface DesignFormProps {
  initialDesign?: CasinoDesign;
  isNew?: boolean;
}

export default function DesignForm({ initialDesign, isNew = false }: DesignFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);

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
    if (isNew && !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  const handleThumbUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingThumb(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const res = await uploadDesignImageAction(base64, "alli-gaming/thumbnails");
      if (res.success && res.url) {
        setImage(res.url);
      } else {
        alert("Thumbnail upload failed: " + res.error);
      }
      setUploadingThumb(false);
    };
    reader.readAsDataURL(files[0]);
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      alert("Name and slug are required.");
      return;
    }

    setSaving(true);
    const tags = tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await saveDesignAction({
      slug,
      name,
      subtitle,
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
        <Link
          href="/admin/designs"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Catalog</span>
        </Link>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 shadow-[0_0_15px_rgba(255,215,0,0.35)] transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} className="stroke-[2.5]" />}
          <span>{isNew ? "Create Theme" : "Save Changes"}</span>
        </button>
      </div>

      {/* Main Grid: Details + Thumbnail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Core Fields */}
        <div className="lg:col-span-2 space-y-4 p-5 rounded-xl bg-[#080214] border border-purple-900/40">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
            Theme Metadata
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                Theme Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Royal Prestige"
                className="w-full px-3 py-2 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                required
                disabled={!isNew}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. royal-prestige"
                className="w-full px-3 py-2 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs disabled:opacity-50 focus:outline-none focus:border-[#FFD700]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
              Subtitle / Design Concept
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Luxury Lion &amp; Gold VIP Experience"
              className="w-full px-3 py-2 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-[#FFD700]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                Storefront Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as DesignStatus)}
                className="w-full px-3 py-2 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-[#FFD700]"
              >
                <option value="active">Active (Visible)</option>
                <option value="hidden">Hidden</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 uppercase mb-1">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="VIP, Gold, Slots"
                className="w-full px-3 py-2 rounded-lg bg-[#04010a] border border-purple-500/30 text-white text-xs focus:outline-none focus:border-[#FFD700]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Primary Thumbnail */}
        <div className="space-y-4 p-5 rounded-xl bg-[#080214] border border-purple-900/40 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Primary Thumbnail
            </h2>
            <div className="relative aspect-[460/220] rounded-lg bg-[#04010a] border border-purple-500/30 overflow-hidden mb-3">
              <Image
                src={image}
                alt={name || "Casino preview"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <p className="text-[11px] text-gray-400">
              Shown in the 12-grid catalog and quote builder.
            </p>
          </div>

          <label className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-center text-purple-200 bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 cursor-pointer transition-all flex items-center justify-center gap-2">
            {uploadingThumb ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            <span>Upload New Thumbnail</span>
            <input
              type="file"
              accept="image/*"
              disabled={uploadingThumb}
              onChange={handleThumbUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Multi-PNG Suite Manager */}
      <MultiPngManager
        previewImages={previewImages}
        onChange={(images) => setPreviewImages(images)}
      />
    </form>
  );
}
