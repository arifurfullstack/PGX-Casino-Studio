"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

interface DesignItem {
  id: string;
  name: string;
  slug: string;
  image: string;
}

const featuredDesigns: DesignItem[] = [
  // Row 1
  {
    id: "ruby",
    name: "Ruby Casino",
    slug: "ruby-casino",
    image: "/images/design-ruby-casino.png",
  },
  {
    id: "ocean",
    name: "Ocean Casino",
    slug: "ocean-casino",
    image: "/images/design-ocean-casino.png",
  },
  {
    id: "mystic",
    name: "Mystic Casino",
    slug: "mystic-casino",
    image: "/images/design-mystic-casino.png",
  },
  {
    id: "prestige",
    name: "Prestige Gold",
    slug: "prestige-gold",
    image: "/images/design-prestige-gold.png",
  },
  // Row 2
  {
    id: "royal-prestige",
    name: "Royal Prestige",
    slug: "royal-prestige",
    image: "/images/design-royal-prestige.png",
  },
  {
    id: "neon-vegas",
    name: "Neon Vegas",
    slug: "neon-vegas",
    image: "/images/design-neon-vegas.png",
  },
  {
    id: "diamond-palace",
    name: "Diamond Palace",
    slug: "diamond-palace",
    image: "/images/design-diamond-palace.png",
  },
  {
    id: "golden-crown",
    name: "Golden Crown",
    slug: "golden-crown",
    image: "/images/design-golden-crown.png",
  },
];

export default function CasinoDesignsSection() {
  const getDemoLink = (name: string) =>
    `https://wa.me/14167256538?text=${encodeURIComponent(
      `Hi Royal Casino Club, please share the live demo of the ${name} design.`
    )}`;

  const getSelectLink = (slug: string) => `/select-design?design=${slug}`;

  return (
    <section id="designs" className="py-10 sm:py-14 relative z-10">
      <div className="mx-auto max-w-[1672px] px-4 sm:px-6 lg:px-12">
        <div className="text-center">
          <h2 className="flourish font-philosopher text-[clamp(1.6rem,4vw,2.4rem)] font-bold uppercase italic leading-tight tracking-wide">
            <span>
              Choose your <span className="gold-text">casino design</span>
            </span>
          </h2>

          <Link href="/designs" className="btn btn-gold mx-auto mt-6">
            <span>View All Designs</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 2 Rows × 4 Featured High-Resolution Casino Design Cards */}
        <div className="mt-8 lg:mt-10 grid grid-cols-1 gap-6 lg:gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDesigns.map((design) => (
            <div
              key={design.id}
              className="group panel panel-gold panel-interactive overflow-hidden hover:-translate-y-1.5"
            >
              <div className="panel-sheen z-20" aria-hidden="true" />
              <div className="panel-rim z-20" aria-hidden="true" />

              <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#150726]">
                <Image
                  src={design.image}
                  alt={`${design.name} design`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#150726] via-[#150726]/45 to-transparent pointer-events-none" />
              </div>

              <h3 className="relative z-10 px-4 pt-4 text-center text-xl xl:text-2xl font-bold text-white font-philosopher transition-colors duration-500 group-hover:text-[#ffe28a]">
                {design.name}
              </h3>

              <div className="relative z-10 flex items-center justify-center gap-2.5 px-4 pb-5 pt-3.5">
                <a
                  href={getDemoLink(design.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-neon btn-sm !px-3.5 xl:!px-4 text-xs xl:text-sm font-semibold"
                >
                  <span>View Demo</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <Link
                  href={getSelectLink(design.slug)}
                  className="btn btn-gold btn-sm !px-3.5 xl:!px-4 text-xs xl:text-sm font-bold"
                >
                  <span>Select Design</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
