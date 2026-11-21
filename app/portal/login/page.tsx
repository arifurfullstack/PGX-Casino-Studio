import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Mail, Lock, ArrowRight, UserCheck, Home } from "lucide-react";
import { getCustomerSession } from "@/lib/customerAuth";
import { loginCustomerAction } from "@/app/actions/customerAuthActions";

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
    <div className="min-h-screen bg-[#04010a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-700/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-fuchsia-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
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

        {/* Login Card */}
        <div className="bg-[#0a0316]/90 border border-purple-500/40 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_35px_rgba(168,85,247,0.25)]">
          <div className="text-center mb-6">
            <div className="relative w-44 h-12 mx-auto mb-4">
              <Image
                src="/images/all-i-gaming-logo-official.png"
                alt="All I Gaming Logo"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-[11px] font-bold text-[#FFD700] uppercase tracking-wider mb-2">
              <UserCheck size={13} />
              <span>B2B Client Portal</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Sign In to Your Account
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Access your saved casino packages, active 5-day holds, and launch roadmap.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form
            action={async (formData: FormData) => {
              "use server";
              const result = await loginCustomerAction(null, formData);
              if (result?.error) {
                redirect(`/portal/login?error=${encodeURIComponent(result.error)}`);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5"
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
                  className="w-full px-4 py-2.5 pl-10 rounded-lg bg-[#04010a] border border-purple-500/40 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFD700]"
                />
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5"
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
                  className="w-full px-4 py-2.5 pl-10 rounded-lg bg-[#04010a] border border-purple-500/40 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFD700]"
                />
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-lg font-bold text-sm text-black bg-gradient-to-b from-[#FFE259] to-[#FFA700] shadow-[0_0_20px_rgba(255,215,0,0.35)] hover:shadow-[0_0_28px_rgba(255,215,0,0.6)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In to Portal</span>
              <ArrowRight size={15} className="stroke-[2.5]" />
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 pt-5 border-t border-purple-900/40 text-center space-y-2">
            <p className="text-xs text-gray-400">
              New operator or prospective casino buyer?
            </p>
            <Link
              href="/portal/register"
              className="inline-block text-xs font-bold text-[#FFD700] hover:text-[#FFE57F] transition-colors"
            >
              Create Client Account →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
