import { Settings } from "lucide-react";
import { getIntegrationConfig } from "@/services/integrationService";
import GatewaysAndEmailSettings from "@/components/admin/settings/GatewaysAndEmailSettings";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const config = await getIntegrationConfig();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/40">
        <div>
          <div className="flex items-center gap-2">
            <Settings size={22} className="text-[#FFD700]" />
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Gateways &amp; Email Providers
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Manage live API keys, payment addresses (USDT TRC20/ERC20, BTC, Stripe), and transactional email providers (Resend, Mailgun, SMTP) without editing <code className="text-purple-300">.env</code>.
          </p>
        </div>
      </div>

      <GatewaysAndEmailSettings initialConfig={config} />
    </div>
  );
}
