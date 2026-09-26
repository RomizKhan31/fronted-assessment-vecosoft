"use client";

import React, { useState } from "react";
import {
  X,
  AlertTriangle,
  CheckCircle2,
  PackageSearch,
  MapPin,
  Clock,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  carrierName?: string;
  initialCategory?: string;
  onContactSupport: () => void;
}

const ISSUE_CATEGORIES = [
  {
    id: "not_received",
    label: "I haven't received my package",
    description: "Marked delivered, but not at my door or mailbox.",
  },
  {
    id: "wrong_address",
    label: "Delivered to wrong location",
    description: "Delivery photo or address does not match my home.",
  },
  {
    id: "delayed_exception",
    label: "Severely delayed in transit",
    description: "Package tracking has stalled or missed promised window.",
  },
  {
    id: "damaged",
    label: "Package damaged or opened",
    description: "Items arrived broken or outer packaging was compromised.",
  },
];

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  orderNumber,
  carrierName = "Courier Dispatch",
  initialCategory = "not_received",
  onContactSupport,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [checkedNeighbors, setCheckedNeighbors] = useState(false);
  const [checkedSafeSpots, setCheckedSafeSpots] = useState(false);
  const [userNote, setUserNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [claimId, setClaimId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setClaimId(`CLM-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-issue-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
    >
      {/* Backdrop tap to close */}
      <div
        className="fixed inset-0"
        onClick={handleReset}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div className="relative z-10 w-full max-w-lg rounded-t-2xl sm:rounded-2xl bg-white shadow-floating max-h-[90vh] overflow-y-auto no-scrollbar border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="report-issue-modal-title"
                className="text-base font-bold text-slate-900"
              >
                Report a Delivery Issue
              </h2>
              <p className="text-xs text-slate-500">Order #{orderNumber}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Close dialog"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 active:scale-95 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {isSubmitted ? (
            <div className="py-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Issue Reported Successfully
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Claim Reference: <span className="font-mono font-semibold text-slate-800">{claimId}</span>
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                We’ve contacted <strong>{carrierName} Dispatch</strong> for an immediate GPS drop scan and rider verification. If the parcel cannot be located within 24 hours, you are guaranteed an immediate replacement or full refund.
              </p>

              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    onContactSupport();
                  }}
                  className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.98] transition-all"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Chat with an Agent Now</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex min-h-[44px] w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  What happened with your delivery?
                </label>
                <div className="space-y-2">
                  {ISSUE_CATEGORIES.map((cat) => (
                    <label
                      key={cat.id}
                      className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                        selectedCategory === cat.id
                          ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="issueCategory"
                        value={cat.id}
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                        className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-600"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-slate-900 block">
                          {cat.label}
                        </span>
                        <span className="text-slate-500 block mt-0.5">
                          {cat.description}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Helpful checklist to prevent common delivery confusion */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 text-xs text-slate-700">
                <p className="font-semibold text-amber-900 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-amber-700" />
                  Quick check before reporting:
                </p>
                <div className="space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkedSafeSpots}
                      onChange={(e) => setCheckedSafeSpots(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded text-blue-600 focus:ring-blue-600"
                    />
                    <span>
                      I checked with the building security guard / Darwan or ground floor reception desk.
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checkedNeighbors}
                      onChange={(e) => setCheckedNeighbors(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded text-blue-600 focus:ring-blue-600"
                    />
                    <span>
                      I checked with family members or flatmates who may have received the parcel.
                    </span>
                  </label>
                </div>
              </div>

              {/* Optional note */}
              <div>
                <label
                  htmlFor="user-note"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Additional details (optional)
                </label>
                <textarea
                  id="user-note"
                  rows={2}
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="e.g. Looked around 1:30 PM, no driver visited or package visible."
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-rose-700 active:scale-[0.98] transition-all shadow-xs disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting Report...</span>
                  ) : (
                    <>
                      <span>Submit Delivery Issue</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
