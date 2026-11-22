import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { User, Building2, Mail, Phone, Lock, ArrowRight, ShieldCheck, Home } from "lucide-react";
import { getCustomerSession } from "@/lib/customerAuth";
import { registerCustomerAction } from "@/app/actions/customerAuthActions";
import PortalBackground from "@/components/portal/PortalBackground";
import PortalAuthMotion from "@/components/portal/PortalAuthMotion";

export default async function CustomerRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getCustomerSession();
  if (session) {
    redirect("/portal");
  }

  const resolvedParams = await searchParams;
  const errorMessage = resolvedParams?.error;

  return (
    <div className="min-h-screen bg-[#07020d] flex items-center justify-center p-5 sm:p-8 relative overflow-hidden">
      <PortalBackground />

      <PortalAuthMotion>
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          {/* Back Link */}
          <div className="mb-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-[#ffe28a] transition-colors"
            >
              <Home size={16} className="text-[#f5c451]" />
              <span>Back to Royal Casino Club</span>
            </Link>
          </div>

          {/* Luxury Register Card */}
          <div className="js-auth-card portal-panel portal-panel-gold p-8 sm:p-10">
            <div className="panel-rim" aria-hidden="true" />

            <div className="text-center mb-8">
              <div className="js-auth-stagger relative w-48 h-24 mx-auto mb-3">
                <Image
                  src="/images/royal-hero/royal-hero-logo-perfect.png"
                  alt="Royal Casino Club"
                  fill
                  className="object-contain drop-shadow-[0_6px_22px_rgba(245,196,81,0.35)]"
                  unoptimized
                />
              </div>
              <div className="js-auth-stagger inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#240942]/85 border border-[#f5c451]/50 text-xs font-bold text-[#ffe28a] uppercase tracking-[0.16em] mb-3">
                <ShieldCheck size={14} className="text-[#f5c451]" />
                <span>Operator Onboarding</span>
              </div>
              <h1 className="js-auth-stagger font-philosopher text-3xl sm:text-4xl font-bold italic text-white leading-tight">
                Create Client <span className="gold-text">Portal Account</span>
              </h1>
              <p className="js-auth-stagger text-sm sm:text-[15px] text-white/70 mt-2">
                Track your casino platform progress, view saved quotes, and manage your 5-day price locks.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-950/75 border border-rose-500/55 text-rose-200 text-sm flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form
              action={async (formData: FormData) => {
                "use server";
                const result = await registerCustomerAction(null, formData);
                if (result?.error) {
                  redirect(`/portal/register?error=${encodeURIComponent(result.error)}`);
                }
              }}
              className="space-y-4"
            >
              <div className="js-auth-stagger grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#ffe28a]/90 uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      name="fullName"
                      type="text"
                      required
                      placeholder="John Doe"
                      className="input !pl-10 !text-sm placeholder-white/40"
                    />
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f5c451]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#ffe28a]/90 uppercase tracking-wider mb-1.5">
                    Company / Brand Name
                  </label>
                  <div className="relative">
                    <input
                      name="companyName"
                      type="text"
                      placeholder="e.g. Royal VIP Gaming Ltd"
                      className="input !pl-10 !text-sm placeholder-white/40"
                    />
                    <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f5c451]" />
                  </div>
                </div>
              </div>

              <div className="js-auth-stagger grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#ffe28a]/90 uppercase tracking-wider mb-1.5">
                    Business Email *
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="input !pl-10 !text-sm placeholder-white/40"
                    />
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f5c451]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#ffe28a]/90 uppercase tracking-wider mb-1.5">
                    WhatsApp / Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      name="phoneNumber"
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      className="input !pl-10 !text-sm placeholder-white/40"
                    />
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f5c451]" />
                  </div>
                </div>
              </div>

              <div className="js-auth-stagger grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#ffe28a]/90 uppercase tracking-wider mb-1.5">
                    Create Password *
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type="password"
                      required
                      minLength={6}
                      placeholder="Min 6 characters"
                      className="input !pl-10 !text-sm placeholder-white/40"
                    />
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f5c451]" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#ffe28a]/90 uppercase tracking-wider mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type="password"
                      required
                      minLength={6}
                      placeholder="Repeat password"
                      className="input !pl-10 !text-sm placeholder-white/40"
                    />
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f5c451]" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="js-auth-stagger w-full mt-3 btn-royal-gold shine py-4 px-5 text-base font-extrabold cursor-pointer"
              >
                <span>Create Client Portal Account</span>
                <ArrowRight size={18} className="stroke-[2.75]" />
              </button>
            </form>

            <div className="js-auth-stagger mt-7 pt-6 border-t border-[#d696ff]/20 text-center">
              <p className="text-sm text-white/65">
                Already have an account?{" "}
                <Link
                  href="/portal/login"
                  className="font-bold text-[#ffe28a] hover:text-white transition-colors"
                >
                  Sign In →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </PortalAuthMotion>
    </div>
  );
}
