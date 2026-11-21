# ALL I GAMING — Project Brief & Executive Summary

## 1. Executive Summary & Core Mission
**ALL I GAMING** is a high-end **B2B Online Casino Marketplace & Reservation Platform**.

> **CRITICAL DISTINCTION:** This is NOT an online gambling or betting website. It is an e-commerce / B2B sales marketplace where entrepreneurs, gaming operators, and business owners purchase turnkey casino software packages, license platform solutions, select UI/UX designs, and customize platform modules.

---

## 2. Visual Theme & Aesthetics
- **Theme:** Luxury Modern
- **Palette:** Deep Black, Royal Purple, Metallic Gold, and Subtle Neon Accents.
- **Atmosphere:** High-ticket, professional, sleek, and conversion-optimized.

---

## 3. Two Core Pillars of the Platform

### Pillar 1: Public Customer Marketplace
1. **Homepage (`/`):**
   - High-impact luxury hero section ("Launch Your Own Online Casino").
   - $15,000 USD Starter Package breakdown.
   - Interactive preview of featured casino designs.
   - Overview of optional add-on modules.
   - 4-step "How It Works" guide.
2. **Casino Designs Gallery (`/designs`):**
   - Database-driven gallery showing all active casino designs.
   - 3 rows of 4 designs on desktop (12 initial designs).
   - "View Demo" direct navigation for each design.
3. **Interactive Demo Page (`/designs/[slug]`):**
   - **Right Panel (Preview Area):** Multi-image PNG gallery loaded directly from admin uploads. Supports image switching, thumbnails, full-screen zoom, and mobile swipe navigation.
   - **Left Panel (Fixed Pricing Sidebar):**
     - Base package: $15,000 USD (Includes Slots + Table Games).
     - Add-ons with interactive checkboxes/buttons:
       - Live Dealer Casino (+$10,000)
       - Sportsbook Platform (+$10,000)
       - Poker Platform (+$20,000)
       - Sweepstakes Module (+$25,000)
     - Live auto-calculating total price.
     - Transparent GGR Share breakdown (Our Company: 25% | Operator Share: 75%).
     - "Select This Design" primary CTA.
4. **Select Design Page (`/select-design`):**
   - Summary of selected design, chosen add-ons, and calculated total.
   - Customer information form (Full Name, Email, Phone, WhatsApp, Business Name, Timeline dropdown, Project Requirements).
   - "Submit Selection" action button.
5. **Optional $500 Reservation Popup & Checkout:**
   - Appears immediately upon submission.
   - **Option A — Reserve Now ($500 USD):**
     - Fully refundable $500 reservation fee.
     - Unlocks an exclusive **5% discount** across the entire package.
     - Locks the design and discounted price for **5 days (120 hours)**.
     - Credited toward the purchase if the deal completes.
     - Refunded in full if no deal is finalized within 5 days.
   - **Option B — Continue Without Reserving:**
     - Free submission; saved as a standard inquiry for sales follow-up.

---

### Pillar 2: Admin Management Dashboard
1. **Overview Dashboard:** Real-time metrics for total designs, active designs, incoming inquiries, active 5-day reservations, expiring reservations, completed deals, and pending refunds.
2. **Casino Design & Multi-PNG Upload System:**
   - 100% self-serve system for non-technical admins.
   - Create and edit casino designs.
   - Upload primary thumbnail PNG.
   - Batch upload multiple demo PNGs per design.
   - Reorder images via drag-and-drop.
   - Set titles for individual preview PNGs.
   - Toggle visibility (`Active`, `Hidden`, `Unavailable`).
3. **Pricing & Add-On Management:**
   - Modify the $15,000 base package price.
   - Add, edit, or disable add-on modules and prices.
   - Edit GGR share percentages.
   - Adjust the reservation fee ($500) and discount percentage (5%).
4. **Customer Selections & Lead Management:**
   - Track every customer inquiry with contact details, chosen modules, and budget.
   - Update lead statuses (`New Inquiry`, `Contacted`, `Reviewing`, `Offer Sent`, etc.).
   - Internal sales notes on each record.
   - Export leads and reservations to CSV/Excel.
5. **5-Day Reservation & Automated Expiration System:**
   - Dedicated dashboard tracking 120-hour timers and locked prices.
   - Server-side cron job monitoring expirations.
   - Safe refund triggering and state management (`Pending Payment`, `Active Reservation`, `Agreement Completed`, `Expired`, `Refunded`).

---

## 4. Technology Stack & Current Infrastructure
- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4, `@base-ui/react`, Lucide Icons.
- **Backend / Database:** MongoDB (`casino` database) connected via `mongoose` (`lib/mongodb.ts`).
- **Build & Deployment:** Standalone output enabled in `next.config.ts`, Dockerized multi-stage container ready for Dokploy hosting.
- **Environment:** Configured in `.env` and `.env.example`.
