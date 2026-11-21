import Link from "next/link";
import { Plus, Palette } from "lucide-react";
import { getAllDesignsAdmin } from "@/services/casinoService";
import DesignsTable from "@/components/admin/designs/DesignsTable";

export const dynamic = "force-dynamic";

export default async function AdminDesignsListPage() {
  const designs = await getAllDesignsAdmin();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
        <div>
          <div className="flex items-center gap-2">
            <Palette size={20} className="text-[#FFD700]" />
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Casino Design Catalog
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Manage live casino themes, display order, toggle visibility, and upload multi-PNG preview suites.
          </p>
        </div>

        <Link
          href="/admin/designs/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(255,215,0,0.3)] self-start sm:self-auto"
        >
          <Plus size={15} className="stroke-[2.5]" />
          <span>Add New Casino Theme</span>
        </Link>
      </div>

      {/* Designs Table */}
      <DesignsTable initialDesigns={designs} />
    </div>
  );
}
