import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDesignBySlug, getAllActiveDesigns } from "@/services/casinoService";
import { getPricingConfig } from "@/services/pricingService";
import DemoSidebar from "@/components/designs/DemoSidebar";
import CasinoPreviewStage from "@/components/designs/CasinoPreviewStage";

interface DesignDemoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DesignDemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const design = await getDesignBySlug(slug);
  if (!design) {
    return { title: "Casino Design" };
  }
  const title = `${design.name} Casino Design`;
  const description = design.subtitle
    ? `${design.subtitle} — Preview the ${design.name} turnkey online casino design from Royal Casino Club. Launch from $15,000.`
    : `Preview the ${design.name} turnkey online casino theme from Royal Casino Club. Launch starting at $15,000.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Royal Casino Club`,
      description,
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${design.name} — Royal Casino Club Turnkey Online Casino Design`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Royal Casino Club`,
      description,
      images: ["/images/og-image.jpg"],
    },
  };
}

export async function generateStaticParams() {
  const designs = await getAllActiveDesigns();
  return designs.map((d) => ({ slug: d.slug }));
}

export default async function DesignDemoPage({ params }: DesignDemoPageProps) {
  const { slug } = await params;
  const [design, pricingConfig] = await Promise.all([
    getDesignBySlug(slug),
    getPricingConfig(),
  ]);

  if (!design) {
    notFound();
  }

  return (
    <div className="pt-3 sm:pt-6 pb-16">
      <div className="max-w-7xl 2xl:max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main 2-Column Showcase: On mobile demo stage is top; on desktop sidebar is on the left */}
        <div className="flex flex-col-reverse lg:flex-row gap-5 xl:gap-7 items-start">
          <DemoSidebar design={design} pricingConfig={pricingConfig} />
          <CasinoPreviewStage design={design} />
        </div>
      </div>
    </div>
  );
}
