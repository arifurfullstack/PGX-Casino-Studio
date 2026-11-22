"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Crown, Send } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Royal Casino Club,
Name: ${name}
Phone/WhatsApp: ${phone}
Email: ${email || "N/A"}
Message: ${message || "I am interested in launching an online casino."}`;

    const url = `https://wa.me/14167256538?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="contact" className="py-10 sm:py-16 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-2 lg:items-center">
        {/* Left Column: Direct Contact Info */}
        <div>
          <h2 className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold uppercase italic leading-tight text-white font-philosopher">
            Get in <span className="gold-text">touch</span>
          </h2>
          <p className="mt-3 max-w-md text-base sm:text-lg text-white/70">
            Tell us which design you like and which modules you need. We reply on WhatsApp.
          </p>

          <ul className="mt-6 space-y-4 text-base sm:text-lg">
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 shrink-0 text-[#f5c451]" />
              <a
                href="mailto:contact@royalcasinoclub.com"
                className="font-semibold text-white/90 hover:text-[#f5c451] transition-colors"
              >
                contact@royalcasinoclub.com
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 shrink-0 text-[#f5c451]" />
              <a
                href="https://wa.me/14167256538?text=Hi%20Royal%20Casino%20Club%2C%20I%27d%20like%20to%20know%20more."
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white/90 hover:text-[#f5c451] transition-colors"
              >
                +1 (416) 725-6538 (WhatsApp)
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Crown className="h-5 w-5 shrink-0 text-[#f5c451] fill-[#f5c451]" />
              <Link
                href="/select-design"
                className="font-bold text-[#f5c451] hover:underline"
              >
                Reserve A Casino ($500 Hold)
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column: Interactive Send on WhatsApp Form */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="card grid gap-4 rounded-[2rem] p-6 sm:p-8"
          >
            <h3 className="text-2xl font-bold text-white font-philosopher">Send us a message</h3>

            <label className="grid gap-1.5 text-sm font-semibold text-white/90">
              <span>Your name</span>
              <input
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="input font-normal text-white placeholder:text-white/40"
              />
            </label>

            <label className="grid gap-1.5 text-sm font-semibold text-white/90">
              <span>Phone / WhatsApp</span>
              <input
                type="tel"
                required
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 (416) 555-0123"
                className="input font-normal text-white placeholder:text-white/40"
              />
            </label>

            <label className="grid gap-1.5 text-sm font-semibold text-white/90">
              <span>
                Email <span className="font-normal text-white/50">(optional)</span>
              </span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="input font-normal text-white placeholder:text-white/40"
              />
            </label>

            <label className="grid gap-1.5 text-sm font-semibold text-white/90">
              <span>How can we help?</span>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your casino goals..."
                className="input font-normal text-white placeholder:text-white/40"
              />
            </label>

            <button
              type="submit"
              className="btn btn-primary mt-2 text-base font-bold shadow-lg"
            >
              <Send className="h-4 w-4" />
              <span>Send on WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
