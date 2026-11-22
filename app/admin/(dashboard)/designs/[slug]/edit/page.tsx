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
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Edit Theme: {design.name}
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-1.5">
          Update theme details, display order, thumbnail, and protected demo website UI pages.
        </p>
      </div>

      <DesignForm initialDesign={design} isNew={false} />
    </div>
  );
}
