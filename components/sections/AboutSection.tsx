"use client";

export default function AboutSection() {
  return (
    <section id="about" className="py-10 sm:py-14 relative z-10">
      <div className="mx-auto max-w-[1672px] px-4 sm:px-6 lg:px-12">
        <div className="text-center">
          <h2 className="flourish font-philosopher text-[clamp(1.6rem,4vw,2.4rem)] font-bold uppercase italic leading-tight tracking-wide">
            <span>
              <span className="gold-text">About us</span>
            </span>
          </h2>
        </div>

        <div className="mx-auto mt-6 max-w-4xl text-center">
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-white/90 font-normal">
            Royal Casino Club provides premium turnkey online casino software solutions, empowering operators to launch customized, high-converting casinos worldwide.
          </p>
        </div>
      </div>
    </section>
  );
}
