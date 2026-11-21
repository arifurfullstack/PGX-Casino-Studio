import { notFound } from "next/navigation";
import { getDesignBySlug } from "@/services/casinoService";
import DesignForm from "@/components/admin/designs/DesignForm";

interface AdminEditDesignPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function AdminEditDesignPage({ params }: AdminEditDesignPageProps) {
  const { slug } = await params;
  const design = await getDesignBySlug(slug);

  if (!design) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
          Edit Theme: {design.name}
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Update theme details, adjust display order, manage Cloudinary multi-PNG preview suite.
        </p>
      </div>

      <DesignForm initialDesign={design} isNew={false} />
    </div>
  );
}
