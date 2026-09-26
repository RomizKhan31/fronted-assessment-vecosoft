"use client";

import React, { useState } from "react";
import { Check, Clock, AlertTriangle, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { TimelineStep } from "@/types/order";
import { cn } from "@/lib/utils";

interface TimelineStepItemProps {
  step: TimelineStep;
  isLast: boolean;
  isCurrent: boolean;
}

export const TimelineStepItem: React.FC<TimelineStepItemProps> = ({
  step,
  isLast,
  isCurrent,
}) => {
  // If current or delayed, expand by default. Otherwise collapse for clean scan.
  const [isExpanded, setIsExpanded] = useState<boolean>(
    step.status === "current" || step.status === "delayed"
  );

  const hasExtraDetails = Boolean(step.details || step.location || step.time);

  // Status node styling
  const renderNodeIcon = () => {
    switch (step.status) {
      case "completed":
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
            <Check className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
            <span className="sr-only">Completed:</span>
          </div>
        );
      case "delayed":
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm ring-4 ring-amber-100">
            <AlertTriangle className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
            <span className="sr-only">Delay encountered:</span>
          </div>
        );
      case "current":
        return (
          <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm ring-4 ring-blue-100">
            <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
            <span className="sr-only">Current status:</span>
          </div>
        );
      case "upcoming":
      default:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-slate-300">
            <div className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="sr-only">Upcoming step:</span>
          </div>
        );
    }
  };

  // Connector line style
  const renderConnector = () => {
    if (isLast) return null;
    const isLineActive = step.status === "completed";
    return (
      <div
        aria-hidden="true"
        className={cn(
          "absolute left-3.5 top-7 -bottom-2 w-0.5 -translate-x-1/2 transition-colors",
          isLineActive ? "bg-emerald-600" : "bg-slate-200"
        )}
      />
    );
  };

  return (
    <li
      className={cn(
        "relative flex gap-3.5 pb-6",
        isLast && "pb-0"
      )}
      aria-current={isCurrent ? "step" : undefined}
    >
      {renderConnector()}

      {/* Node icon */}
      <div className="relative z-10 flex-shrink-0 pt-0.5">
        {renderNodeIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <button
          type="button"
          onClick={() => hasExtraDetails && setIsExpanded(!isExpanded)}
          disabled={!hasExtraDetails}
          className={cn(
            "w-full text-left rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
            hasExtraDetails && "cursor-pointer group hover:bg-slate-50/80 -m-1.5 p-1.5"
          )}
          aria-expanded={isExpanded}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={cn(
                    "text-sm font-semibold tracking-tight",
                    step.status === "current" && "text-blue-900 font-bold",
                    step.status === "delayed" && "text-amber-900 font-bold",
                    step.status === "completed" && "text-slate-900",
                    step.status === "upcoming" && "text-slate-400"
                  )}
                >
                  {step.title}
                </span>

                {step.status === "current" && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-800">
                    Active
                  </span>
                )}
                {step.status === "delayed" && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    Exception
                  </span>
                )}
              </div>

              {step.subtitle && (
                <p
                  className={cn(
                    "text-xs mt-0.5 leading-relaxed",
                    step.status === "upcoming" ? "text-slate-400" : "text-slate-600"
                  )}
                >
                  {step.subtitle}
                </p>
              )}
            </div>

            {/* Date / Time or Chevron */}
            <div className="flex items-center gap-1 flex-shrink-0 text-right">
              {step.time && (
                <div className="text-right">
                  <span
                    className={cn(
                      "block text-[11px] font-medium",
                      step.status === "upcoming" ? "text-slate-400" : "text-slate-700"
                    )}
                  >
                    {step.date || "Today"}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    {step.time}
                  </span>
                </div>
              )}
              {hasExtraDetails && (
                <div className="text-slate-400 group-hover:text-slate-600 transition-colors ml-0.5">
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              )}
            </div>
          </div>
        </button>

        {/* Expandable scan details */}
        {isExpanded && hasExtraDetails && (
          <div className="mt-2.5 rounded-xl border border-slate-100 bg-slate-50/80 p-3 text-xs text-slate-700 animate-fadeIn">
            {step.location && (
              <div className="flex items-center gap-1.5 text-slate-600 font-medium mb-1">
                <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{step.location}</span>
              </div>
            )}
            {step.details && (
              <p className="leading-relaxed text-slate-600 text-xs">
                {step.details}
              </p>
            )}
          </div>
        )}
      </div>
    </li>
  );
};
