"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Edit,
  Trash2,
  Search,
  Eye,
  EyeOff,
  Monitor,
} from "lucide-react";
import { CasinoDesign, DesignStatus } from "@/types";
import { toggleDesignStatusAction, deleteDesignAction } from "@/app/actions/designActions";
import WebsiteDemoModal from "@/components/designs/WebsiteDemoModal";

interface DesignsTableProps {
  initialDesigns: CasinoDesign[];
}

export default function DesignsTable({ initialDesigns }: DesignsTableProps) {
  const [designs, setDesigns] = useState(initialDesigns);
  const [search, setSearch] = useState("");
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const [demoPreviewDesign, setDemoPreviewDesign] = useState<CasinoDesign | null>(null);

  const filtered = designs.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggleStatus = async (slug: string, currentStatus: DesignStatus) => {
    const nextStatus: DesignStatus = currentStatus === "active" ? "hidden" : "active";
    setLoadingSlug(slug);

    // Optimistic update
    setDesigns((prev) =>
      prev.map((d) => (d.slug === slug ? { ...d, status: nextStatus } : d))
    );

    const res = await toggleDesignStatusAction(slug, nextStatus);
    if (!res.success) {
      // Revert if failed
      setDesigns((prev) =>
        prev.map((d) => (d.slug === slug ? { ...d, status: currentStatus } : d))
      );
      alert("Failed to update status. Please try again.");
    }
    setLoadingSlug(null);
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }
    setLoadingSlug(slug);
    const res = await deleteDesignAction(slug);
    if (res.success) {
      setDesigns((prev) => prev.filter((d) => d.slug !== slug));
    } else {
      alert("Failed to delete design.");
    }
    setLoadingSlug(null);
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-sm">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by theme name or slug..."
          className="w-full px-4 py-2 pl-9 rounded-lg bg-[#080214] border border-purple-500/30 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#FFD700]"
        />
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-purple-900/40 bg-[#080214]">
        <table className="w-full text-left text-xs text-gray-300">
          <thead className="bg-purple-950/40 text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-purple-900/40">
            <tr>
              <th className="py-3 px-4">Design</th>
              <th className="py-3 px-4">Order</th>
              <th className="py-3 px-4">Demo Pages</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-900/20">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No casino designs found.
                </td>
              </tr>
            ) : (
              filtered.map((design) => {
                const previewCount = design.previewImages?.length || 0;
                const isLoading = loadingSlug === design.slug;

                return (
                  <tr key={design.slug} className="hover:bg-white/[0.02] transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-9 rounded overflow-hidden bg-black/50 border border-purple-500/30 shrink-0">
                          <Image
                            src={design.image}
                            alt={design.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">{design.name}</p>
                          <p className="text-[10px] text-gray-500 font-mono">/{design.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Order */}
                    <td className="py-3 px-4 font-mono text-gray-400">
                      #{design.order ?? 0}
                    </td>

                    {/* Demo Pages Badge */}
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => setDemoPreviewDesign(design)}
                        title="Preview interactive demo modal"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-500/35 text-[10px] font-medium transition-colors cursor-pointer"
                      >
                        <Monitor size={11} className="text-[#FFD700]" />
                        <span>{previewCount} {previewCount === 1 ? "Page" : "Pages"}</span>
                      </button>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(design.slug, design.status)}
                        disabled={isLoading}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                          design.status === "active"
                            ? "bg-emerald-950 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900"
                            : "bg-gray-900 text-gray-400 border-gray-700 hover:bg-gray-800"
                        }`}
                        title="Click to toggle active/hidden"
                      >
                        {design.status === "active" ? (
                          <>
                            <Eye size={11} />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={11} />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setDemoPreviewDesign(design)}
                          title="Preview Protected Website Demo Modal"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900 text-purple-200 hover:text-white border border-purple-500/30 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Monitor size={12} />
                          <span>Demo</span>
                        </button>

                        <Link
                          href={`/designs/${design.slug}`}
                          target="_blank"
                          title="Open Standalone Storefront Page"
                          className="p-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900 text-gray-300 hover:text-white border border-purple-500/30 transition-colors"
                        >
                          <ExternalLink size={13} />
                        </Link>

                        <Link
                          href={`/admin/designs/${design.slug}/edit`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 shadow-[0_0_10px_rgba(255,215,0,0.25)] transition-all"
                        >
                          <Edit size={12} className="stroke-[2.5]" />
                          <span>Edit</span>
                        </Link>

                        <button
                          onClick={() => handleDelete(design.slug, design.name)}
                          disabled={isLoading}
                          title="Delete Design"
                          className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-400 hover:text-red-200 border border-red-500/30 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Live Demo Modal Preview right from Admin Table */}
      <WebsiteDemoModal
        design={demoPreviewDesign}
        onClose={() => setDemoPreviewDesign(null)}
        allowUnsavedAdminPreview={true}
      />
    </div>
  );
}
