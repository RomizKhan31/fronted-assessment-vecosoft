"use client";

import React, { useState } from "react";
import { ViewState } from "@/types/order";
import { Sliders, Smartphone, Monitor, ChevronUp, ChevronDown, Check } from "lucide-react";

interface DevStateSwitcherProps {
  currentState: ViewState;
  onStateChange: (state: ViewState) => void;
  currentWidth: string;
  onWidthChange: (width: string) => void;
}

const STATES: Array<{ id: ViewState; label: string; group: "tracking" | "ui" }> = [
  { id: "out_for_delivery", label: "Out for Delivery", group: "tracking" },
  { id: "delayed", label: "Delayed Order", group: "tracking" },
  { id: "delivered_not_received", label: "Delivered (Not Received)", group: "tracking" },
  { id: "tracking_unavailable", label: "Tracking Unavailable", group: "tracking" },
  { id: "processing", label: "Processing", group: "tracking" },
  { id: "shipped", label: "Shipped", group: "tracking" },
  { id: "delivered", label: "Delivered (Normal)", group: "tracking" },
  { id: "loading", label: "Loading (Skeleton)", group: "ui" },
  { id: "error", label: "Error State", group: "ui" },
  { id: "empty", label: "Empty / Missing", group: "ui" },
];

const WIDTHS = [
  { label: "360px", value: "360px", desc: "Galaxy S8 / SE" },
  { label: "375px", value: "375px", desc: "iPhone Mini" },
  { label: "390px", value: "390px", desc: "iPhone 14/15" },
  { label: "414px", value: "414px", desc: "iPhone Plus" },
  { label: "430px", value: "430px", desc: "15 Pro Max" },
  { label: "Fluid", value: "100%", desc: "Full Responsive" },
];

export const DevStateSwitcher: React.FC<DevStateSwitcherProps> = ({
  currentState,
  onStateChange,
  currentWidth,
  onWidthChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      aria-label="Development Preview Controls"
      className="fixed bottom-3 right-3 z-50 max-w-[95vw] sm:max-w-md"
    >
      {/* Minimized Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-slate-900/90 text-white px-3.5 py-2 text-xs font-semibold shadow-floating backdrop-blur-md hover:bg-slate-900 active:scale-95 transition-all border border-slate-700/50"
        >
          <Sliders className="h-3.5 w-3.5 text-blue-400" />
          <span>Demo Controls:</span>
          <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-blue-300 font-mono text-[10px]">
            {currentState}
          </span>
          <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
        </button>
      )}

      {/* Expanded Controls Panel */}
      {isOpen && (
        <div className="rounded-2xl border border-slate-700/80 bg-slate-900/95 p-4 text-white shadow-floating backdrop-blur-md animate-fade-in w-[350px] sm:w-[390px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Preview State & Viewport
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {/* Viewport Width Selector */}
          <div className="mt-3">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mb-2">
              <Smartphone className="h-3.5 w-3.5" />
              <span>Simulate Mobile Viewport Width:</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {WIDTHS.map((w) => (
                <button
                  key={w.value}
                  type="button"
                  onClick={() => onWidthChange(w.value)}
                  className={`flex flex-col items-center justify-center rounded-lg py-1.5 px-2 text-[11px] font-medium transition-all ${
                    currentWidth === w.value
                      ? "bg-blue-600 text-white font-bold shadow-xs"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span>{w.label}</span>
                  <span className="text-[9px] opacity-70">{w.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tracking States */}
          <div className="mt-3 pt-3 border-t border-slate-800">
            <span className="block text-[11px] font-semibold text-slate-400 mb-2">
              Order Tracking Scenarios:
            </span>
            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1 no-scrollbar">
              {STATES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onStateChange(s.id)}
                  className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-left transition-all ${
                    currentState === s.id
                      ? "bg-blue-600 text-white font-semibold"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="truncate">{s.label}</span>
                  {currentState === s.id && (
                    <Check className="h-3.5 w-3.5 flex-shrink-0 ml-1 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-800 text-[10px] text-slate-400 text-center">
            State-driven architecture • All flows share unified components
          </div>
        </div>
      )}
    </aside>
  );
};
