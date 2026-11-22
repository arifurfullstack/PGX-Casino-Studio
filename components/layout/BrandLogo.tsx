import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  sizeClassName?: string;
  priority?: boolean;
}

export default function BrandLogo({
  className = "",
  sizeClassName = "w-20 sm:w-24 lg:w-[115px]",
  priority = false,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Royal Casino Club — Online Casino Solutions"
      className={`inline-flex items-center group relative z-10 shrink-0 ${className}`}
    >
      <div
        className={`relative aspect-[1158/612] transition-transform duration-300 group-hover:scale-105 ${sizeClassName}`}
      >
        <Image
          src="/images/royal-hero/royal-hero-logo-perfect.png"
          alt="Royal Casino Club - Online Casino Solutions"
          fill
          className="object-contain object-left drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
          priority={priority}
          unoptimized
        />
      </div>
    </Link>
  );
}
