"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Upload,
  Trash2,
  ArrowUp,
  ArrowDown,
  Loader2,
  Plus,
  RefreshCw,
  Monitor,
} from "lucide-react";
import { DesignPreviewImage } from "@/types";
import { deleteDesignImageAction } from "@/app/actions/designActions";

interface MultiPngManagerProps {
  previewImages: DesignPreviewImage[];
  onChange: (images: DesignPreviewImage[]) => void;
  designSlug?: string;
}

const CORE_PAGE_SLOTS = [
  { title: "Homepage", pagePath: "/" },
  { title: "Services", pagePath: "/services" },
  { title: "Pricing", pagePath: "/pricing" },
  { title: "About", pagePath: "/about" },
  { title: "Contact", pagePath: "/contact" },
];

function makePathFromTitle(title: string, isFirst: boolean): string {
  const clean = title.trim().toLowerCase();
  if (isFirst && (clean === "home" || clean === "homepage")) return "/";
  const slug = clean.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug ? `/${slug}` : "/page";
}

export default function MultiPngManager({
  previewImages,
  onChange,
  designSlug,
}: MultiPngManagerProps) {
  const [busySlot, setBusySlot] = useState<string | null>(null);
  const [customTitle, setCustomTitle] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const folder = designSlug
    ? `alli-gaming/previews/${designSlug.replace(/[^a-z0-9-_]/gi, "")}`
    : "alli-gaming/previews";

  const uploadSingleFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    const res = await response.json();
    if (!response.ok || !res.success || !res.url) {
      throw new Error(res.error || "Upload failed");
    }
    return {
      url: res.url as string,
      publicId: res.publicId as string | undefined,
    };
  };

  // 1-click upload for a specific preset slot (Homepage, Services, Pricing, About, Contact)
  const handleSlotUpload = async (
    slot: { title: string; pagePath: string },
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setBusySlot(slot.title);
    try {
      const uploaded = await uploadSingleFile(file);
      const newPage: DesignPreviewImage = {
        id: `page_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        title: slot.title,
        pagePath: slot.pagePath,
        url: uploaded.url,
        publicId: uploaded.publicId,
        order: previewImages.length + 1,
      };
      onChange([...previewImages, newPage]);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusySlot(null);
    }
  };

  // Replace an existing page's UI image in 1 click
  const handleReplaceImage = async (
    item: DesignPreviewImage,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setBusySlot(item.id);
    try {
      const uploaded = await uploadSingleFile(file);
      const oldPublicId = item.publicId;
      onChange(
        previewImages.map((p) =>
          p.id === item.id
            ? { ...p, url: uploaded.url, publicId: uploaded.publicId }
            : p
        )
      );
      if (oldPublicId) {
        deleteDesignImageAction(oldPublicId).catch(() => {});
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to replace image");
    } finally {
      setBusySlot(null);
    }
  };

  // Custom page or multi-file bulk upload
  const handleBulkUpload = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;

    setBusySlot("__bulk__");
    const added: DesignPreviewImage[] = [];
    const errors: string[] = [];
    let nextOrder = previewImages.length + 1;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const uploaded = await uploadSingleFile(file);
          const inferredTitle =
            files.length === 1 && customTitle.trim()
              ? customTitle.trim()
              : file.name
                  .replace(/\.[^/.]+$/, "")
                  .replace(/[-_]+/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase());

          const isFirst = previewImages.length === 0 && added.length === 0;
          added.push({
            id: `page_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            title: inferredTitle,
            pagePath: makePathFromTitle(inferredTitle, isFirst),
            url: uploaded.url,
            publicId: uploaded.publicId,
            order: nextOrder++,
          });
        } catch (err) {
          errors.push(
            `${file.name}: ${err instanceof Error ? err.message : "Upload failed"}`
          );
        }
      }

      if (added.length > 0) {
        onChange([...previewImages, ...added]);
        setCustomTitle("");
      }
      if (errors.length > 0) {
        alert(`Some uploads failed:\n${errors.join("\n")}`);
      }
    } finally {
      setBusySlot(null);
    }
  };

  const handleRemove = (item: DesignPreviewImage) => {
    const remaining = previewImages
      .filter((p) => p.id !== item.id)
      .map((p, idx) => ({ ...p, order: idx + 1 }));
    onChange(remaining);
    if (item.publicId) {
      deleteDesignImageAction(item.publicId).catch(() => {});
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= previewImages.length) return;
    const copy = [...previewImages];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy.map((item, idx) => ({ ...item, order: idx + 1 })));
  };

  const handleTitleChange = (id: string, title: string, index: number) => {
    onChange(
      previewImages.map((p) =>
        p.id === id
          ? { ...p, title, pagePath: makePathFromTitle(title, index === 0) }
          : p
      )
    );
  };

  // Core slots not yet added by the admin
  const existingTitles = new Set(
    previewImages.map((p) => p.title.trim().toLowerCase())
  );
  const remainingCoreSlots = CORE_PAGE_SLOTS.filter(
    (s) => !existingTitles.has(s.title.toLowerCase())
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={async (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (!busySlot && e.dataTransfer.files?.length) {
          await handleBulkUpload(e.dataTransfer.files);
        }
      }}
      className={`space-y-4 p-5 rounded-xl bg-[#080214] border transition-colors ${
        isDragging ? "border-[#FFD700] bg-purple-950/25" : "border-purple-900/40"
      }`}
    >
      {/* Minimal Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Monitor size={14} className="text-[#FFD700]" />
            <span>Demo Website Pages</span>
            <span className="px-2 py-0.5 rounded-full bg-purple-950 border border-purple-500/30 text-[10px] font-semibold text-purple-200 normal-case">
              {previewImages.length} {previewImages.length === 1 ? "page" : "pages"}
            </span>
          </h3>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Upload UI images for each page (Homepage, Services, Pricing, About, Contact, etc.). Visitors browse them in the right-click-protected demo modal.
          </p>
        </div>
      </div>

      {/* 1-Click Core Page Upload Slots (Minimal) */}
      {remainingCoreSlots.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {remainingCoreSlots.map((slot) => {
            const isUploadingThis = busySlot === slot.title;
            return (
              <label
                key={slot.title}
                className={`group flex flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed px-3 py-3.5 text-center transition-all cursor-pointer ${
                  isUploadingThis
                    ? "border-[#FFD700] bg-purple-950/40"
                    : "border-purple-500/35 bg-[#04010a] hover:border-[#FFD700]/70 hover:bg-purple-950/30"
                }`}
              >
                {isUploadingThis ? (
                  <Loader2 size={16} className="animate-spin text-[#FFD700]" />
                ) : (
                  <Upload
                    size={15}
                    className="text-purple-300 group-hover:text-[#FFD700] transition-colors"
                  />
                )}
                <span className="text-xs font-semibold text-white">
                  {slot.title}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  {slot.pagePath}
                </span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  disabled={Boolean(busySlot)}
                  onChange={(e) => handleSlotUpload(slot, e)}
                  className="hidden"
                />
              </label>
            );
          })}
        </div>
      )}

      {/* Uploaded Pages List */}
      {previewImages.length > 0 && (
        <div className="space-y-2">
          {previewImages.map((img, idx) => {
            const isReplacing = busySlot === img.id;
            return (
              <div
                key={img.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-2.5 rounded-lg bg-[#04010a] border border-purple-900/40"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-[11px] font-mono text-gray-500 w-5 shrink-0">
                    {idx + 1}.
                  </span>

                  {/* Thumbnail with 1-click replace */}
                  <label
                    title="Click to replace UI image"
                    className="group/thumb relative w-14 h-10 rounded overflow-hidden bg-black/60 border border-purple-500/30 shrink-0 cursor-pointer"
                  >
                    <Image
                      src={img.url}
                      alt={img.title}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                      {isReplacing ? (
                        <Loader2 size={12} className="animate-spin text-[#FFD700]" />
                      ) : (
                        <RefreshCw size={12} className="text-[#FFD700]" />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/avif"
                      disabled={Boolean(busySlot)}
                      onChange={(e) => handleReplaceImage(img, e)}
                      className="hidden"
                    />
                  </label>

                  {/* Minimal Page Name Input */}
                  <input
                    type="text"
                    value={img.title}
                    onChange={(e) => handleTitleChange(img.id, e.target.value, idx)}
                    placeholder="Page name"
                    className="flex-1 min-w-0 px-2.5 py-1.5 rounded bg-[#080214] border border-purple-900/50 text-white text-xs font-semibold focus:outline-none focus:border-[#FFD700]"
                  />

                  <span className="hidden md:inline-block text-[11px] font-mono text-gray-500 shrink-0">
                    {img.pagePath || (idx === 0 ? "/" : "/page")}
                  </span>
                </div>

                {/* Minimal Controls */}
                <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                  {idx === 0 && (
                    <span className="px-2 py-0.5 rounded bg-[#FFD700]/10 text-[#FFE28A] text-[10px] font-semibold mr-1">
                      Start Page
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleMove(idx, "up")}
                    disabled={idx === 0}
                    title="Move up"
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-purple-950/70 disabled:opacity-25 cursor-pointer"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, "down")}
                    disabled={idx === previewImages.length - 1}
                    title="Move down"
                    className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-purple-950/70 disabled:opacity-25 cursor-pointer"
                  >
                    <ArrowDown size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(img)}
                    title="Remove page"
                    className="p-1.5 rounded text-red-400/80 hover:text-red-300 hover:bg-red-950/60 cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Minimal Custom Page / Bulk Add Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
        <input
          type="text"
          value={customTitle}
          onChange={(e) => setCustomTitle(e.target.value)}
          placeholder="Custom page name (optional, e.g. VIP Club, Games)..."
          className="flex-1 px-3 py-2 rounded-lg bg-[#04010a] border border-purple-500/30 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#FFD700]"
        />
        <label className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 cursor-pointer transition-all shrink-0">
          {busySlot === "__bulk__" ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Plus size={14} className="stroke-[2.5]" />
              <span>Add Custom / Multiple Pages</span>
            </>
          )}
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp,image/avif"
            disabled={Boolean(busySlot)}
            onChange={async (e) => {
              if (e.target.files?.length) {
                await handleBulkUpload(e.target.files);
              }
              e.target.value = "";
            }}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
