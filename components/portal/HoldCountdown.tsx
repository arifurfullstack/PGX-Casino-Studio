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
      <span
        className={
          className ||
          "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/75 border border-[#f5c451]/55 text-xs sm:text-sm font-bold text-[#ffe28a] shadow-[0_0_16px_rgba(245,196,81,0.22)] self-start sm:self-auto tabular-nums"
        }
      >
        Calculating...
      </span>
    );
  }

  const diff = new Date(expiresAt).getTime() - now;
  if (diff <= 0) {
    return (
      <span
        className={
          className ||
          "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-xs sm:text-sm font-bold text-rose-200 self-start sm:self-auto"
        }
      >
        Hold Expired
      </span>
    );
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <span
      className={
        className ||
        "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/75 border border-[#f5c451]/65 text-xs sm:text-sm font-bold text-[#ffe28a] shadow-[0_0_18px_rgba(245,196,81,0.3)] self-start sm:self-auto tabular-nums"
      }
    >
      <span className="w-2 h-2 rounded-full bg-[#f5c451] animate-pulse" />
      {hours}h {mins}m remaining
    </span>
  );
}
