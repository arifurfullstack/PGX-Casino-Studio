"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Loader2 } from "lucide-react";
import { DesignPreviewImage } from "@/types";
import { uploadDesignImageAction } from "@/app/actions/designActions";

interface MultiPngManagerProps {
  previewImages: DesignPreviewImage[];
  onChange: (images: DesignPreviewImage[]) => void;
}

export default function MultiPngManager({ previewImages, onChange }: MultiPngManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newItems: DesignPreviewImage[] = [];
    let currentOrder = previewImages.length + 1;

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(`Uploading ${i + 1} of ${files.length}...`);

        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const res = await uploadDesignImageAction(base64, "alli-gaming/previews");
        if (res.success && res.url) {
          newItems.push({
            id: `png_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            title:
              files.length === 1 && newTitle.trim()
                ? newTitle.trim()
                : file.name.replace(/\.[^/.]+$/, ""),
            url: res.url,
            order: currentOrder++,
          });
        } else {
          console.error(`Failed to upload ${file.name}:`, res.error);
        }
      }

      if (newItems.length > 0) {
        onChange([...previewImages, ...newItems]);
        setNewTitle("");
      } else {
        alert("Failed to upload image(s). Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error processing upload.");
    } finally {
      setUploading(false);
      setUploadProgress("");
      e.target.value = "";
    }
  };

  const handleRemove = (id: string) => {
    onChange(previewImages.filter((p) => p.id !== id));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= previewImages.length) return;

    const copy = [...previewImages];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    // re-index order
    const updated = copy.map((item, idx) => ({ ...item, order: idx + 1 }));
    onChange(updated);
  };

  const handleTitleChange = (id: string, title: string) => {
    onChange(previewImages.map((p) => (p.id === id ? { ...p, title } : p)));
  };

  return (
    <div className="space-y-4 p-4 rounded-xl bg-[#080214] border border-purple-900/40">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon size={14} className="text-[#FFD700]" />
            <span>Multi-PNG Demo Suite ({previewImages.length} Previews)</span>
          </h3>
          <p className="text-[11px] text-gray-400">
            Upload multiple PNG previews (e.g. Homepage, Slots Lobby, Live Dealer, Mobile). Customers can switch between them in the live demo stage.
          </p>
        </div>
      </div>

      {/* Uploader Box */}
      <div className="p-3.5 rounded-lg bg-purple-950/20 border border-dashed border-purple-500/40 flex flex-col sm:flex-row items-center gap-3">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Preview title (e.g. Slots Lobby, Mobile View)"
          className="flex-1 px-3 py-1.5 rounded-lg bg-[#04010a] border border-purple-500/30 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#FFD700]"
        />

        <label className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 cursor-pointer transition-all shadow-[0_0_10px_rgba(255,215,0,0.3)] shrink-0">
          {uploading ? (
            <>
              <Loader2 size={13} className="animate-spin" />
              <span>{uploadProgress || "Uploading..."}</span>
            </>
          ) : (
            <>
              <Upload size={13} className="stroke-[2.5]" />
              <span>Upload PNG Previews</span>
            </>
          )}
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp"
            disabled={uploading}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Uploaded PNG Previews List */}
      {previewImages.length === 0 ? (
        <div className="py-6 text-center text-gray-500 text-xs border border-purple-900/20 rounded-lg">
          No preview PNGs uploaded for this theme yet. Upload above to create an interactive demo suite.
        </div>
      ) : (
        <div className="space-y-2">
          {previewImages.map((img, idx) => (
            <div
              key={img.id}
              className="p-2.5 rounded-lg bg-[#04010a] border border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-mono text-gray-500">#{idx + 1}</span>
                <div className="relative w-16 h-10 rounded bg-black/60 border border-purple-500/30 overflow-hidden shrink-0">
                  <Image
                    src={img.url}
                    alt={img.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <input
                  type="text"
                  value={img.title}
                  onChange={(e) => handleTitleChange(img.id, e.target.value)}
                  className="px-2.5 py-1 rounded bg-[#080214] border border-purple-900/50 text-white text-xs font-semibold focus:outline-none focus:border-[#FFD700] w-full sm:w-48"
                  placeholder="View title"
                />
              </div>

              {/* Order & Remove Controls */}
              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleMove(idx, "up")}
                  disabled={idx === 0}
                  className="p-1 rounded bg-purple-950/60 hover:bg-purple-900 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move Up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, "down")}
                  disabled={idx === previewImages.length - 1}
                  className="p-1 rounded bg-purple-950/60 hover:bg-purple-900 text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move Down"
                >
                  <ArrowDown size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(img.id)}
                  className="p-1 rounded bg-red-950/60 hover:bg-red-900 text-red-400 hover:text-red-200"
                  title="Delete Preview"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
