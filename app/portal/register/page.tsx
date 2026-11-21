import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { User, Building, Mail, Phone, Lock, ArrowRight, ShieldCheck, Home } from "lucide-react";
import { getCustomerSession } from "@/lib/customerAuth";
import { registerCustomerAction } from "@/app/actions/customerAuthActions";

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
    <div className="min-h-screen bg-[#04010a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-700/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-fuchsia-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Back Link */}
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#FFD700] transition-colors"
          >
            <Home size={14} />
            <span>Back to All I Gaming Storefront</span>
          </Link>
        </div>

        {/* Register Card */}
        <div className="bg-[#0a0316]/90 border border-purple-500/40 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_35px_rgba(168,85,247,0.25)]">
          <div className="text-center mb-6">
            <div className="relative w-44 h-12 mx-auto mb-3">
              <Image
                src="/images/all-i-gaming-logo-official.png"
                alt="All I Gaming Logo"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-[11px] font-bold text-[#FFD700] uppercase tracking-wider mb-2">
              <ShieldCheck size={13} />
              <span>Operator Onboarding</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Create Client Portal Account
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Track your casino platform progress, view saved quotes, and manage your 5-day price locks.
            </p>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Registration Form */}
          <form
            action={async (formData: FormData) => {
              "use server";
              const result = await registerCustomerAction(null, formData);
              if (result?.error) {
                redirect(`/portal/register?error=${encodeURIComponent(result.error)}`);
              }
            }}
            className="space-y-3.5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    name="fullName"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-3 py-2 pl-9 rounded-lg bg-[#04010a] border border-purple-500/40 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#FFD700]"
                  />
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                  Company / Brand Name
                </label>
                <div className="relative">
                  <input
                    name="companyName"
                    type="text"
                    placeholder="e.g. Royal VIP Gaming Ltd"
                    className="w-full px-3 py-2 pl-9 rounded-lg bg-[#04010a] border border-purple-500/40 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#FFD700]"
                  />
                  <Building size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                  Business Email *
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="w-full px-3 py-2 pl-9 rounded-lg bg-[#04010a] border border-purple-500/40 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#FFD700]"
                  />
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <input
                    name="phoneNumber"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 pl-9 rounded-lg bg-[#04010a] border border-purple-500/40 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#FFD700]"
                  />
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type="password"
                    required
                    minLength={6}
                    placeholder="Min 6 characters"
                    className="w-full px-3 py-2 pl-9 rounded-lg bg-[#04010a] border border-purple-500/40 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#FFD700]"
                  />
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 uppercase mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={6}
                    placeholder="Repeat password"
                    className="w-full px-3 py-2 pl-9 rounded-lg bg-[#04010a] border border-purple-500/40 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#FFD700]"
                  />
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-lg font-bold text-xs sm:text-sm text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] shadow-[0_0_20px_rgba(255,215,0,0.35)] hover:shadow-[0_0_28px_rgba(255,215,0,0.6)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Create Client Portal Account</span>
              <ArrowRight size={15} className="stroke-[2.5]" />
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-5 pt-4 border-t border-purple-900/40 text-center">
            <p className="text-xs text-gray-400">
              Already have an account?{" "}
              <Link
                href="/portal/login"
                className="font-bold text-[#FFD700] hover:text-[#FFE57F] transition-colors"
              >
                Sign In →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
