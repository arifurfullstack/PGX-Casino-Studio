import { notFound } from "next/navigation";
import { getDesignBySlug, getAllActiveDesigns } from "@/services/casinoService";
import DemoSidebar from "@/components/designs/DemoSidebar";
import CasinoPreviewStage from "@/components/designs/CasinoPreviewStage";

interface DesignDemoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const designs = await getAllActiveDesigns();
  return designs.map((d) => ({ slug: d.slug }));
}

export default async function DesignDemoPage({ params }: DesignDemoPageProps) {
  const { slug } = await params;
  const design = await getDesignBySlug(slug);

  if (!design) {
    notFound();
  }

  return (
    <div className="pt-4 sm:pt-6 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Showcase matching exact mockup */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          <DemoSidebar design={design} />
          <CasinoPreviewStage design={design} />
        </div>
      </div>
    </div>
  );
}
