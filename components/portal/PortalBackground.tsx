export default function PortalBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Base Royal Obsidian-Violet Vertical Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #07020d 0%, #100420 35%, #090214 70%, #07020d 100%)",
        }}
      />

      {/* Subtle Static Ambient Radial Accent (no blur filter / no animation) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 0%, rgba(168, 85, 247, 0.11) 0%, transparent 70%), radial-gradient(circle at 90% 15%, rgba(245, 196, 81, 0.06) 0%, transparent 45%)",
        }}
      />
    </div>
  );
}
