import Image from "next/image";
import { Mail, Phone, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-10 pb-6 border-t border-purple-900/40 bg-[#030107]">
      {/* Top golden accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1060px] h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />

      <div className="max-w-[1060px] mx-auto px-4 sm:px-6">
        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-8 border-b border-purple-950/60">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-2.5">
            <Image
              src="/images/alli-logo-hd.png"
              alt="All I Gaming"
              width={170}
              height={38}
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <p className="text-[11px] text-gray-400 leading-relaxed pr-2">
              All I Gaming provides premium turnkey online casino solutions, giving you the tools to launch and operate your own branded casino.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-[11px] text-gray-300">
              <li>
                <a href="#" className="hover:text-[#FFD700] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#designs" className="hover:text-[#FFD700] transition-colors">
                  Casino Designs
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#FFD700] transition-colors">
                  Packages
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#FFD700] transition-colors">
                  Add-On Modules
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="lg:col-span-2 space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-1.5 text-[11px] text-gray-300">
              <li>
                <a href="#how-it-works" className="hover:text-[#FFD700] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FFD700] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FFD700] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Get in Touch */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-white">
              Get in Touch
            </h4>
            <ul className="space-y-2 text-[11px] text-gray-300">
              <li>
                <a
                  href="mailto:sales@alligaming.com"
                  className="flex items-center gap-2 group hover:text-[#FFD700] transition-colors"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full border border-[#FFD700]/70 text-[#FFD700] group-hover:bg-[#FFD700] group-hover:text-black transition-all shrink-0">
                    <Mail size={10} />
                  </span>
                  <span>sales@alligaming.com</span>
                </a>
              </li>

              <li>
                <a
                  href="tel:+10001234567"
                  className="flex items-center gap-2 group hover:text-[#FFD700] transition-colors"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full border border-[#FFD700]/70 text-[#FFD700] group-hover:bg-[#FFD700] group-hover:text-black transition-all shrink-0">
                    <Phone size={10} />
                  </span>
                  <span>+1 (000) 123-4567</span>
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="flex items-center gap-2 group hover:text-[#FFD700] transition-colors"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full border border-[#FFD700]/70 text-[#FFD700] group-hover:bg-[#FFD700] group-hover:text-black transition-all shrink-0">
                    <Send size={10} />
                  </span>
                  <span>Contact Us / Request a Quote</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-gray-400">
          <p>© 2026 All I Gaming. All Rights Reserved.</p>
          <div
            className="flex items-center"
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
