import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Mail, Lock, ArrowRight, Crown, Home } from "lucide-react";
import { getCustomerSession } from "@/lib/customerAuth";
import { loginCustomerAction } from "@/app/actions/customerAuthActions";
import PortalBackground from "@/components/portal/PortalBackground";
import PortalAuthMotion from "@/components/portal/PortalAuthMotion";

export default async function CustomerLoginPage({
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
        <div className="relative z-10 w-full max-w-lg mx-auto">
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

          {/* Luxury Login Card */}
          <div className="js-auth-card portal-panel portal-panel-gold p-8 sm:p-10">
            <div className="panel-rim" aria-hidden="true" />

            <div className="text-center mb-8">
              <div className="js-auth-stagger relative w-48 h-24 mx-auto mb-4">
                <Image
                  src="/images/royal-hero/royal-hero-logo-perfect.png"
                  alt="Royal Casino Club"
                  fill
                  className="object-contain drop-shadow-[0_6px_22px_rgba(245,196,81,0.35)]"
                  unoptimized
                />
              </div>

              <div className="js-auth-stagger inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#240942]/85 border border-[#f5c451]/50 text-xs font-bold text-[#ffe28a] uppercase tracking-[0.16em] mb-3">
                <Crown size={13} className="text-[#f5c451] fill-[#f5c451]/30" />
                <span>VIP Client Portal</span>
              </div>

              <h1 className="js-auth-stagger font-philosopher text-3xl sm:text-4xl font-bold italic text-white leading-tight">
                Sign In to Your <span className="gold-text">Account</span>
              </h1>
              <p className="js-auth-stagger text-sm sm:text-[15px] text-white/70 mt-2">
                Access your saved casino packages, active 5-day price locks, and launch roadmap.
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
                const result = await loginCustomerAction(null, formData);
                if (result?.error) {
                  redirect(`/portal/login?error=${encodeURIComponent(result.error)}`);
                }
              }}
              className="space-y-5"
            >
              <div className="js-auth-stagger">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-[#ffe28a]/90 uppercase tracking-[0.14em] mb-2"
                >
                  Business Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="operator@company.com"
                    className="input !pl-11 !text-[15px] placeholder-white/40"
                  />
                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f5c451] pointer-events-none"
                  />
                </div>
              </div>

              <div className="js-auth-stagger">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-[#ffe28a]/90 uppercase tracking-[0.14em] mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••••••"
                    className="input !pl-11 !text-[15px] placeholder-white/40"
                  />
                  <Lock
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f5c451] pointer-events-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="js-auth-stagger w-full mt-2 btn-royal-gold shine py-4 px-5 text-base font-extrabold cursor-pointer"
              >
                <span>Sign In to Portal</span>
                <ArrowRight size={18} className="stroke-[2.75]" />
              </button>
            </form>

            <div className="js-auth-stagger mt-7 pt-6 border-t border-[#d696ff]/20 text-center space-y-2">
              <p className="text-sm text-white/65">
                New operator or prospective casino buyer?
              </p>
              <Link
                href="/portal/register"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#ffe28a] hover:text-white transition-colors"
              >
                <span>Create Client Account</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </PortalAuthMotion>
    </div>
  );
}
