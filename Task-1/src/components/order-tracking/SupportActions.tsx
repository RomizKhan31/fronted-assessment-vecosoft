"use client";

import React from "react";
import { Headphones, AlertCircle, ShieldCheck, HelpCircle } from "lucide-react";
import { OrderTrackingState } from "@/types/order";

interface SupportActionsProps {
  state: OrderTrackingState;
  onContactSupport: () => void;
  onReportIssue: () => void;
}

export const SupportActions: React.FC<SupportActionsProps> = ({
  state,
  onContactSupport,
  onReportIssue,
}) => {
  return (
    <section
      aria-label="Order support and assistance"
      className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
          <HelpCircle className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Need Help with This Order?
          </h3>
          <p className="text-xs text-slate-500">
            Our customer care specialists are available 24/7
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3.5">
        <button
          type="button"
          onClick={onContactSupport}
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <Headphones className="h-4 w-4 text-slate-300" />
          <span>Contact Support</span>
        </button>

        <button
          type="button"
          onClick={onReportIssue}
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-100 active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <AlertCircle className="h-4 w-4 text-slate-600" />
          <span>Report an Issue</span>
        </button>
      </div>

      {/* Trust & Guarantee badge */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
        <span>Backed by AuraStore 100% On-Time & Purchase Protection</span>
      </div>
    </section>
  );
};
