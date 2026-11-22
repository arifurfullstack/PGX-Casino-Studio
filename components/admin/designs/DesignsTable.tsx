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
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "hidden">("all");
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  const [demoPreviewDesign, setDemoPreviewDesign] = useState<CasinoDesign | null>(null);

  const filtered = designs.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.slug.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (statusFilter === "active") return d.status === "active";
    if (statusFilter === "hidden") return d.status !== "active";
    return true;
  });

  const handleToggleStatus = async (slug: string, currentStatus: DesignStatus) => {
    const nextStatus: DesignStatus = currentStatus === "active" ? "hidden" : "active";
    setLoadingSlug(slug);

    setDesigns((prev) =>
      prev.map((d) => (d.slug === slug ? { ...d, status: nextStatus } : d))
    );

    const res = await toggleDesignStatusAction(slug, nextStatus);
    if (!res.success) {
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
    <div className="space-y-5">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by theme name or slug..."
            className="w-full px-4 py-2.5 pl-10 rounded-xl bg-[#080214] border border-purple-500/35 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFD700]"
          />
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {(["all", "active", "hidden"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all cursor-pointer ${
                statusFilter === tab
                  ? "bg-purple-950 text-[#FFD700] border border-purple-500/50"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-purple-900/40 bg-[#080214] shadow-xl">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="bg-purple-950/45 text-xs font-bold uppercase tracking-wider text-gray-300 border-b border-purple-900/40">
            <tr>
              <th className="py-4 px-5">Design</th>
              <th className="py-4 px-5">Order</th>
              <th className="py-4 px-5">Demo Pages</th>
              <th className="py-4 px-5">Status</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-purple-900/25">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-400 text-sm">
                  No casino designs found.
                </td>
              </tr>
            ) : (
              filtered.map((design) => {
                const previewCount = design.previewImages?.length || 0;
                const isLoading = loadingSlug === design.slug;

                return (
                  <tr key={design.slug} className="hover:bg-white/[0.03] transition-colors">
                    {/* Thumbnail & Title */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-black/50 border border-purple-500/35 shrink-0">
                          <Image
                            src={design.image}
                            alt={design.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm sm:text-base">{design.name}</p>
                          <p className="text-xs text-gray-400 font-mono">/{design.slug}</p>
                        </div>
                      </div>
                    </td>

                    {/* Order */}
                    <td className="py-4 px-5 font-mono text-gray-300 font-semibold">
                      #{design.order ?? 0}
                    </td>

                    {/* Demo Pages Badge */}
                    <td className="py-4 px-5">
                      <button
                        type="button"
                        onClick={() => setDemoPreviewDesign(design)}
                        title="Preview interactive demo modal"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-500/35 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Monitor size={14} className="text-[#FFD700]" />
                        <span>
                          {previewCount} {previewCount === 1 ? "Page" : "Pages"}
                        </span>
                      </button>
                    </td>

                    {/* Status Pill */}
                    <td className="py-4 px-5">
                      <button
                        onClick={() => handleToggleStatus(design.slug, design.status)}
                        disabled={isLoading}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                          design.status === "active"
                            ? "bg-emerald-950 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900"
                            : "bg-gray-900 text-gray-400 border-gray-700 hover:bg-gray-800"
                        }`}
                        title="Click to toggle active/hidden"
                      >
                        {design.status === "active" ? (
                          <>
                            <Eye size={13} />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={13} />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setDemoPreviewDesign(design)}
                          title="Preview Protected Website Demo Modal"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-950/70 hover:bg-purple-900 text-purple-200 hover:text-white border border-purple-500/35 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                        >
                          <Monitor size={14} />
                          <span>Demo</span>
                        </button>

                        <Link
                          href={`/designs/${design.slug}`}
                          target="_blank"
                          title="Open Standalone Storefront Page"
                          className="p-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-gray-300 hover:text-white border border-purple-500/35 transition-colors"
                        >
                          <ExternalLink size={15} />
                        </Link>

                        <Link
                          href={`/admin/designs/${design.slug}/edit`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 shadow-[0_0_12px_rgba(255,215,0,0.25)] transition-all"
                        >
                          <Edit size={14} className="stroke-[2.5]" />
                          <span>Edit</span>
                        </Link>

                        <button
                          onClick={() => handleDelete(design.slug, design.name)}
                          disabled={isLoading}
                          title="Delete Design"
                          className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-400 hover:text-red-200 border border-red-500/35 transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} />
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
