"use client";

import React from "react";
import { TimelineStep } from "@/types/order";
import { TimelineStepItem } from "./TimelineStepItem";
import { Clock } from "lucide-react";

interface TrackingTimelineProps {
  steps: TimelineStep[];
  title?: string;
}

export const TrackingTimeline: React.FC<TrackingTimelineProps> = ({
  steps,
  title = "Shipment Progress",
}) => {
  if (!steps || steps.length === 0) {
    return null;
  }

  // Find index of current or delayed step
  const currentIndex = steps.findIndex(
    (s) => s.status === "current" || s.status === "delayed"
  );

  return (
    <section
      aria-labelledby="timeline-heading"
      className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs"
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div>
          <h3
            id="timeline-heading"
            className="text-sm sm:text-base font-bold text-slate-900 tracking-tight"
          >
            {title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tap a step to view transit notes & scan locations
          </p>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
          <Clock className="h-3 w-3 text-slate-400" />
          <span>Real-time</span>
        </div>
      </div>

      <ol role="list" className="relative">
        {steps.map((step, idx) => (
          <TimelineStepItem
            key={step.id || idx}
            step={step}
            isLast={idx === steps.length - 1}
            isCurrent={idx === currentIndex}
          />
        ))}
      </ol>
    </section>
  );
};
