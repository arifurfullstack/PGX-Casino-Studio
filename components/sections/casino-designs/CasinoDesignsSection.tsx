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
  {
    id: "ruby",
    name: "Ruby Casino",
    slug: "ruby-casino",
    image: "/images/ruby.jpg",
  },
  {
    id: "ocean",
    name: "Ocean Casino",
    slug: "ocean-casino",
    image: "/images/ocean.jpg",
  },
  {
    id: "mystic",
    name: "Mystic Casino",
    slug: "mystic-casino",
    image: "/images/mystic.jpg",
  },
  {
    id: "prestige",
    name: "Prestige Gold",
    slug: "prestige-gold",
    image: "/images/prestige.jpg",
  },
];

export default function CasinoDesignsSection() {
  const getDemoLink = (name: string, slug: string) =>
    `https://wa.me/14167256538?text=${encodeURIComponent(
      `Hi Royal Casino Club, please share the live demo of the ${name} design.`
    )}`;

  const getSelectLink = (name: string, slug: string) =>
    `/select-design?design=${slug}`;

  return (
    <section id="designs" className="py-10 sm:py-14 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        {/* 4 Featured Design Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredDesigns.map((design) => (
            <div
              key={design.id}
              className="panel panel-gold overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[406/166] w-full overflow-hidden bg-[#150726]">
                <Image
                  src={design.image}
                  alt={`${design.name} design`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#150726] to-transparent pointer-events-none" />
              </div>

              <h3 className="px-3 pt-3 text-center text-xl font-bold text-white font-philosopher">
                {design.name}
              </h3>

              <div className="flex flex-wrap justify-center gap-2 px-3 pb-4 pt-3">
                <a
                  href={getDemoLink(design.name, design.slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-neon btn-sm text-xs font-semibold"
                >
                  <span>View Demo</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <Link
                  href={getSelectLink(design.name, design.slug)}
                  className="btn btn-gold btn-sm text-xs font-bold"
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
