"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, RefreshCw, ShieldAlert } from "lucide-react";

interface ProtectedDemoCanvasProps {
  designSlug: string;
  pageId: string;
  pageTitle: string;
  showWatermark?: boolean;
  adminDirectUrl?: string;
}

export default function ProtectedDemoCanvas({
  designSlug,
  pageId,
  pageTitle,
  showWatermark = true,
  adminDirectUrl,
}: ProtectedDemoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function renderProtectedImage() {
      setStatus("loading");
      try {
        const fetchUrl = adminDirectUrl
          ? adminDirectUrl
          : `/api/demo-image?slug=${encodeURIComponent(designSlug)}&pageId=${encodeURIComponent(pageId)}`;
        const res = await fetch(fetchUrl, {
          method: "GET",
          credentials: adminDirectUrl ? "omit" : "same-origin",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Image request failed (${res.status})`);
        }

        const blob = await res.blob();
        if (cancelled) return;

        let bitmap: ImageBitmap | null = null;
        let fallbackImg: HTMLImageElement | null = null;
        let tempUrl: string | null = null;

        try {
          if (typeof createImageBitmap === "function") {
            bitmap = await createImageBitmap(blob);
          } else {
            tempUrl = URL.createObjectURL(blob);
            fallbackImg = await new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new window.Image();
              img.onload = () => resolve(img);
              img.onerror = reject;
              img.src = tempUrl!;
            });
          }

          if (cancelled) return;

          const naturalW = bitmap ? bitmap.width : fallbackImg!.naturalWidth;
          const naturalH = bitmap ? bitmap.height : fallbackImg!.naturalHeight;

          // Cap maximum canvas width to 1920px for crisp rendering without excessive GPU memory
          const maxRenderWidth = 1920;
          const scale = naturalW > maxRenderWidth ? maxRenderWidth / naturalW : 1;
          const renderW = Math.max(1, Math.round(naturalW * scale));
          const renderH = Math.max(1, Math.round(naturalH * scale));

          setDimensions({ width: renderW, height: renderH });

          const canvas = canvasRef.current;
          if (!canvas) return;

          canvas.width = renderW;
          canvas.height = renderH;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            throw new Error("Canvas 2D context unavailable");
          }

          ctx.clearRect(0, 0, renderW, renderH);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          if (bitmap) {
            ctx.drawImage(bitmap, 0, 0, renderW, renderH);
          } else if (fallbackImg) {
            ctx.drawImage(fallbackImg, 0, 0, renderW, renderH);
          }

          // Subtle diagonal brand watermark baked into canvas pixels
          if (showWatermark) {
            ctx.save();
            const fontSize = Math.max(16, Math.round(renderW * 0.018));
            ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`;
            ctx.fillStyle = "rgba(255, 255, 255, 0.075)";
            ctx.strokeStyle = "rgba(0, 0, 0, 0.09)";
            ctx.lineWidth = 1;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const label = "ROYAL CASINO CLUB • DEMO PREVIEW";
            const stepX = Math.max(360, Math.round(renderW * 0.42));
            const stepY = Math.max(260, Math.round(renderW * 0.3));

            for (let y = -renderH * 0.1; y < renderH + stepY; y += stepY) {
              for (let x = -renderW * 0.1; x < renderW + stepX; x += stepX) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(-Math.PI / 6);
                ctx.strokeText(label, 0, 0);
                ctx.fillText(label, 0, 0);
                ctx.restore();
              }
            }
            ctx.restore();
          }

          if (!cancelled) {
            setStatus("ready");
          }
        } finally {
          if (bitmap) bitmap.close();
          if (tempUrl) URL.revokeObjectURL(tempUrl);
        }
      } catch (err) {
        if (cancelled || (err instanceof DOMException && err.name === "AbortError")) {
          return;
        }
        console.error("ProtectedDemoCanvas load error:", err);
        setStatus("error");
      }
    }

    renderProtectedImage();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [designSlug, pageId, showWatermark, retryTick, adminDirectUrl]);

  const blockEvent = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className="demo-no-save relative w-full min-h-[360px] bg-[#0b0218] select-none"
      onContextMenu={blockEvent}
      onDragStart={blockEvent}
      onCopy={blockEvent}
      onCut={blockEvent}
      style={{
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitTouchCallout: "none",
      }}
    >
      {/* Loading Overlay */}
      {status === "loading" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-[#090214]/90 backdrop-blur-sm py-20">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#f5c451]/40 bg-[#1a0730]">
            <Loader2 className="h-6 w-6 animate-spin text-[#ffd75e]" />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-[#ffe28a]">
              Loading {pageTitle}
            </p>
            <p className="mt-0.5 text-[11px] text-white/50">
              Rendering protected high-resolution preview...
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="flex flex-col items-center justify-center gap-3 py-24 px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-400/40 bg-red-950/50 text-red-300">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Unable to load page preview</p>
            <p className="mt-1 text-xs text-white/60">
              The protected demo asset for &ldquo;{pageTitle}&rdquo; could not be rendered.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRetryTick((t) => t + 1)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#f5c451]/50 bg-[#1a0730] px-4 py-1.5 text-xs font-semibold text-[#ffe28a] hover:bg-[#2a0c4a] cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Protected Canvas (no direct <img> tag or raw CDN URL in DOM) */}
      <canvas
        ref={canvasRef}
        aria-label={`${pageTitle} protected UI preview`}
        onContextMenu={blockEvent}
        onDragStart={blockEvent}
        className={`block w-full h-auto transition-opacity duration-300 ${
          status === "ready" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          aspectRatio: dimensions ? `${dimensions.width} / ${dimensions.height}` : undefined,
          pointerEvents: "none",
        }}
      />

      {/* Transparent Protective Shield Overlay (blocks right-click/drag while allowing vertical scroll) */}
      <div
        aria-hidden="true"
        onContextMenu={blockEvent}
        onDragStart={blockEvent}
        onMouseDown={(e) => {
          if (e.button === 2) {
            e.preventDefault();
          }
        }}
        className="absolute inset-0 z-10 bg-transparent"
      />
    </div>
  );
}
