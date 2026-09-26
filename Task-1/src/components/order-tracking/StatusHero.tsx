"use client";

import React from "react";
import {
  Truck,
  AlertTriangle,
  ClockAlert,
  HelpCircle,
  CheckCircle2,
  PackageCheck,
  PackageSearch,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { OrderTrackingState, DeliveryEstimate } from "@/types/order";

interface StatusHeroProps {
  state: OrderTrackingState;
  estimate: DeliveryEstimate;
  onReportIssue: () => void;
  onContactSupport: () => void;
  onViewDetails?: () => void;
}

export const StatusHero: React.FC<StatusHeroProps> = ({
  state,
  estimate,
  onReportIssue,
  onContactSupport,
  onViewDetails,
}) => {
  // Configuration per state with accessible color pairings and icons
  switch (state) {
    case "delayed":
      return (
        <section
          aria-labelledby="status-hero-title"
          className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5 shadow-sm transition-all"
        >
          {/* Top Status Pill */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-100/90 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
              <ClockAlert className="h-3.5 w-3.5 text-amber-700" aria-hidden="true" />
              Delivery Delayed
            </span>
            <span className="text-xs font-medium text-amber-800">
              Revised Delivery Time
            </span>
          </div>

          {/* Main Title & Description */}
          <div className="mt-3">
            <h2
              id="status-hero-title"
              className="text-lg sm:text-xl font-bold tracking-tight text-slate-900"
            >
              We’re sorry — your delivery is delayed
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
              Your package is taking longer than expected due to transit delays
              in the regional hub. It remains safe and is in active transit.
            </p>
          </div>

          {/* Revised ETA Callout */}
          <div className="mt-4 flex items-center justify-between rounded-xl border border-amber-300/80 bg-white/90 p-3 shadow-xs">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
                Updated Estimate
              </p>
              <p className="text-base font-bold text-slate-900">
                {estimate.updatedEstimate || "Tomorrow by 8:00 PM"}
              </p>
            </div>
            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
              <Truck className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>

          {/* Calm, helpful action buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={onReportIssue}
              className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-amber-900 hover:bg-amber-100/50 active:scale-[0.98] transition-all shadow-xs"
            >
              <AlertTriangle className="h-4 w-4 text-amber-700" />
              Report Delivery Issue
            </button>
            <button
              type="button"
              onClick={onContactSupport}
              className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xs"
            >
              <HelpCircle className="h-4 w-4 text-slate-200" />
              Contact Support
            </button>
          </div>
        </section>
      );

    case "delivered_not_received":
      return (
        <section
          aria-labelledby="status-hero-title"
          className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4 sm:p-5 shadow-sm transition-all"
        >
          {/* Top Status Pill */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-300 bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-900">
              <PackageSearch className="h-3.5 w-3.5 text-rose-700" aria-hidden="true" />
              Action Required
            </span>
            <span className="text-xs font-medium text-rose-800">
              Delivery Investigation
            </span>
          </div>

          {/* Main Title & Description */}
          <div className="mt-3">
            <h2
              id="status-hero-title"
              className="text-lg sm:text-xl font-bold tracking-tight text-slate-900"
            >
              Marked as delivered, but package not received?
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
              The carrier marked this shipment as delivered today, but we understand
              you have not received it yet. We are here to locate or replace it.
            </p>
          </div>

          {/* Prominent Action Callout */}
          <div className="mt-4 rounded-xl border border-rose-200 bg-white p-3.5 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-900">
                  Step 1: File a quick delivery check
                </h3>
                <p className="mt-0.5 text-xs text-slate-600">
                  Let our logistics team know so we can initiate an immediate carrier GPS scan verification.
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-rose-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={onReportIssue}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 active:scale-[0.98] transition-all shadow-xs"
              >
                <span>Report Delivery Issue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onContactSupport}
                className="flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <HelpCircle className="h-3.5 w-3.5 text-slate-500" />
                <span>Speak with Customer Support</span>
              </button>
            </div>
          </div>
        </section>
      );

    case "tracking_unavailable":
      return (
        <section
          aria-labelledby="status-hero-title"
          className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs transition-all"
        >
          {/* Top Status Pill */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
              Order Confirmed
            </span>
            <span className="text-xs font-medium text-slate-500">
              Awaiting Handover
            </span>
          </div>

          {/* Main Title & Description */}
          <div className="mt-3">
            <h2
              id="status-hero-title"
              className="text-lg sm:text-xl font-bold tracking-tight text-slate-900"
            >
              Tracking isn’t available yet
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Your order has been confirmed and is being packed. Real-time carrier tracking
              will appear here as soon as the package is handed to the shipping partner.
            </p>
          </div>

          {/* ETA Range card */}
          <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Estimated Delivery Window
              </p>
              <p className="text-base font-bold text-slate-900">
                {estimate.window}
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <Truck className="h-5 w-5" />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onViewDetails}
              className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-50 active:scale-[0.98] transition-all"
            >
              <ExternalLink className="h-4 w-4 text-slate-500" />
              View Order Details
            </button>
            <button
              type="button"
              onClick={onContactSupport}
              className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.98] transition-all"
            >
              <HelpCircle className="h-4 w-4" />
              Contact Support
            </button>
          </div>
        </section>
      );

    case "out_for_delivery":
      return (
        <section
          aria-labelledby="status-hero-title"
          className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5 shadow-xs transition-all"
        >
          {/* Top Status Pill */}
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-900">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600"></span>
              </span>
              On The Way
            </span>
            <span className="text-xs font-semibold text-emerald-800">
              Arriving Today
            </span>
          </div>

          {/* Main Title & Description */}
          <div className="mt-3">
            <h2
              id="status-hero-title"
              className="text-lg sm:text-xl font-bold tracking-tight text-slate-900"
            >
              Out for delivery
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              Your courier is on their delivery route. Keep an ear out for the door or buzzer.
            </p>
          </div>

          {/* Arrival Window Box */}
          <div className="mt-4 flex items-center justify-between rounded-xl border border-emerald-200/80 bg-white/95 p-3.5 shadow-xs">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                Estimated Arrival
              </p>
              <p className="text-base sm:text-lg font-bold text-slate-900">
                {estimate.window}
              </p>
            </div>
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
              <Truck className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
        </section>
      );

    case "delivered":
      return (
        <section
          aria-labelledby="status-hero-title"
          className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5 shadow-xs transition-all"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-900">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
              Delivered Successfully
            </span>
            <span className="text-xs font-medium text-slate-500">
              Completed
            </span>
          </div>

          <div className="mt-3">
            <h2
              id="status-hero-title"
              className="text-lg sm:text-xl font-bold tracking-tight text-slate-900"
            >
              Package delivered
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              Your package was safely delivered to your front porch/door area.
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-3 border border-emerald-100">
            <div>
              <p className="text-xs text-slate-500">Delivery Time</p>
              <p className="text-sm font-bold text-slate-900">{estimate.window}</p>
            </div>
            <button
              type="button"
              onClick={onReportIssue}
              className="text-xs font-semibold text-slate-600 hover:text-rose-600 underline underline-offset-2 transition-colors"
            >
              Didn’t receive it?
            </button>
          </div>
        </section>
      );

    case "processing":
    case "shipped":
    default:
      return (
        <section
          aria-labelledby="status-hero-title"
          className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 sm:p-5 shadow-xs transition-all"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-300 bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-900">
              <PackageCheck className="h-3.5 w-3.5 text-blue-700" />
              {state === "shipped" ? "In Transit" : "Processing"}
            </span>
            <span className="text-xs font-medium text-blue-800">
              {estimate.statusBadge}
            </span>
          </div>

          <div className="mt-3">
            <h2
              id="status-hero-title"
              className="text-lg sm:text-xl font-bold tracking-tight text-slate-900"
            >
              {estimate.headline}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {estimate.contextNote}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-white p-3 border border-blue-100">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Estimated Delivery
              </p>
              <p className="text-base font-bold text-slate-900">
                {estimate.window}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
              <Truck className="h-5 w-5" />
            </div>
          </div>
        </section>
      );
  }
};
