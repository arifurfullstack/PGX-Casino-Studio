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
    <div className="pt-3 sm:pt-6 pb-16">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main 2-Column Showcase: On mobile demo stage is top; on desktop sidebar is on the left */}
        <div className="flex flex-col-reverse lg:flex-row gap-5 xl:gap-7 items-start">
          <DemoSidebar design={design} />
          <CasinoPreviewStage design={design} />
        </div>
      </div>
    </div>
  );
}
