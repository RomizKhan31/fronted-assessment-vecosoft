"use client";

import React, { useState } from "react";
import { Copy, Check, MapPin, Truck, ChevronRight } from "lucide-react";
import { CarrierInfo, ShippingAddress, DeliveryEstimate as EstimateType } from "@/types/order";

interface DeliveryEstimateProps {
  estimate: EstimateType;
  carrier: CarrierInfo;
  shippingAddress: ShippingAddress;
  onOpenDetails?: () => void;
}

export const DeliveryEstimate: React.FC<DeliveryEstimateProps> = ({
  estimate,
  carrier,
  shippingAddress,
  onOpenDetails,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyTracking = async () => {
    if (!carrier.trackingNumber) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(carrier.trackingNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      aria-label="Shipping and courier details"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs"
    >
      {/* Carrier & Tracking Number Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <Truck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">Carrier</p>
            <p className="truncate text-sm font-semibold text-slate-900">
              {carrier.name}
            </p>
            <p className="text-[11px] text-slate-500">{carrier.service}</p>
          </div>
        </div>

        {carrier.trackingNumber && (
          <div className="flex items-center justify-between sm:justify-end gap-2 rounded-lg bg-slate-50 px-3 py-2 border border-slate-100">
            <div className="min-w-0">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Tracking ID
              </span>
              <span className="block font-mono text-xs font-medium text-slate-800 truncate max-w-[160px]">
                {carrier.trackingNumber}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyTracking}
              aria-label={copied ? "Tracking number copied" : "Copy tracking number"}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-white border border-slate-200 text-slate-600 hover:text-slate-900 active:scale-95 transition-all shadow-2xs focus-visible:ring-2 focus-visible:ring-blue-600"
              title={copied ? "Copied!" : "Copy Tracking ID"}
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Destination & Delivery Instructions Snippet */}
      <div className="p-4 bg-slate-50/50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900">Delivering to: </span>
              <span>
                {shippingAddress.recipientName}, {shippingAddress.street}
                {shippingAddress.apartment ? `, ${shippingAddress.apartment}` : ""}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
              </span>
              {shippingAddress.deliveryInstructions && (
                <p className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800 border border-amber-200/60">
                  <span>Note: {shippingAddress.deliveryInstructions}</span>
                </p>
              )}
            </div>
          </div>

          {onOpenDetails && (
            <button
              type="button"
              onClick={onOpenDetails}
              aria-label="View full shipping details"
              className="flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 flex-shrink-0 pt-0.5 focus-visible:outline-none"
            >
              <span>Details</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
