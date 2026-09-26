"use client";

import React from "react";
import { AlertCircle, RefreshCw, ArrowLeft, Headphones } from "lucide-react";

interface ErrorStateProps {
  onRetry: () => void;
  onBack?: () => void;
  onContactSupport?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  onRetry,
  onBack,
  onContactSupport,
}) => {
  return (
    <div className="mx-auto max-w-lg min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-slate-200/80 bg-white px-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold text-slate-900">Track Order</span>
        <div className="w-10" />
      </header>

      {/* Main Error Box */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-4">
          <AlertCircle className="h-7 w-7" />
        </div>

        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          We couldn’t load tracking information
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-xs leading-relaxed">
          We had trouble connecting to the delivery network. Please check your connection and try again.
        </p>

        <div className="mt-6 flex flex-col w-full max-w-xs gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.98] transition-all shadow-xs"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>

          {onContactSupport && (
            <button
              type="button"
              onClick={onContactSupport}
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Headphones className="h-4 w-4 text-slate-500" />
              <span>Contact Support</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
