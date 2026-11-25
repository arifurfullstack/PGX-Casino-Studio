import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const OUTPUT_PDF = path.join(ROOT, "Royal-Casino-Club-Proposal.pdf");

function toDataUri(relPath, mime) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    throw new Error(`Missing asset: ${abs}`);
  }
  const buf = fs.readFileSync(abs);
  return `data:${mime};base64,${buf.toString("base64")}`;
}

function findChromeExecutable() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error("Neither Chrome nor Edge executable found for headless PDF generation.");
}

// Local Philosopher display fonts
const fontReg = toDataUri("public/fonts/philosopher-regular.woff2", "font/woff2");
const fontBold = toDataUri("public/fonts/philosopher-bold.woff2", "font/woff2");
const fontBoldItalic = toDataUri("public/fonts/philosopher-bold-italic.woff2", "font/woff2");

// Brand Logo
const logoUri = toDataUri("public/images/royal-hero/royal-hero-logo-perfect.png", "image/png");

// Bespoke AI-generated + Studio Luxury Artworks
const coverBgUri = toDataUri("public/images/proposal/cover-bg.jpg", "image/jpeg");
const multiDeviceUri = toDataUri("public/images/proposal/multidevice-hero.jpg", "image/jpeg");
const sweepstakesHeroUri = toDataUri("public/images/proposal/sweepstakes-hero.jpg", "image/jpeg");
const closingBgUri = toDataUri("public/images/royal-hero/royal-hero-bg.png", "image/png");
const royalStageUri = toDataUri("public/images/royal-prestige-full-stage.png", "image/png");
const heroPackageUri = toDataUri("public/images/hero-package.png", "image/png");

// HD Module Artworks
const modLiveUri = toDataUri("public/images/module-live-dealer.png", "image/png");
const modSportsUri = toDataUri("public/images/module-sportsbook.png", "image/png");
const modPokerUri = toDataUri("public/images/module-poker.png", "image/png");

// 12 Cohesive Luxury Design Cards (460x190 native ratio)
const designs = [
  { name: "Royal Prestige", sub: "High-roller European luxury", img: toDataUri("public/images/card-royal-prestige-art.png", "image/png") },
  { name: "Neon Vegas", sub: "Electric Las Vegas strip", img: toDataUri("public/images/card-neon-vegas-art.png", "image/png") },
  { name: "Emerald Club", sub: "VIP green velvet aesthetic", img: toDataUri("public/images/card-emerald-club-art.png", "image/png") },
  { name: "Elite Casino", sub: "High-converting dark UI", img: toDataUri("public/images/card-elite-casino-art.png", "image/png") },
  { name: "Diamond Palace", sub: "Crystal-themed luxury", img: toDataUri("public/images/card-diamond-palace-art.png", "image/png") },
  { name: "Cosmic Casino", sub: "Futuristic galaxy visuals", img: toDataUri("public/images/card-cosmic-casino-art.png", "image/png") },
  { name: "Golden Crown", sub: "Traditional gold & velvet", img: toDataUri("public/images/card-golden-crown-art.png", "image/png") },
  { name: "Lucky Spin", sub: "Vibrant casual gaming", img: toDataUri("public/images/card-lucky-spin-art.png", "image/png") },
  { name: "Prestige Gold", sub: "Sleek gold metallic finish", img: toDataUri("public/images/card-prestige-gold-art.png", "image/png") },
  { name: "Ruby Casino", sub: "Crimson & ruby VIP glow", img: toDataUri("public/images/card-ruby-casino-art.png", "image/png") },
  { name: "Ocean Casino", sub: "Deep oceanic serenity", img: toDataUri("public/images/card-ocean-casino-art.png", "image/png") },
  { name: "Mystic Casino", sub: "Enchanting royal purple aura", img: toDataUri("public/images/card-mystic-casino-art.png", "image/png") },
];

// Crisp Lucide-style inline SVG icons
const icons = {
  zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  crown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>`,
  dices: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect width="12" height="12" x="2" y="10" rx="2" ry="2"/><path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"/><path d="M6 18h.01"/><path d="M10 14h.01"/><path d="M15 6h.01"/><path d="M18 9h.01"/></svg>`,
  smartphone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  headphones: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>`,
  creditCard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,
  coins: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
  layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
  sliders: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  palette: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>`,
  server: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
};

