import {
  MessageSquare,
  Clock,
  Palette,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  TrendingUp,
} from "lucide-react";

interface OverviewKpiCardsProps {
  totalInquiries: number;
  newInquiriesCount: number;
  activeReservationsCount: number;
  expiringReservationsCount: number;
  completedAgreementsCount: number;
  pendingRefundsCount: number;
  totalPipelineValue: number;
  activeDesignsCount: number;
  totalDesignsCount: number;
  starterPrice: number;
}

export default function OverviewKpiCards({
  totalInquiries,
  newInquiriesCount,
  activeReservationsCount,
  expiringReservationsCount,
  completedAgreementsCount,
  pendingRefundsCount,
  totalPipelineValue,
  activeDesignsCount,
  totalDesignsCount,
  starterPrice,
}: OverviewKpiCardsProps) {
  const cards = [
    {
      title: "New Inquiries",
      value: newInquiriesCount.toString(),
      subtext: `${totalInquiries} total customer submissions`,
      icon: MessageSquare,
      color: "from-blue-500/20 to-indigo-500/10",
      borderColor: "border-blue-500/40",
      iconColor: "text-blue-400",
      badge: newInquiriesCount > 0 ? `${newInquiriesCount} NEW` : "IDLE",
      badgeColor: newInquiriesCount > 0 ? "bg-blue-950 text-blue-300 border-blue-500/40" : "bg-gray-900 text-gray-400 border-gray-700",
    },
    {
      title: "Active 5-Day Holds",
      value: activeReservationsCount.toString(),
      subtext: `$${totalPipelineValue.toLocaleString()} pipeline locked`,
      icon: Clock,
      color: "from-purple-500/20 to-fuchsia-500/10",
      borderColor: "border-purple-500/40",
      iconColor: "text-purple-400",
      badge: "5% LOCKED",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-500/40",
    },
    {
      title: "Expiring Holds (<24h)",
      value: expiringReservationsCount.toString(),
      subtext: expiringReservationsCount > 0 ? "Require urgent sales outreach" : "No urgent expirations",
      icon: AlertTriangle,
      color: expiringReservationsCount > 0 ? "from-amber-500/20 to-red-500/10" : "from-gray-500/10 to-transparent",
      borderColor: expiringReservationsCount > 0 ? "border-amber-500/60" : "border-gray-800",
      iconColor: expiringReservationsCount > 0 ? "text-amber-400" : "text-gray-500",
      badge: expiringReservationsCount > 0 ? "URGENT" : "STABLE",
      badgeColor: expiringReservationsCount > 0 ? "bg-amber-950 text-amber-300 border-amber-500/50 animate-pulse" : "bg-gray-900 text-gray-500 border-gray-800",
    },
    {
      title: "Completed Agreements",
      value: completedAgreementsCount.toString(),
      subtext: "$500 credited to final price",
      icon: CheckCircle2,
      color: "from-emerald-500/20 to-teal-500/10",
      borderColor: "border-emerald-500/40",
      iconColor: "text-emerald-400",
      badge: "CONVERTED",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-500/40",
    },
    {
      title: "Pending Refunds",
      value: pendingRefundsCount.toString(),
      subtext: pendingRefundsCount > 0 ? "Expired holds awaiting return" : "All accounts balanced",
      icon: RotateCcw,
      color: pendingRefundsCount > 0 ? "from-red-500/20 to-rose-500/10" : "from-gray-500/10 to-transparent",
      borderColor: pendingRefundsCount > 0 ? "border-red-500/50" : "border-gray-800",
      iconColor: pendingRefundsCount > 0 ? "text-red-400" : "text-gray-500",
      badge: pendingRefundsCount > 0 ? "ACTION REQ" : "CLEAR",
      badgeColor: pendingRefundsCount > 0 ? "bg-red-950 text-red-300 border-red-500/50" : "bg-gray-900 text-gray-500 border-gray-800",
    },
    {
      title: "Casino Catalog",
      value: `${activeDesignsCount} / ${totalDesignsCount}`,
      subtext: "Active vs total live themes",
      icon: Palette,
      color: "from-violet-500/20 to-purple-500/10",
      borderColor: "border-violet-500/40",
      iconColor: "text-violet-400",
      badge: "CATALOG",
      badgeColor: "bg-violet-950 text-violet-300 border-violet-500/40",
    },
    {
      title: "Starter Package Price",
      value: `$${starterPrice.toLocaleString()}`,
      subtext: "Base turnkey casino setup",
      icon: DollarSign,
      color: "from-amber-500/20 to-yellow-500/10",
      borderColor: "border-amber-500/40",
      iconColor: "text-[#FFD700]",
      badge: "BASE",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-500/40",
    },
    {
      title: "Locked Pipeline",
      value: `$${totalPipelineValue.toLocaleString()}`,
      subtext: "Secured under 5-day contracts",
      icon: TrendingUp,
      color: "from-cyan-500/20 to-blue-500/10",
      borderColor: "border-cyan-500/40",
      iconColor: "text-cyan-400",
      badge: "GROSS",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-500/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`relative p-5 rounded-xl bg-gradient-to-br ${card.color} bg-[#080214] border ${card.borderColor} backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div className="p-2 rounded-lg bg-black/40 border border-white/5">
                <Icon size={18} className={card.iconColor} />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                {card.value}
              </span>
              {card.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${card.badgeColor}`}
                >
                  {card.badge}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-400 mt-2 font-medium">{card.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}
