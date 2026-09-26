"use client";

import React, { useState } from "react";
import { ArrowLeft, Share2, Check, ExternalLink } from "lucide-react";

interface TrackingHeaderProps {
  orderNumber: string;
  onBack?: () => void;
  onOpenDetails?: () => void;
}

export const TrackingHeader: React.FC<TrackingHeaderProps> = ({
  orderNumber,
  onBack,
  onOpenDetails,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(
          `${window.location.origin}/track?order=${orderNumber}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back to orders list"
          className="group -ml-1.5 flex h-11 w-11 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Header Title & Subtitle */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-base font-semibold tracking-tight text-slate-900">
            Track Order
          </h1>
          <button
            type="button"
            onClick={onOpenDetails}
            className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors focus-visible:outline-none"
            title="View order details"
          >
            <span>{orderNumber}</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </button>
        </div>

        {/* Share / Copy tracking link action */}
        <div className="relative -mr-1.5 flex items-center">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share tracking link"
            className="flex h-11 w-11 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-blue-600"
            title={copied ? "Link Copied!" : "Share tracking link"}
          >
            {copied ? (
              <Check className="h-5 w-5 text-emerald-600" />
            ) : (
              <Share2 className="h-5 w-5" />
            )}
          </button>
          {copied && (
            <span
              role="status"
              className="absolute right-0 top-12 rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white shadow-md animate-fade-in"
            >
              Link copied!
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
