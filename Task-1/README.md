# Order Tracking Mobile Experience — Task 1

[![Live Demo](https://img.shields.io/badge/Live_Demo-Netlify-00C7B7?style=flat&logo=netlify)](https://luxury-lokum-09dec5.netlify.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)

> 🚀 **Live Demo URL**: [https://luxury-lokum-09dec5.netlify.app/](https://luxury-lokum-09dec5.netlify.app/)

A production-quality, accessible mobile Order Tracking experience designed for modern e-commerce using **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## Quick Start & Setup Guide

### 1. Prerequisites
Ensure you have Node.js installed on your machine:
* **Node.js**: `v18.17.0` or later (tested with Node 20.x and Node 24.x)
* **npm**: `v9.x` or later (or `pnpm` / `yarn`)

### 2. Installation
From this directory (`Task-1`), install project dependencies:

```bash
npm install
```

### 3. Running Development Server
Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Running Production Build
To test the optimized production build locally:

```bash
# 1. Typecheck the TypeScript codebase
npm run typecheck

# 2. Run ESLint checks
npm run lint

# 3. Compile the production bundle
npm run build

# 4. Start the production server
npm start
```

---

## Demo State & Viewport Simulator

A floating **Demo Controls** bar is fixed at the bottom-right of the screen. Reviewers can:
1. **Switch Tracking Scenarios**:
   * `out_for_delivery` (Live delivery rider with ETA)
   * `delayed` (Transit delay exception with updated ETA)
   * `delivered_not_received` (Delivery investigation & issue report flow)
   * `tracking_unavailable` (Pre-shipment order confirmation)
   * `processing` (Warehouse picking & packing)
   * `shipped` (In-transit between sorting hubs)
   * `delivered` (Successful delivery with invoice access)
   * `loading` (Accessible skeleton loader)
   * `error` (Network failure recovery screen with retry)
   * `empty` (Missing order data fallback screen)
2. **Simulate Mobile Viewport Widths**:
   * `360px` (Galaxy S8 / compact Android)
   * `375px` (iPhone SE / iPhone 13 mini)
   * `390px` (iPhone 14 / iPhone 15)
   * `414px` (iPhone XR / Plus models)
   * `430px` (iPhone 15 Pro Max)
   * `Fluid` (100% full width responsive)

---

## Bangladesh E-Commerce Localization

* **Currency**: Formatted in Bangladeshi Taka (`৳`) using `en-BD` locale rules (`৳3,499`, `৳450`, `৳60` delivery fee).
* **Recipient**: Tanvir Ahmed, House 42, Road 11, Block D, Flat 4B, Banani, Dhaka-1213.
* **Carriers**: **Pathao Courier** (`PTH-8942-0194-BD`) and **Steadfast Courier** (`ST-8942-0194-BD`).
* **Rider**: Pathao delivery rider Rashed Hasan (Phone: `01823-456789`).
* **Hubs**: Savar Central Warehouse, Tejgaon Sorting Hub, Mohakhali/Banani Delivery Station, and Daudkandi Bridge transit waypoint.
* **Payment Methods**: **bKash**, **Nagad**, **Cash on Delivery (COD)**, and **City Bank Visa**.

---

## Component Architecture

```text
src/
├── app/
│   ├── globals.css              # Tailwind utilities, accessible focus, reduced motion
│   ├── layout.tsx               # Mobile viewport configuration & metadata
│   └── page.tsx                 # Server page wrapper
├── components/order-tracking/
│   ├── OrderTracking.tsx        # Main state coordinator & modal manager
│   ├── TrackingHeader.tsx       # Back button, order title, and link sharing
│   ├── StatusHero.tsx           # State-specific status hero with plain-language context
│   ├── DeliveryEstimate.tsx     # Delivery window, carrier waybill & copy action
│   ├── TrackingTimeline.tsx     # Progress timeline container
│   ├── TimelineStepItem.tsx     # Interactive step with expandable scan notes
│   ├── ProductSummary.tsx       # Purchased items, quantities, and prices
│   ├── SupportActions.tsx       # Action buttons for care and issue reporting
│   ├── OrderDetailsDrawer.tsx   # Itemized invoice, tax, and address breakdown
│   ├── ContactSupportModal.tsx  # Live chat simulation, carrier call, and FAQs
│   ├── ReportIssueModal.tsx     # Issue submission flow with Darwan checklist
│   ├── LoadingState.tsx         # Skeleton loader
│   ├── ErrorState.tsx           # Error screen with retry trigger
│   ├── EmptyState.tsx           # Missing order data screen
│   └── DevStateSwitcher.tsx     # State preview & viewport simulator
├── data/
│   └── mockOrders.ts            # Typed mock data for all scenarios
├── lib/
│   └── utils.ts                 # Currency formatter (BDT ৳) and clsx/tailwind-merge
└── types/
    └── order.ts                 # TypeScript domain types & interfaces
```

---

## Verification & Deployment

| Command / Resource | Purpose | Expected Result |
|---|---|---|
| `npm run typecheck` | Validates TypeScript types | `0 errors` |
| `npm run lint` | Checks Next.js & ESLint rules | `✔ No ESLint warnings or errors` |
| `npm run build` | Compiles production assets | `✓ Compiled successfully (4/4 static pages)` |
| `npm start` | Runs production server | Accessible at `http://localhost:3000` |
| **Live Demo** | Production Netlify Deployment | [https://luxury-lokum-09dec5.netlify.app/](https://luxury-lokum-09dec5.netlify.app/) |

