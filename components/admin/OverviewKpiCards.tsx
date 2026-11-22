import { MessageSquare, Clock, Palette, DollarSign } from "lucide-react";

interface OverviewKpiCardsProps {
  totalInquiries: number;
  newInquiriesCount: number;
  activeReservationsCount: number;
  totalPipelineValue: number;
  activeDesignsCount: number;
  totalDesignsCount: number;
  starterPrice: number;
}

export default function OverviewKpiCards({
  totalInquiries,
  newInquiriesCount,
  activeReservationsCount,
  totalPipelineValue,
  activeDesignsCount,
  totalDesignsCount,
  starterPrice,
}: OverviewKpiCardsProps) {
  const cards = [
    {
      title: "Inquiries Pipeline",
      value: totalInquiries.toString(),
      subtext: `${newInquiriesCount} awaiting review`,
      icon: MessageSquare,
      color: "from-blue-500/20 to-indigo-500/10",
      borderColor: "border-blue-500/40",
      iconColor: "text-blue-400",
      badge: newInquiriesCount > 0 ? `${newInquiriesCount} NEW` : undefined,
      badgeColor: "bg-blue-950 text-blue-300 border-blue-500/40",
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
      title: "Casino Catalog",
      value: `${activeDesignsCount} / ${totalDesignsCount}`,
      subtext: "Active vs total themes",
      icon: Palette,
      color: "from-emerald-500/20 to-teal-500/10",
      borderColor: "border-emerald-500/40",
      iconColor: "text-emerald-400",
      badge: "LIVE",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-500/40",
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
