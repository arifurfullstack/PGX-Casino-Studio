"use client";

import { useSyncExternalStore } from "react";

interface HoldCountdownProps {
  expiresAt: string;
  className?: string;
}

function subscribeToMinutes(callback: () => void) {
  const id = setInterval(callback, 60000);
  return () => clearInterval(id);
}

function getNowSnapshot() {
  return Date.now();
}

function getNowServerSnapshot() {
  return 0;
}

export default function HoldCountdown({ expiresAt, className }: HoldCountdownProps) {
  const now = useSyncExternalStore(subscribeToMinutes, getNowSnapshot, getNowServerSnapshot);

  if (!now) {
    return (
      <span className={className || "px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-[11px] font-bold text-[#FFD700] self-start sm:self-auto"}>
        Calculating...
      </span>
    );
  }

  const diff = new Date(expiresAt).getTime() - now;
  if (diff <= 0) {
    return (
      <span className={className || "px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-[11px] font-bold text-red-300 self-start sm:self-auto"}>
        Hold Expired
      </span>
    );
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <span className={className || "px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-[11px] font-bold text-[#FFD700] self-start sm:self-auto"}>
      {hours}h {mins}m left
    </span>
  );
}
