"use client";

import React from "react";

export const LoadingState: React.FC = () => {
  return (
    <div
      role="status"
      aria-label="Loading tracking information"
      className="mx-auto max-w-lg min-h-screen bg-slate-50 pb-16 animate-pulse"
    >
      {/* Header skeleton */}
      <div className="h-14 border-b border-slate-200/80 bg-white px-4 flex items-center justify-between">
        <div className="h-8 w-8 rounded-full bg-slate-200" />
        <div className="flex flex-col items-center gap-1.5">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-3 w-16 rounded bg-slate-100" />
        </div>
        <div className="h-8 w-8 rounded-full bg-slate-200" />
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Status card skeleton */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="h-5 w-24 rounded-full bg-slate-200" />
            <div className="h-4 w-20 rounded bg-slate-100" />
          </div>
          <div className="space-y-2 pt-1">
            <div className="h-6 w-3/4 rounded bg-slate-200" />
            <div className="h-4 w-full rounded bg-slate-100" />
            <div className="h-4 w-2/3 rounded bg-slate-100" />
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-100 p-3.5">
            <div className="space-y-1.5">
              <div className="h-3 w-20 rounded bg-slate-200" />
              <div className="h-5 w-32 rounded bg-slate-300" />
            </div>
            <div className="h-10 w-10 rounded-xl bg-slate-200" />
          </div>
        </div>

        {/* Carrier/estimate card skeleton */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-200" />
              <div className="space-y-1">
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="h-3 w-20 rounded bg-slate-100" />
              </div>
            </div>
            <div className="h-8 w-24 rounded-lg bg-slate-100" />
          </div>
        </div>

        {/* Timeline skeleton */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-6 shadow-xs">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="h-5 w-36 rounded bg-slate-200" />
            <div className="h-4 w-16 rounded bg-slate-100" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3.5">
              <div className="h-7 w-7 rounded-full bg-slate-200 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="h-3 w-14 rounded bg-slate-100" />
                </div>
                <div className="h-3 w-48 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Product summary skeleton */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
          <div className="flex justify-between">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="h-4 w-12 rounded bg-slate-100" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-xl bg-slate-200 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="h-3 w-1/2 rounded bg-slate-100" />
              <div className="h-4 w-16 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading shipment status...</span>
    </div>
  );
};