const lightFooter = (label) => `
  <div class="light-footer">
    <div class="lf-brand">
      <div class="lf-logo-pill"><img src="${logoUri}" alt="Royal Casino Club" /></div>
      <span class="lf-sep"></span>
      <a class="lf-url" href="https://royalcasinoclub.com">royalcasinoclub.com</a>
    </div>
    <div class="lf-label">${label}</div>
  </div>
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Royal Casino Club — Executive Turnkey Casino Proposal</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'Philosopher';
      src: url('${fontReg}') format('woff2');
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: 'Philosopher';
      src: url('${fontBold}') format('woff2');
      font-weight: 700;
      font-style: normal;
    }
    @font-face {
      font-family: 'Philosopher';
      src: url('${fontBoldItalic}') format('woff2');
      font-weight: 700;
      font-style: italic;
    }

    @page {
      size: A4;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Cabin', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #090418;
      color: #181826;
      line-height: 1.5;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .font-display {
      font-family: 'Philosopher', Georgia, serif;
    }

    /* ========= BASE PAGE FRAME ========= */
    .page {
      position: relative;
      width: 210mm;
      height: 297mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
    }
    .page:last-child {
      page-break-after: auto;
    }

    /* ========= DARK LUXURY COVER / CLOSING ========= */
    .page-dark {
      background: #090418;
      color: #FFFFFF;
      padding: 16mm 16mm 14mm 16mm;
    }
    .dark-bg-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }
    .cover-scrim {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 78% 24%, rgba(45, 27, 105, 0.48) 0%, rgba(26, 14, 61, 0.25) 42%, transparent 70%),
        radial-gradient(circle at 18% 82%, rgba(255, 215, 0, 0.09) 0%, transparent 48%),
        linear-gradient(115deg, rgba(5, 5, 16, 0.96) 0%, rgba(15, 10, 40, 0.84) 52%, rgba(26, 14, 61, 0.42) 100%),
        linear-gradient(180deg, rgba(5, 5, 16, 0.58) 0%, rgba(15, 10, 40, 0.22) 45%, rgba(5, 5, 16, 0.96) 100%);
      z-index: 1;
    }
    .cover-bg-tint {
      filter: saturate(1.06) contrast(1.08);
      opacity: 0.78;
    }
    .closing-scrim {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 80% 25%, rgba(139, 92, 246, 0.22) 0%, transparent 55%),
        linear-gradient(180deg, rgba(9, 4, 24, 0.88) 0%, rgba(11, 5, 28, 0.78) 50%, rgba(7, 2, 16, 0.96) 100%);
      z-index: 1;
    }
    .z-front {
      position: relative;
      z-index: 2;
    }

    .gold-foil {
      background: linear-gradient(180deg, #FFF5C2 0%, #FFD700 42%, #E5A910 78%, #B8860B 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ========= LIGHT EDITORIAL INTERIOR PAGES ========= */
    .page-light {
      background: #FAF9F6;
      color: #181826;
      padding: 13.5mm 15mm 10.5mm 15mm;
    }
    .page-light::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3.5mm;
      background: linear-gradient(90deg, #1A0E3D 0%, #4C249F 48%, #D4A017 78%, #FFD700 100%);
      z-index: 5;
    }

    .sec-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 6px;
    }
    .sec-kicker {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 11px;
      border-radius: 999px;
      background: #EFE9FA;
      border: 1px solid #D8C9F4;
      color: #3B1E8A;
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 0.13em;
      text-transform: uppercase;
    }
    .sec-kicker-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #C9930F;
    }
    .sec-num {
      font-family: 'Philosopher', Georgia, serif;
      font-size: 46px;
      font-weight: 700;
      line-height: 0.88;
      color: #E7E1F4;
      letter-spacing: -0.02em;
    }
    .sec-title {
      font-family: 'Philosopher', Georgia, serif;
      font-size: 27px;
      font-weight: 700;
      line-height: 1.14;
      color: #160B35;
      margin-top: 7px;
    }
    .sec-title .accent-purple { color: #4C249F; }
    .sec-title .accent-gold { color: #B47E0A; }
    .sec-lead {
      font-size: 11.6px;
      color: #475569;
      line-height: 1.54;
      margin-top: 5px;
      max-width: 172mm;
    }

    /* Balanced body flow — consistent gaps, no awkward floating voids */
    .page-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 13px;
      margin-top: 12px;
      margin-bottom: 10px;
    }
    .push-bottom {
      margin-top: auto;
    }

    /* ========= CARDS & SURFACES ========= */
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10.5px; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 9.5px; }

    .surface-white {
      background: #FFFFFF;
      border: 1px solid #E5DFEF;
      border-radius: 11px;
      padding: 14px 16px;
      box-shadow: 0 3px 12px rgba(22, 11, 53, 0.04);
    }
    .surface-champagne {
      background: linear-gradient(160deg, #FFFDF7 0%, #FBF5E4 100%);
      border: 1px solid #E8D296;
      border-radius: 11px;
      padding: 14px 16px;
    }
    .surface-lavender {
      background: linear-gradient(160deg, #F8F5FE 0%, #EFE9FA 100%);
      border: 1px solid #D9CCF2;
      border-radius: 11px;
      padding: 14px 16px;
    }
    .surface-royal {
      background: linear-gradient(145deg, #1E1047 0%, #12082E 60%, #241354 100%);
      border: 1px solid rgba(255, 215, 0, 0.38);
      border-radius: 12px;
      padding: 15px 18px;
      color: #FFFFFF;
      box-shadow: 0 8px 22px rgba(20, 10, 48, 0.16);
    }

    .icon-box {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      background: linear-gradient(135deg, #2D1B69 0%, #4C249F 100%);
      color: #FFD700;
    }
    .icon-box svg { width: 16px; height: 16px; }
    .icon-box.gold {
      background: linear-gradient(135deg, #D4A017 0%, #A87608 100%);
      color: #FFFFFF;
    }

    .card-top {
      display: flex;
      align-items: center;
      gap: 9px;
      margin-bottom: 10px;
    }
    .card-title {
      font-size: 13.4px;
      font-weight: 700;
      color: #160B35;
      line-height: 1.25;
    }
    .surface-royal .card-title { color: #FFFFFF; }

    ul.clean-list { list-style: none; padding: 0; }
    ul.clean-list li {
      position: relative;
      padding-left: 15px;
      font-size: 11px;
      color: #334155;
      margin-bottom: 6px;
      line-height: 1.48;
    }
    ul.clean-list li:last-child { margin-bottom: 0; }
    ul.clean-list li::before {
      content: "";
      position: absolute;
      left: 0;
      top: 6px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: linear-gradient(135deg, #D4A017, #4C249F);
    }
    .surface-royal ul.clean-list li { color: #E2E8F0; }
    .surface-royal ul.clean-list li::before { background: #FFD700; }

    .kpi-light {
      background: #FFFFFF;
      border: 1px solid #E5DFEF;
      border-top: 3px solid #D4A017;
      border-radius: 10px;
      padding: 12px 13px;
      box-shadow: 0 3px 10px rgba(22, 11, 53, 0.04);
    }
    .kpi-light-val {
      font-family: 'Philosopher', Georgia, serif;
      font-size: 24px;
      font-weight: 700;
      color: #2D1B69;
      line-height: 1.05;
    }
    .kpi-light-lbl {
      font-size: 10.2px;
      color: #475569;
      margin-top: 5px;
      line-height: 1.38;
    }

    table.ed-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.7px;
    }
    table.ed-table th {
      text-align: left;
      padding: 8.5px 11px;
      background: #1E1047;
      color: #FFD700;
      font-size: 9.4px;
      font-weight: 700;
      letter-spacing: 0.09em;
      text-transform: uppercase;
    }
    table.ed-table th:first-child { border-top-left-radius: 7px; }
    table.ed-table th:last-child { border-top-right-radius: 7px; }
    table.ed-table td {
      padding: 8.5px 11px;
      border-bottom: 1px solid #E8E3F2;
      color: #334155;
      vertical-align: middle;
      line-height: 1.44;
    }
    table.ed-table tr:nth-child(even) td { background: #F8F6FC; }
    table.ed-table tr:last-child td { border-bottom: none; }
    .td-strong { font-weight: 700; color: #160B35; }
    .td-gold { font-weight: 700; color: #A67205; }

    .chip-light {
      display: inline-block;
      padding: 4.5px 10px;
      border-radius: 6px;
      font-size: 10.2px;
      font-weight: 600;
      background: #FFFFFF;
      border: 1px solid #D9CCF2;
      color: #2D1B69;
      margin: 0 6px 6px 0;
    }

    .light-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 8px;
      border-top: 1px solid #E2DCEB;
      font-size: 9.8px;
      color: #64748B;
    }
    .lf-brand { display: flex; align-items: center; gap: 9px; }
    .lf-logo-pill {
      background: #160B35;
      padding: 3.5px 8px;
      border-radius: 5px;
      display: inline-flex;
      align-items: center;
    }
    .lf-logo-pill img { height: 14px; width: auto; display: block; }
    .lf-sep { width: 1px; height: 12px; background: #CBD5E1; }
    .lf-url { font-weight: 600; color: #3B1E8A; }
    .lf-label { font-weight: 700; color: #1E1047; letter-spacing: 0.03em; }

    /* ========= MODULE VISUAL CARDS (PAGE 4) ========= */
    .mod-card {
      background: #FFFFFF;
      border: 1px solid #E5DFEF;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 14px rgba(22, 11, 53, 0.06);
    }
    .mod-img-wrap {
      position: relative;
      height: 46mm;
      width: 100%;
      overflow: hidden;
      background: #0F0824;
    }
    .mod-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .mod-price-pill {
      position: absolute;
      bottom: 9px;
      right: 10px;
      background: rgba(15, 7, 36, 0.9);
      border: 1px solid rgba(255, 215, 0, 0.75);
      color: #FFD700;
      font-family: 'Philosopher', Georgia, serif;
      font-size: 13.5px;
      font-weight: 700;
      padding: 3.5px 11px;
      border-radius: 999px;
    }
    .mod-body { padding: 12px 14px 13px 14px; flex: 1; }
    .mod-title {
      font-family: 'Philosopher', Georgia, serif;
      font-size: 16.5px;
      font-weight: 700;
      color: #160B35;
      margin-bottom: 7px;
    }

    /* ========= DESIGN GALLERY CARDS (PAGE 5 — EXACT 460x190 RATIO) ========= */
    .theme-card {
      background: #FFFFFF;
      border: 1px solid #E4DDF0;
      border-radius: 9px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(22, 11, 53, 0.05);
    }
    .theme-card img {
      width: 100%;
      aspect-ratio: 460 / 190;
      object-fit: cover;
      display: block;
    }
    .theme-meta {
      padding: 6.5px 9px 7px 9px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .theme-name {
      font-family: 'Philosopher', Georgia, serif;
      font-size: 11.8px;
      font-weight: 700;
      color: #160B35;
    }
    .theme-sub { font-size: 9px; color: #64748B; margin-top: 1px; }
    .theme-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FFD700, #B8860B);
      flex-shrink: 0;
    }

    /* ========= STEPPER & FLOW ========= */
    .flow-row { display: flex; align-items: stretch; gap: 8px; }
    .flow-step {
      flex: 1;
      background: #FFFFFF;
      border: 1px solid #E3DCF0;
      border-top: 3px solid #4C249F;
      border-radius: 10px;
      padding: 12px 13px;
    }
    .flow-arrow {
      display: flex;
      align-items: center;
      color: #C9930F;
      width: 16px;
      flex-shrink: 0;
    }
    .flow-arrow svg { width: 16px; height: 16px; }

    /* ========= COVER / CLOSING SPECIFICS ========= */
    .cover-topbar { display: flex; align-items: center; justify-content: space-between; }
    .cover-brand-group { display: flex; align-items: center; gap: 14px; }
    .cover-brand-group img { height: 50px; width: auto; }
    .cover-vbar { width: 1.5px; height: 28px; background: rgba(255, 215, 0, 0.45); }
    .cover-brand-sub {
      font-size: 10.5px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #E2E8F0;
      font-weight: 600;
    }
    .cover-pill {
      display: inline-block;
      padding: 5px 14px;
      border-radius: 999px;
      background: rgba(255, 215, 0, 0.12);
      border: 1px solid rgba(255, 215, 0, 0.5);
      color: #FFD700;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }
    .cover-h1 {
      font-family: 'Philosopher', Georgia, serif;
      font-size: 46px;
      font-weight: 700;
      line-height: 1.08;
      color: #FFFFFF;
      margin-top: 16px;
    }
    .cover-accent-line {
      width: 92mm;
      height: 2.5px;
      background: linear-gradient(90deg, #FFD700 0%, rgba(255, 215, 0, 0.08) 100%);
      margin: 16px 0 18px 0;
    }
    .cover-desc {
      font-size: 13.5px;
      color: #E2E8F0;
      line-height: 1.65;
      max-width: 135mm;
    }
    .cover-kpi-glass {
      background: rgba(14, 7, 36, 0.8);
      border: 1px solid rgba(255, 215, 0, 0.36);
      border-radius: 11px;
      padding: 15px 13px;
    }
    .cover-kpi-val {
      font-family: 'Philosopher', Georgia, serif;
      font-size: 27px;
      font-weight: 700;
      color: #FFD700;
      line-height: 1.05;
    }
    .cover-kpi-lbl {
      font-size: 10.5px;
      color: #CBD5E1;
      margin-top: 5px;
      line-height: 1.38;
    }
    .dark-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 215, 0, 0.22);
      font-size: 10px;
      color: #94A3B8;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1: LUXURY COVER ==================== -->
  <section class="page page-dark" style="background: #07020d;">
    <img class="dark-bg-img cover-bg-tint" src="${coverBgUri}" alt="" />
    <div class="cover-scrim"></div>

    <div class="z-front cover-topbar">
      <div class="cover-brand-group">
        <img src="${logoUri}" alt="Royal Casino Club" />
        <div class="cover-vbar"></div>
        <div class="cover-brand-sub">Turnkey Online Casino Solutions</div>
      </div>
      <div style="font-size:10px; color:#FFD700; font-weight:700; letter-spacing:0.12em; text-transform:uppercase;">B2B Partner Edition</div>
    </div>

    <div class="z-front" style="margin-top: 14mm;">
      <span class="cover-pill">Executive Product &amp; Commercial Proposal</span>
      <h1 class="cover-h1">
        Launch Your Own<br />
        <span class="gold-foil" style="font-style:italic;">Turnkey Online Casino</span><br />
        Ready to Scale.
      </h1>
      <div class="cover-accent-line"></div>
      <p class="cover-desc">
        A complete white-label casino solution engineered for rapid market launch — starting at
        <strong style="color:#FFD700;">$15,000 USD</strong> with zero license friction. Choose from
        12+ luxury casino themes, launch with proven slots &amp; table games, expand with Live Dealer,
        Sportsbook, Poker &amp; Sweepstakes, and retain <strong style="color:#FFD700;">75% of Net GGR</strong>.
      </p>
    </div>

    <div class="z-front">
      <div class="grid-4" style="margin-bottom: 14px;">
        <div class="cover-kpi-glass">
          <div class="cover-kpi-val">$15,000</div>
          <div class="cover-kpi-lbl">USD Starter Package<br />design, slots, tables &amp; brand</div>
        </div>
        <div class="cover-kpi-glass">
          <div class="cover-kpi-val">12+</div>
          <div class="cover-kpi-lbl">Luxury Casino Themes<br />mobile-first &amp; white-label</div>
        </div>
        <div class="cover-kpi-glass">
          <div class="cover-kpi-val">75%</div>
          <div class="cover-kpi-lbl">Operator GGR Share<br />transparent 75 / 25 split</div>
        </div>
        <div class="cover-kpi-glass">
          <div class="cover-kpi-val">5-Day</div>
          <div class="cover-kpi-lbl">$1,000 Refundable Lock<br />+ 10% instant discount</div>
        </div>
      </div>

      <div class="dark-footer">
        <div>Product Overview &amp; Commercial Proposal &middot; <a href="https://royalcasinoclub.com" style="color:#E2E8F0; font-weight:700;">royalcasinoclub.com</a></div>
        <div style="color:#FFD700; font-weight:600;">Confidential &middot; Prepared for Prospective Partners</div>
      </div>
    </div>
  </section>

  <!-- ==================== PAGE 2: AT A GLANCE ==================== -->
  <section class="page page-light">
    <div>
      <div class="sec-header">
        <div>
          <span class="sec-kicker"><span class="sec-kicker-dot"></span>At a Glance</span>
          <h2 class="sec-title">Everything an Operator Needs, <span class="accent-purple">Ready to Launch</span></h2>
        </div>
        <div class="sec-num">01</div>
      </div>
      <p class="sec-lead">
        Royal Casino Club delivers premium turnkey online casino software so entrepreneurs and gaming operators can launch a customized, high-converting brand quickly — without spending months building infrastructure from scratch.
      </p>
    </div>

    <div class="page-body">
      <div class="grid-4">
        <div class="kpi-light">
          <div class="kpi-light-val">$15K</div>
          <div class="kpi-light-lbl">All-inclusive turnkey Starter Package</div>
        </div>
        <div class="kpi-light">
          <div class="kpi-light-val">4</div>
          <div class="kpi-light-lbl">Modular expansion verticals on demand</div>
        </div>
        <div class="kpi-light">
          <div class="kpi-light-val">120 hrs</div>
          <div class="kpi-light-lbl">Exclusive 5-day price &amp; design lock</div>
        </div>
        <div class="kpi-light">
          <div class="kpi-light-val">24/7</div>
          <div class="kpi-light-lbl">VIP technical &amp; onboarding support</div>
        </div>
      </div>

      <div class="grid-3" style="gap: 11px;">
        <div class="surface-white">
          <div class="card-top">
            <span class="icon-box">${icons.zap}</span>
            <div class="card-title">Fast Setup</div>
          </div>
          <ul class="clean-list">
            <li>Pre-engineered turnkey core built for rapid launch</li>
            <li>Zero-friction path from theme choice to live site</li>
            <li>Dedicated team handles domain, SSL &amp; branding</li>
            <li>Structured milestone updates inside Client Portal</li>
          </ul>
        </div>

        <div class="surface-white">
          <div class="card-top">
            <span class="icon-box">${icons.crown}</span>
            <div class="card-title">100% Your Brand</div>
          </div>
          <ul class="clean-list">
            <li>Full white-label identity: name, logo &amp; color palette</li>
            <li>Launches directly on your custom domain name</li>
            <li>12+ luxury visual storefronts tailored to your market</li>
            <li>Branded transactional receipts &amp; player pages</li>
          </ul>
        </div>

        <div class="surface-white">
          <div class="card-top">
            <span class="icon-box">${icons.dices}</span>
            <div class="card-title">Proven Games</div>
          </div>
          <ul class="clean-list">
            <li>High-performing online casino slots from day one</li>
            <li>Classic tables: Blackjack, Roulette &amp; Baccarat</li>
            <li>Optional Live Dealer, Sportsbook &amp; Poker suites</li>
            <li>Dual-currency Sweepstakes engine available</li>
          </ul>
        </div>

        <div class="surface-white">
          <div class="card-top">
            <span class="icon-box">${icons.smartphone}</span>
            <div class="card-title">Multi-Device UX</div>
          </div>
          <ul class="clean-list">
            <li>Mobile-first responsive design for iOS &amp; Android</li>
            <li>Crisp desktop &amp; tablet lobby navigation</li>
            <li>Conversion-optimized layouts for higher retention</li>
            <li>SEO-ready metadata &amp; social sharing cards</li>
          </ul>
        </div>

        <div class="surface-white">
          <div class="card-top">
            <span class="icon-box">${icons.globe}</span>
            <div class="card-title">Global Payments</div>
          </div>
          <ul class="clean-list">
            <li>Multi-currency readiness across global regions</li>
            <li>PGX Payment Gateway checkout for card &amp; fiat</li>
            <li>Live Bitcoin (BTC) &amp; USDC (ERC-20) settlement</li>
            <li>Automated webhook &amp; TxID verification flows</li>
          </ul>
        </div>

        <div class="surface-white">
          <div class="card-top">
            <span class="icon-box">${icons.headphones}</span>
            <div class="card-title">24/7 VIP Desk</div>
          </div>
          <ul class="clean-list">
            <li>Direct WhatsApp, Telegram &amp; Email specialists</li>
            <li>Continuous platform updates &amp; maintenance</li>
            <li>Dedicated Client Portal for quotes &amp; holds</li>
            <li>100% refundable $1,000 5-day price lock</li>
          </ul>
        </div>
      </div>

      <div class="surface-royal push-bottom">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:16px;">
          <div>
            <div style="font-size:10px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#FFD700;">Built for Rapid Market Entry</div>
            <div class="font-display" style="font-size:19px; font-weight:700; color:#FFFFFF; margin-top:3px;">No Gaming License Required to Get Started</div>
            <p style="font-size:11px; color:#CBD5E1; margin-top:4px; line-height:1.52;">
              Focus on your brand, marketing, and player acquisition while Royal Casino Club delivers the complete software stack, luxury theme customization, game integrations, and 24/7 technical reliability.
            </p>
          </div>
          <div style="text-align:right; flex-shrink:0; padding-left:16px; border-left:1px solid rgba(255,215,0,0.32);">
            <div class="font-display" style="font-size:30px; font-weight:700; color:#FFD700; line-height:1;">75%</div>
            <div style="font-size:9.8px; color:#E2E8F0; margin-top:4px;">Profit Share<br />Is Yours</div>
          </div>
        </div>
      </div>
    </div>

    ${lightFooter("01 · At a Glance")}
  </section>

  <!-- ==================== PAGE 3: STARTER PACKAGE & GGR ==================== -->
  <section class="page page-light">
    <div>
      <div class="sec-header">
        <div>
          <span class="sec-kicker"><span class="sec-kicker-dot"></span>Starter Package &amp; Commercials</span>
          <h2 class="sec-title">Turnkey Foundation — <span class="accent-gold">$15,000 USD</span></h2>
        </div>
        <div class="sec-num">02</div>
      </div>
      <p class="sec-lead">
        Launch with a complete, revenue-ready casino storefront. Every build begins with our transparent $15,000 Starter Package and a clean 75% / 25% Gross Gaming Revenue (GGR) partnership model.
      </p>
    </div>

    <div class="page-body">
      <div class="grid-2" style="align-items: stretch;">
        <div class="surface-champagne" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <div style="font-size:9.5px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#A67205;">All-Inclusive Core</div>
                <div class="font-display" style="font-size:33px; font-weight:700; color:#160B35; line-height:1.08; margin-top:3px;">
                  $15,000 <span style="font-size:13px; color:#64748B; font-weight:400;">USD</span>
                </div>
              </div>
              <img src="${heroPackageUri}" alt="Starter Package" style="width:78px; height:auto; object-fit:contain;" />
            </div>
            <ul class="clean-list" style="margin-top:11px;">
              <li><strong>Your Selected Casino Design:</strong> Full deployment of any luxury theme from our 12+ catalog.</li>
              <li><strong>Online Casino Slots:</strong> Curated, high-engagement slot portfolio ready from launch.</li>
              <li><strong>Casino Game Tables:</strong> Blackjack, Roulette, Baccarat, and player-favorite table classics.</li>
              <li><strong>Full Casino Branding:</strong> Custom logo, color scheme, typography &amp; domain setup.</li>
              <li><strong>Multi-Device Optimization:</strong> Seamless desktop, tablet &amp; mobile player interface.</li>
              <li><strong>Ongoing VIP Support:</strong> Dedicated technical assistance &amp; platform updates.</li>
            </ul>
          </div>
          <div style="margin-top:11px; padding-top:9px; border-top:1px solid #E8D296; font-size:10.2px; color:#785305; font-weight:600;">
            Optional expansions (Live Dealer, Sportsbook, Poker, Sweepstakes) can be added anytime.
          </div>
        </div>

        <div class="surface-royal" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="font-size:9.5px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#FFD700;">Commercial Partnership</div>
            <div class="font-display" style="font-size:26px; font-weight:700; color:#FFFFFF; margin-top:4px;">Transparent 75 / 25 GGR Split</div>
            <p style="font-size:11px; color:#CBD5E1; margin-top:6px; line-height:1.52;">
              We grow only when your casino succeeds. Zero surprise platform markups — you keep three-quarters of Gross Gaming Revenue.
            </p>

            <div style="margin-top:14px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,215,0,0.35); border-radius:9px; padding:12px 14px;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px;">
                <span style="font-size:11.5px; font-weight:600; color:#FFFFFF;">Your Operator Profit Share</span>
                <span class="font-display" style="font-size:24px; font-weight:700; color:#FFD700;">75%</span>
              </div>
              <div style="height:9px; border-radius:999px; background:rgba(255,255,255,0.12); overflow:hidden;">
                <div style="width:75%; height:100%; background:linear-gradient(90deg, #FFD700, #F59E0B);"></div>
              </div>
            </div>

            <div style="margin-top:10px; background:rgba(255,255,255,0.05); border:1px solid rgba(168,85,247,0.35); border-radius:9px; padding:12px 14px;">
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px;">
                <span style="font-size:11.5px; font-weight:600; color:#E2E8F0;">Platform &amp; Infrastructure Share</span>
                <span class="font-display" style="font-size:24px; font-weight:700; color:#C4B5FD;">25%</span>
              </div>
              <div style="height:9px; border-radius:999px; background:rgba(255,255,255,0.12); overflow:hidden;">
                <div style="width:25%; height:100%; background:linear-gradient(90deg, #8B5CF6, #A855F7);"></div>
              </div>
            </div>
          </div>

          <div style="margin-top:12px; padding-top:9px; border-top:1px solid rgba(255,215,0,0.22); font-size:10.3px; color:#FDE68A;">
            Includes ongoing platform hosting stability, game maintenance &amp; 24/7 operator desk.
          </div>
        </div>
      </div>

      <div class="surface-white" style="padding: 14px 15px;">
        <div class="card-top" style="margin-bottom:9px;">
          <span class="icon-box gold">${icons.sliders}</span>
          <div class="card-title">Transparent Package Pricing &amp; 10% Reservation Discount Comparison</div>
        </div>
        <table class="ed-table">
          <thead>
            <tr>
              <th>Package Build</th>
              <th>Included Verticals &amp; Scope</th>
              <th>Standard Price</th>
              <th>With 10% Hold Discount</th>
              <th>You Save</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td-strong">Starter Launch</td>
              <td>Selected Design + Online Slots + Table Games + Branding</td>
              <td>$15,000</td>
              <td class="td-gold">$13,500 USD</td>
              <td style="color:#059669; font-weight:700;">$1,500</td>
            </tr>
            <tr>
              <td class="td-strong">Starter + Live Dealer</td>
              <td>Starter Package + HD Real-Time Live Dealer Tables</td>
              <td>$25,000</td>
              <td class="td-gold">$22,500 USD</td>
              <td style="color:#059669; font-weight:700;">$2,500</td>
            </tr>
            <tr>
              <td class="td-strong">Starter + Sportsbook</td>
              <td>Starter Package + Global Pre-Match &amp; Live Sportsbook</td>
              <td>$25,000</td>
              <td class="td-gold">$22,500 USD</td>
              <td style="color:#059669; font-weight:700;">$2,500</td>
            </tr>
            <tr>
              <td class="td-strong">Starter + Poker</td>
              <td>Starter Package + Texas Hold'em &amp; Omaha Poker Suite</td>
              <td>$35,000</td>
              <td class="td-gold">$31,500 USD</td>
              <td style="color:#059669; font-weight:700;">$3,500</td>
            </tr>
            <tr>
              <td class="td-strong">Full Enterprise Suite</td>
              <td>Starter + Live Dealer + Sportsbook + Poker + Sweepstakes</td>
              <td>$80,000</td>
              <td class="td-gold">$72,000 USD</td>
              <td style="color:#059669; font-weight:700;">$8,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="surface-lavender push-bottom" style="padding: 11px 15px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
          <div style="font-size:10.6px; color:#334155;">
            <strong style="color:#160B35;">Zero Hidden Setup Charges:</strong> Every reservation deposit ($1,000 USD) is credited 100% toward your selected build invoice or refunded in full if no agreement closes within 5 days.
          </div>
          <span style="background:#2D1B69; color:#FFD700; font-size:9.5px; font-weight:700; padding:5px 11px; border-radius:6px; white-space:nowrap;">Lock 10% Off</span>
        </div>
      </div>
    </div>

    ${lightFooter("02 · Starter Package & Commercial Model")}
  </section>

  <!-- ==================== PAGE 4: MODULAR ADD-ON ECOSYSTEM ==================== -->
  <section class="page page-light">
    <div>
      <div class="sec-header">
        <div>
          <span class="sec-kicker"><span class="sec-kicker-dot"></span>Modular Expansion</span>
          <h2 class="sec-title">Four High-Revenue <span class="accent-purple">Add-On Modules</span></h2>
        </div>
        <div class="sec-num">03</div>
      </div>
      <p class="sec-lead">
        Customize your casino to match your target market. Activate any combination of our four turnkey expansion verticals at launch — or switch them on later as your player base grows.
      </p>
    </div>

    <div class="page-body">
      <div class="grid-2" style="gap:12px;">
        <div class="mod-card">
          <div class="mod-img-wrap">
            <img src="${modLiveUri}" alt="Live Dealer Tables" />
            <span class="mod-price-pill">+$10,000 USD</span>
          </div>
          <div class="mod-body">
            <div class="mod-title">Live Dealer Tables</div>
            <ul class="clean-list">
              <li>Real-time HD streaming studio dealer tables with ultra-low latency</li>
              <li>Multi-seat VIP lobbies for Roulette, Blackjack &amp; Baccarat</li>
              <li>Authentic brick-and-mortar atmosphere built for high-value players</li>
              <li>Seamless wallet sync directly inside your main casino navigation</li>
            </ul>
          </div>
        </div>

        <div class="mod-card">
          <div class="mod-img-wrap">
            <img src="${modSportsUri}" alt="Sportsbook Platform" />
            <span class="mod-price-pill">+$10,000 USD</span>
          </div>
          <div class="mod-body">
            <div class="mod-title">Sportsbook Platform</div>
            <ul class="clean-list">
              <li>Global pre-match &amp; live in-play betting across top leagues</li>
              <li>Real-time odds feeds covering football, basketball, tennis &amp; esports</li>
              <li>Boosts year-round traffic and cross-sells sports fans into slots</li>
              <li>Unified single-account balance across sportsbook &amp; casino</li>
            </ul>
          </div>
        </div>

        <div class="mod-card">
          <div class="mod-img-wrap">
            <img src="${modPokerUri}" alt="Poker Platform" />
            <span class="mod-price-pill">+$20,000 USD</span>
          </div>
          <div class="mod-body">
            <div class="mod-title">Poker Platform</div>
            <ul class="clean-list">
              <li>Multiplayer Texas Hold'em &amp; Omaha real-money cash tables</li>
              <li>Scheduled multi-table tournaments, Sit &amp; Go &amp; rake configuration</li>
              <li>Dedicated branded poker lobby engineered for community retention</li>
              <li>Works smoothly across desktop &amp; mobile browsers</li>
            </ul>
          </div>
        </div>

        <div class="mod-card">
          <div class="mod-img-wrap">
            <img src="${sweepstakesHeroUri}" alt="Sweepstakes Engine" />
            <span class="mod-price-pill">+$25,000 USD</span>
          </div>
          <div class="mod-body">
            <div class="mod-title">Sweepstakes Engine</div>
            <ul class="clean-list">
              <li>Dual-currency social gaming compliant sweepstakes architecture</li>
              <li>Gold Coins &amp; Sweeps Coins balances, promos &amp; redemption flow</li>
              <li>Designed for rapid growth in social-casino &amp; promotional markets</li>
              <li>Fully branded under your casino storefront &amp; domain</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="surface-royal push-bottom" style="padding: 13px 16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:14px;">
          <div>
            <div style="font-size:12px; font-weight:700; color:#FFD700;">Unified Single-Wallet Experience</div>
            <p style="font-size:10.6px; color:#E2E8F0; margin-top:3px; line-height:1.48;">
              Every add-on plugs directly into your Starter Package under one unified domain and player account. Configure your exact module mix with instant live pricing at <a href="https://royalcasinoclub.com/select-design" style="color:#FFFFFF; font-weight:700; text-decoration:underline;">royalcasinoclub.com/select-design</a>.
            </p>
          </div>
        </div>
      </div>
    </div>

    ${lightFooter("03 · Modular Add-On Ecosystem")}
  </section>

  <!-- ==================== PAGE 5: 12+ LUXURY DESIGNS ==================== -->
  <section class="page page-light">
    <div>
      <div class="sec-header">
        <div>
          <span class="sec-kicker"><span class="sec-kicker-dot"></span>Luxury Design Catalog</span>
          <h2 class="sec-title">12+ Bespoke <span class="accent-gold">Casino Storefronts</span></h2>
        </div>
        <div class="sec-num">04</div>
      </div>
      <p class="sec-lead">
        Stand out from generic templates. Every storefront below is displayed in full native proportion and is ready for immediate white-label branding with your custom logo, color palette, and domain.
      </p>
    </div>

    <div class="page-body">
      <div class="grid-3" style="gap: 10px;">
        ${designs.map((d) => `
          <div class="theme-card">
            <img src="${d.img}" alt="${d.name}" />
            <div class="theme-meta">
              <div>
                <div class="theme-name">${d.name}</div>
                <div class="theme-sub">${d.sub}</div>
              </div>
              <span class="theme-dot"></span>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="grid-3" style="gap: 10px;">
        <div class="surface-white" style="padding: 10px 13px;">
          <div style="font-size:11px; font-weight:700; color:#160B35;">Custom Logo &amp; Identity</div>
          <div style="font-size:9.8px; color:#475569; margin-top:2px;">Your emblem integrated across header, hero, favicons &amp; receipts.</div>
        </div>
        <div class="surface-white" style="padding: 10px 13px;">
          <div style="font-size:11px; font-weight:700; color:#160B35;">Tailored Color Palette</div>
          <div style="font-size:9.8px; color:#475569; margin-top:2px;">Accent colors &amp; visual glows tuned to your brand guidelines.</div>
        </div>
        <div class="surface-white" style="padding: 10px 13px;">
          <div style="font-size:11px; font-weight:700; color:#160B35;">Domain &amp; Mobile Launch</div>
          <div style="font-size:9.8px; color:#475569; margin-top:2px;">Live on your custom domain with mobile-first responsive UX.</div>
        </div>
      </div>

      <div class="surface-champagne push-bottom" style="padding: 12px 15px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
          <div>
            <div style="font-size:11.8px; font-weight:700; color:#160B35;">Plus: Interactive 5-Page <span style="color:#A67205;">Imperial Crown</span> Live UI Showcase</div>
            <div style="font-size:10.3px; color:#475569; margin-top:2px;">
              Explore full multi-page UI walkthroughs (Homepage, Services, Pricing, About, Contact) inside our protected demo viewer at <a href="https://royalcasinoclub.com/designs" style="color:#2D1B69; font-weight:700; text-decoration:underline;">royalcasinoclub.com/designs</a>.
            </div>
          </div>
          <a href="https://royalcasinoclub.com/designs" style="background:#1E1047; color:#FFD700; font-size:9.8px; font-weight:700; padding:6px 12px; border-radius:6px; white-space:nowrap;">Explore Demos &rarr;</a>
        </div>
      </div>
    </div>

    ${lightFooter("04 · Luxury Casino Design Catalog")}
  </section>

  <!-- ==================== PAGE 6: MULTI-DEVICE & BRANDING ==================== -->
  <section class="page page-light">
    <div>
      <div class="sec-header">
        <div>
          <span class="sec-kicker"><span class="sec-kicker-dot"></span>Player Experience &amp; Branding</span>
          <h2 class="sec-title">A Fast, Branded Site <span class="accent-purple">Players Return To</span></h2>
        </div>
        <div class="sec-num">05</div>
      </div>
      <p class="sec-lead">
        Modern players expect instant load times, luxury aesthetics, and effortless mobile play. Our storefronts combine desktop grandeur with thumb-friendly mobile navigation tailored 100% to your brand identity.
      </p>
    </div>

    <div class="page-body">
      <div class="grid-2" style="gap: 12px;">
        <div style="border-radius:12px; overflow:hidden; border:1px solid #DDD1F5; background:#090418; box-shadow:0 6px 18px rgba(22,11,53,0.1);">
          <img src="${multiDeviceUri}" alt="Multi-device casino showcase" style="width:100%; height:64mm; object-fit:cover; display:block;" />
          <div style="padding:10px 13px; background:#160B35; color:#FFFFFF; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11px; font-weight:700; color:#FFD700;">Desktop, Tablet &amp; Mobile Sync</span>
            <span style="font-size:9.8px; color:#CBD5E1;">Responsive First</span>
          </div>
        </div>

        <div style="border-radius:12px; overflow:hidden; border:1px solid #DDD1F5; background:#090418; box-shadow:0 6px 18px rgba(22,11,53,0.1);">
          <img src="${royalStageUri}" alt="Royal Prestige Live Lobby" style="width:100%; height:64mm; object-fit:cover; display:block;" />
          <div style="padding:10px 13px; background:#160B35; color:#FFFFFF; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:11px; font-weight:700; color:#FFD700;">High-Converting Lobby UI</span>
            <span style="font-size:9.8px; color:#CBD5E1;">Slots, Live &amp; Sports</span>
          </div>
        </div>
      </div>

      <div class="grid-4">
        <div class="kpi-light" style="padding:10px 11px;">
          <div class="kpi-light-val" style="font-size:20px;">100%</div>
          <div class="kpi-light-lbl">White-label brand ownership</div>
        </div>
        <div class="kpi-light" style="padding:10px 11px;">
          <div class="kpi-light-val" style="font-size:20px;">Mobile</div>
          <div class="kpi-light-lbl">Thumb-optimized iOS &amp; Android UI</div>
        </div>
        <div class="kpi-light" style="padding:10px 11px;">
          <div class="kpi-light-val" style="font-size:20px;">HTTPS</div>
          <div class="kpi-light-lbl">Custom domain &amp; SSL included</div>
        </div>
        <div class="kpi-light" style="padding:10px 11px;">
          <div class="kpi-light-val" style="font-size:20px;">5-Page</div>
          <div class="kpi-light-lbl">Interactive demo viewer built in</div>
        </div>
      </div>

      <div class="grid-2" style="gap: 12px;">
        <div class="surface-white">
          <div class="card-top">
            <span class="icon-box">${icons.palette}</span>
            <div class="card-title">Complete Brand Tailoring</div>
          </div>
          <ul class="clean-list">
            <li><strong>Custom Identity:</strong> Your casino logo across navigation, hero stages, footers &amp; icons.</li>
            <li><strong>Color &amp; Typography:</strong> Luxury palette matching your brand guidelines &amp; market vibe.</li>
            <li><strong>Domain &amp; SSL Setup:</strong> Live deployment on your own domain with full HTTPS security.</li>
            <li><strong>Custom Copy &amp; Legal Pages:</strong> Branded About, FAQ, Contact &amp; compliance footers.</li>
          </ul>
        </div>

        <div class="surface-white">
          <div class="card-top">
            <span class="icon-box gold">${icons.sparkles}</span>
            <div class="card-title">Conversion-Engineered UX</div>
          </div>
          <ul class="clean-list">
            <li><strong>Smart Categorized Lobby:</strong> Instant filtering across Slots, Table Games, Live &amp; Sports.</li>
            <li><strong>High-Impact Visual Hierarchy:</strong> Proven dark-luxury contrast that maximizes retention.</li>
            <li><strong>Protected Demo Preview:</strong> Inspect multi-page layouts inside our secure canvas first.</li>
            <li><strong>SEO &amp; Social Ready:</strong> Structured metadata, web manifest &amp; rich OpenGraph previews.</li>
          </ul>
        </div>
      </div>

      <div class="surface-lavender push-bottom">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:14px;">
          <div>
            <div style="font-size:12px; font-weight:700; color:#1E1047;">Want a Live Walkthrough of Any Theme?</div>
            <p style="font-size:10.6px; color:#475569; margin-top:3px;">
              Tap <strong>"View Demo"</strong> on any storefront at <a href="https://royalcasinoclub.com/designs" style="color:#3B1E8A; font-weight:700; text-decoration:underline;">royalcasinoclub.com/designs</a> or message our VIP desk on WhatsApp (<a href="https://wa.me/14164770191" style="color:#1E1047; font-weight:700;">+1 (416) 477-0191</a>) for an instant guided preview.
            </p>
          </div>
        </div>
      </div>
    </div>

    ${lightFooter("05 · Player Experience & White-Label Branding")}
  </section>

  <!-- ==================== PAGE 7: PAYMENTS, CRYPTO & SECURITY ==================== -->
  <section class="page page-light">
    <div>
      <div class="sec-header">
        <div>
          <span class="sec-kicker"><span class="sec-kicker-dot"></span>Payments, Crypto &amp; Infrastructure</span>
          <h2 class="sec-title">Modern Fiat &amp; <span class="accent-gold">Crypto Payment Rails</span></h2>
        </div>
        <div class="sec-num">06</div>
      </div>
      <p class="sec-lead">
        Built for global commerce from day one. Seamlessly handle traditional card/fiat checkouts alongside live Bitcoin and USDC transfers — secured by automated webhooks, encrypted sessions, and cloud-grade hosting.
      </p>
    </div>

    <div class="page-body">
      <div class="grid-4">
        <div class="kpi-light">
          <div class="kpi-light-val" style="font-size:21px;">PGX</div>
          <div class="kpi-light-lbl">Hosted fiat &amp; card gateway checkout</div>
        </div>
        <div class="kpi-light">
          <div class="kpi-light-val" style="font-size:21px;">BTC &amp; USDC</div>
          <div class="kpi-light-lbl">Live crypto settlement &amp; TxID proof</div>
        </div>
        <div class="kpi-light">
          <div class="kpi-light-val" style="font-size:21px;">Webhooks</div>
          <div class="kpi-light-lbl">Real-time payment &amp; lock verification</div>
        </div>
        <div class="kpi-light">
          <div class="kpi-light-val" style="font-size:21px;">Docker</div>
          <div class="kpi-light-lbl">Next.js 16 + MongoDB production stack</div>
        </div>
      </div>

      <div class="grid-2" style="gap: 12px;">
        <div class="surface-royal">
          <div class="card-top">
            <span class="icon-box gold">${icons.creditCard}</span>
            <div class="card-title">PGX Payment Gateway</div>
          </div>
          <ul class="clean-list">
            <li><strong>Hosted Checkout Flow:</strong> Fast, friction-free payment sessions for global fiat &amp; card deposits.</li>
            <li><strong>Automated Webhooks:</strong> Real-time server-to-server verification updates reservation &amp; order statuses automatically.</li>
            <li><strong>Instant Receipts:</strong> Generates branded confirmation records and transactional email receipts.</li>
            <li><strong>Admin Configurable:</strong> Toggle live/test modes and manage gateway keys securely from the back office.</li>
          </ul>
        </div>

        <div class="surface-champagne">
          <div class="card-top">
            <span class="icon-box">${icons.coins}</span>
            <div class="card-title">Live Crypto (BTC &amp; USDC)</div>
          </div>
          <ul class="clean-list">
            <li><strong>Native Digital Assets:</strong> Direct support for <strong>Bitcoin (BTC)</strong> and <strong>USDC (ERC-20)</strong> transfers.</li>
            <li><strong>TxID Verification:</strong> Dedicated deposit flow with wallet address copy &amp; Transaction Hash (TxID) submission.</li>
            <li><strong>Borderless Settlement:</strong> Accept international partner &amp; operator settlements without banking delays.</li>
            <li><strong>Full Audit Trail:</strong> Every submitted hash, network, and payment status is logged in MongoDB.</li>
          </ul>
        </div>
      </div>

      <div class="grid-3" style="gap: 11px;">
        <div class="surface-white">
          <div class="card-top">
            <span class="icon-box">${icons.shield}</span>
            <div class="card-title">Account Security</div>
          </div>
          <ul class="clean-list">
            <li>Encrypted HTTP-only session cookies</li>
            <li>Strict isolation between Client &amp; Admin routes</li>
            <li>Protected server actions &amp; payload checks</li>
            <li>Account status control (Active / Suspended)</li>
          </ul>
        </div>

        <div class="surface-white">
          <div class="card-top">
            <span class="icon-box">${icons.clock}</span>
            <div class="card-title">Smart Automation</div>
          </div>
          <ul class="clean-list">
            <li>Server-side cron monitoring 120-hour locks</li>
            <li>Automated Nodemailer SMTP notifications</li>
            <li>Instant confirmation pages &amp; ref numbers</li>
            <li>Safe expiration &amp; refund state tracking</li>
          </ul>
        </div>

        <div class="surface-white">
          <div class="card-top">
            <span class="icon-box">${icons.server}</span>
            <div class="card-title">Modern Cloud Stack</div>
          </div>
          <ul class="clean-list">
            <li>Next.js 16 (App Router) + React 19 speed</li>
            <li>MongoDB persistence with Mongoose schemas</li>
            <li>Cloudinary CDN for crisp media delivery</li>
            <li>Standalone Docker container deployment</li>
          </ul>
        </div>
      </div>

      <div class="surface-lavender push-bottom" style="padding: 13px 16px;">
        <div style="font-size:11px; font-weight:700; color:#1E1047; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px;">Supported Settlement Methods &amp; Architecture</div>
        <div>
          <span class="chip-light">USD ($)</span>
          <span class="chip-light">Bitcoin (BTC)</span>
          <span class="chip-light">USDC (ERC-20)</span>
          <span class="chip-light">PGX Gateway Checkout</span>
          <span class="chip-light">Webhook Verification</span>
          <span class="chip-light">Multi-Region Ready</span>
          <span class="chip-light">SSL / HTTPS Enforced</span>
          <span class="chip-light">24/7 Cloud Uptime</span>
        </div>
      </div>
    </div>

    ${lightFooter("06 · Payments, Crypto & Infrastructure Security")}
  </section>

  <!-- ==================== PAGE 8: CLIENT PORTAL & ADMIN SUITE ==================== -->
  <section class="page page-light">
    <div>
      <div class="sec-header">
        <div>
          <span class="sec-kicker"><span class="sec-kicker-dot"></span>Platform Operations</span>
          <h2 class="sec-title">Dedicated <span class="accent-purple">Client Portal</span> &amp; Admin Suite</h2>
        </div>
        <div class="sec-num">07</div>
      </div>
      <p class="sec-lead">
        Complete operational visibility from first inquiry to casino launch. Prospective operators track quotes and countdowns in their own portal, while administrators control every design, price, lead, and hold in real time.
      </p>
    </div>

    <div class="page-body">
      <div class="grid-2" style="gap: 12px;">
        <div class="surface-royal">
          <div style="font-size:9.5px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#FFD700; margin-bottom:5px;">For Prospective Operators</div>
          <div class="card-top" style="margin-bottom:10px;">
            <span class="icon-box gold">${icons.layout}</span>
            <div class="card-title" style="font-size:15px;">Client Portal (/portal)</div>
          </div>
          <ul class="clean-list">
            <li><strong>Saved Quotes &amp; Inquiries:</strong> Review every submitted casino configuration, chosen add-ons, and reference ID.</li>
            <li><strong>Live 120-Hour Hold Countdown:</strong> Real-time timer displaying active reservation status, discounted total &amp; remaining balance.</li>
            <li><strong>Project Milestones:</strong> Transparent step-by-step progress tracking from reservation through branding to launch.</li>
            <li><strong>Instant Digital Receipts:</strong> Direct access to submission &amp; reservation payment confirmation views.</li>
            <li><strong>Direct Support Access:</strong> Instant WhatsApp &amp; VIP onboarding links right from your dashboard.</li>
          </ul>
        </div>

        <div class="surface-white">
          <div style="font-size:9.5px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#4C249F; margin-bottom:5px;">For Operations &amp; Sales Team</div>
          <div class="card-top" style="margin-bottom:10px;">
            <span class="icon-box">${icons.sliders}</span>
            <div class="card-title" style="font-size:15px;">Admin Back-Office (/admin)</div>
          </div>
          <ul class="clean-list">
            <li><strong>Live Operations KPIs:</strong> Real-time dashboard of active holds, locked pipeline value, new inquiries &amp; completed deals.</li>
            <li><strong>Customer Inquiries CRM:</strong> Filter leads by status, log internal negotiation notes, chat directly on WhatsApp/Email &amp; export CSV.</li>
            <li><strong>5-Day Reservation Control:</strong> Monitor expiring locks, mark agreements completed ($1,000 credited), or trigger refunds cleanly.</li>
            <li><strong>Customer Dossier:</strong> Unified modal combining each client's full quote history, holds, and account status.</li>
            <li><strong>Role-Protected Controls:</strong> Dedicated admin session authentication &amp; live revalidation.</li>
          </ul>
        </div>
      </div>

      <div class="grid-3" style="gap: 11px;">
        <div class="surface-champagne">
          <div style="font-size:11.8px; font-weight:700; color:#160B35; margin-bottom:5px;">Multi-PNG Design Manager</div>
          <p style="font-size:10.5px; color:#475569; line-height:1.5;">
            Self-serve admin studio to create themes, batch-upload multi-page demo PNGs, drag-and-drop reorder slides, and toggle Active or Hidden visibility.
          </p>
        </div>
        <div class="surface-champagne">
          <div style="font-size:11.8px; font-weight:700; color:#160B35; margin-bottom:5px;">Dynamic Pricing Engine</div>
          <p style="font-size:10.5px; color:#475569; line-height:1.5;">
            Update Starter Package pricing, Add-on module rates, GGR split percentages, reservation fee &amp; discount rules dynamically without code changes.
          </p>
        </div>
        <div class="surface-champagne">
          <div style="font-size:11.8px; font-weight:700; color:#160B35; margin-bottom:5px;">Gateways &amp; Email Config</div>
          <p style="font-size:10.5px; color:#475569; line-height:1.5;">
            Centralized settings panel to manage PGX Gateway credentials, BTC/USDC crypto wallet addresses, and automated SMTP transactional notifications.
          </p>
        </div>
      </div>

      <div class="surface-lavender push-bottom" style="padding: 13px 15px;">
        <div style="font-size:10.8px; font-weight:700; color:#1E1047; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:9px;">End-to-End Deal Flow Architecture</div>
        <div class="flow-row">
          <div class="flow-step" style="padding:9px 11px;">
            <div style="font-size:10px; font-weight:700; color:#4C249F;">1. Select &amp; Quote</div>
            <div style="font-size:9.8px; color:#475569; margin-top:2px;">Design + add-ons logged in CRM</div>
          </div>
          <div class="flow-arrow">${icons.arrowRight}</div>
          <div class="flow-step" style="padding:9px 11px;">
            <div style="font-size:10px; font-weight:700; color:#4C249F;">2. 5-Day Lock</div>
            <div style="font-size:9.8px; color:#475569; margin-top:2px;">$1,000 hold via PGX or Crypto</div>
          </div>
          <div class="flow-arrow">${icons.arrowRight}</div>
          <div class="flow-step" style="padding:9px 11px;">
            <div style="font-size:10px; font-weight:700; color:#4C249F;">3. Admin Sign-Off</div>
            <div style="font-size:9.8px; color:#475569; margin-top:2px;">Agreement &amp; $1,000 credited</div>
          </div>
          <div class="flow-arrow">${icons.arrowRight}</div>
          <div class="flow-step" style="padding:9px 11px;">
            <div style="font-size:10px; font-weight:700; color:#4C249F;">4. Brand &amp; Live</div>
            <div style="font-size:9.8px; color:#475569; margin-top:2px;">Domain setup &amp; full launch</div>
          </div>
        </div>
      </div>
    </div>

    ${lightFooter("07 · Client Portal & Admin Back-Office")}
  </section>

  <!-- ==================== PAGE 9: ROADMAP, $1,000 LOCK & CHECKLIST ==================== -->
  <section class="page page-light">
    <div>
      <div class="sec-header">
        <div>
          <span class="sec-kicker"><span class="sec-kicker-dot"></span>Launch Roadmap &amp; Summary</span>
          <h2 class="sec-title">How It Works &amp; <span class="accent-gold">$1,000 Risk-Free Hold</span></h2>
        </div>
        <div class="sec-num">08</div>
      </div>
      <p class="sec-lead">
        Three straightforward steps to launch your branded online casino — protected by our 100% refundable 5-day price lock and an all-in-one capability checklist.
      </p>
    </div>

    <div class="page-body">
      <div class="flow-row">
        <div class="flow-step">
          <div class="font-display" style="font-size:23px; font-weight:700; color:#C9930F; line-height:1;">01</div>
          <div style="font-size:12.8px; font-weight:700; color:#160B35; margin:4px 0;">Choose a Design</div>
          <p style="font-size:10.3px; color:#475569; line-height:1.45;">
            Explore 12+ luxury casino looks, inspect interactive previews, and select the theme that fits your brand vision.
          </p>
        </div>
        <div class="flow-arrow">${icons.arrowRight}</div>
        <div class="flow-step">
          <div class="font-display" style="font-size:23px; font-weight:700; color:#C9930F; line-height:1;">02</div>
          <div style="font-size:12.8px; font-weight:700; color:#160B35; margin:4px 0;">Customize Package</div>
          <p style="font-size:10.3px; color:#475569; line-height:1.45;">
            Start with the $15,000 Starter Package and optionally add Live Dealer, Sportsbook, Poker, or Sweepstakes.
          </p>
        </div>
        <div class="flow-arrow">${icons.arrowRight}</div>
        <div class="flow-step">
          <div class="font-display" style="font-size:23px; font-weight:700; color:#C9930F; line-height:1;">03</div>
          <div style="font-size:12.8px; font-weight:700; color:#160B35; margin:4px 0;">Reserve &amp; Launch</div>
          <p style="font-size:10.3px; color:#475569; line-height:1.45;">
            Lock your price with a $1,000 refundable hold, and our team sets up, brands, and launches your casino live.
          </p>
        </div>
      </div>

      <div class="surface-royal" style="padding: 14px 16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:9px;">
          <div class="font-display" style="font-size:17px; font-weight:700; color:#FFD700;">The $1,000 Refundable 5-Day Reservation Guarantee</div>
          <span style="background:rgba(255,215,0,0.16); border:1px solid #FFD700; color:#FFD700; font-size:9.5px; font-weight:700; padding:3.5px 10px; border-radius:999px; letter-spacing:0.08em;">10% INSTANT DISCOUNT</span>
        </div>
        <div class="grid-2" style="gap: 10px;">
          <ul class="clean-list">
            <li><strong>120-Hour Exclusive Lock:</strong> Holds your selected design &amp; discounted package pricing for 5 full days.</li>
            <li><strong>Instant 10% Package Savings:</strong> Save $1,500 on Starter Launch or up to $8,000 on full-suite builds.</li>
          </ul>
          <ul class="clean-list">
            <li><strong>100% Credited Toward Invoice:</strong> Your $1,000 hold is deducted directly from your final build balance.</li>
            <li><strong>100% Refundable Guarantee:</strong> No agreement finalized within 5 days? Your $1,000 is refunded in full.</li>
          </ul>
        </div>
      </div>

      <div class="surface-white push-bottom" style="padding: 12px 14px;">
        <div style="font-size:12px; font-weight:700; color:#160B35; margin-bottom:8px;">Master Feature Checklist — Everything in One Table</div>
        <table class="ed-table" style="font-size:10.2px;">
          <thead>
            <tr>
              <th style="width:24%;">Area</th>
              <th>Included Capabilities</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td-strong">Starter Package</td>
              <td>$15,000 USD &middot; Selected Casino Theme &middot; Online Casino Slots &middot; Table Games (Blackjack, Roulette, Baccarat) &middot; Full Branding &amp; Domain Setup</td>
            </tr>
            <tr>
              <td class="td-strong">Add-On Modules</td>
              <td>Live Dealer Tables (+$10,000) &middot; Sportsbook (+$10,000) &middot; Poker Platform (+$20,000) &middot; Sweepstakes Engine (+$25,000)</td>
            </tr>
            <tr>
              <td class="td-strong">Design Catalog</td>
              <td>12+ Bespoke Luxury Storefronts (Royal Prestige, Neon Vegas, Emerald Club, Diamond Palace, etc.) + Interactive 5-Page Imperial Crown Demo</td>
            </tr>
            <tr>
              <td class="td-strong">Commercial Model</td>
              <td>75% Operator / 25% Platform GGR Split &middot; No License Needed to Start &middot; Zero Hidden Fees &middot; $1,000 Refundable Hold (10% Off)</td>
            </tr>
            <tr>
              <td class="td-strong">Payments &amp; Crypto</td>
              <td>PGX Payment Gateway Checkout &middot; Live Bitcoin (BTC) &amp; USDC (ERC-20) &middot; Automated Webhooks &amp; TxID Verification</td>
            </tr>
            <tr>
              <td class="td-strong">Client Portal</td>
              <td>Saved Quotes &amp; Reference Numbers &middot; Live 120-Hour Countdown &middot; Project Launch Milestones &middot; Digital Receipts</td>
            </tr>
            <tr>
              <td class="td-strong">Admin &amp; Support</td>
              <td>Real-Time KPI Dashboard &middot; Inquiries CRM &amp; CSV Export &middot; Multi-PNG Design Studio &middot; Dynamic Pricing &middot; 24/7 VIP Desk</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    ${lightFooter("08 · Launch Roadmap & Master Checklist")}
  </section>

  <!-- ==================== PAGE 10: CLOSING / NEXT STEPS ==================== -->
  <section class="page page-dark">
    <img class="dark-bg-img" src="${closingBgUri}" alt="" />
    <div class="closing-scrim"></div>

    <div class="z-front cover-topbar">
      <div class="cover-brand-group">
        <img src="${logoUri}" alt="Royal Casino Club" />
        <div class="cover-vbar"></div>
        <div class="cover-brand-sub">24/7 Global Business Inquiries</div>
      </div>
      <span class="cover-pill">Next Step</span>
    </div>

    <div class="z-front" style="margin-top: 6mm;">
      <h2 class="cover-h1" style="font-size:44px; margin-top:0;">
        Ready to Launch<br />
        <span class="gold-foil" style="font-style:italic;">Your Branded Casino?</span>
      </h2>
      <div class="cover-accent-line"></div>
      <p class="cover-desc" style="max-width: 152mm;">
        Tell us your preferred design, target market, and desired add-on modules. We will walk you through a live demo, prepare your tailored package quote, and help you lock in your 10% reservation discount today.
      </p>

      <div class="grid-3" style="margin-top: 15mm; gap: 12px;">
        <div class="cover-kpi-glass">
          <div style="font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#FFD700; margin-bottom:6px;">Step 01 &middot; Explore</div>
          <div class="font-display" style="font-size:18px; font-weight:700; color:#FFFFFF; margin-bottom:6px;">Browse 12+ Themes</div>
          <p style="font-size:10.8px; color:#CBD5E1; line-height:1.5;">
            Preview all luxury casino designs and interactive demos online:<br />
            <a href="https://royalcasinoclub.com/designs" style="color:#FFD700; font-weight:700; text-decoration:underline;">royalcasinoclub.com/designs</a>
          </p>
        </div>

        <div class="cover-kpi-glass">
          <div style="font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#FFD700; margin-bottom:6px;">Step 02 &middot; Configure</div>
          <div class="font-display" style="font-size:18px; font-weight:700; color:#FFFFFF; margin-bottom:6px;">Reserve &amp; Save 10%</div>
          <p style="font-size:10.8px; color:#CBD5E1; line-height:1.5;">
            Customize add-ons and lock your price with a $1,000 refundable hold:<br />
            <a href="https://royalcasinoclub.com/select-design" style="color:#FFD700; font-weight:700; text-decoration:underline;">royalcasinoclub.com/select-design</a>
          </p>
        </div>

        <div class="cover-kpi-glass">
          <div style="font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#FFD700; margin-bottom:6px;">Step 03 &middot; Connect</div>
          <div class="font-display" style="font-size:18px; font-weight:700; color:#FFFFFF; margin-bottom:6px;">24/7 VIP Onboarding</div>
          <p style="font-size:10.8px; color:#CBD5E1; line-height:1.5;">
            Speak directly with our casino launch specialists for a private demo &amp; consultation.
          </p>
        </div>
      </div>

      <div style="margin-top: 13mm; background:rgba(15, 7, 36, 0.88); border:1px solid rgba(255, 215, 0, 0.48); border-radius:12px; padding:18px 20px; display:flex; justify-content:space-between; align-items:center; gap:16px;">
        <div>
          <div style="font-size:10px; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; color:#FFD700;">Direct Partner Channels</div>
          <div style="display:flex; flex-wrap:wrap; gap:18px; margin-top:8px; font-size:11.5px; color:#F8FAFC;">
            <div><span style="color:#94A3B8;">WhatsApp:</span> <a href="https://wa.me/14164770191" style="font-weight:700; color:#FFFFFF;">+1 (416) 477-0191</a></div>
            <div><span style="color:#94A3B8;">Telegram:</span> <a href="https://t.me/RoyalCasinoClubOfficial" style="font-weight:700; color:#FFFFFF;">@RoyalCasinoClubOfficial</a></div>
            <div><span style="color:#94A3B8;">Email:</span> <a href="mailto:contact@royalcasinoclub.com" style="font-weight:700; color:#FFFFFF;">contact@royalcasinoclub.com</a></div>
          </div>
        </div>
        <a href="https://royalcasinoclub.com/select-design" style="background:linear-gradient(135deg, #FFD700 0%, #D99B00 100%); color:#090418; font-weight:800; font-size:11.5px; padding:11px 18px; border-radius:8px; white-space:nowrap; letter-spacing:0.04em;">
          Book Live Demo &rarr;
        </a>
      </div>
    </div>

    <div class="z-front dark-footer">
      <div>Royal Casino Club &mdash; Online Casino Solutions</div>
      <a href="https://royalcasinoclub.com" style="color:#FFD700; font-weight:600;">https://royalcasinoclub.com</a>
    </div>
  </section>

</body>
</html>
`;

const tmpHtml = path.join(os.tmpdir(), `royal-casino-proposal-v2-${Date.now()}.html`);
fs.writeFileSync(tmpHtml, html, "utf8");

try {
  const chromePath = findChromeExecutable();
  const fileUrl = `file:///${tmpHtml.replace(/\\/g, "/")}`;
  execFileSync(
    chromePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--virtual-time-budget=5000",
      "--no-pdf-header-footer",
      `--print-to-pdf=${OUTPUT_PDF}`,
      fileUrl,
    ],
    { stdio: "inherit" }
  );
  const stats = fs.statSync(OUTPUT_PDF);
  console.log(`Generated ${OUTPUT_PDF} (${(stats.size / 1024).toFixed(1)} KB)`);
} finally {
  if (fs.existsSync(tmpHtml)) {
    fs.unlinkSync(tmpHtml);
  }
}
