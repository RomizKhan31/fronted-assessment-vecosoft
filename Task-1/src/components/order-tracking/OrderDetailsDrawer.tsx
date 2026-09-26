"use client";

import React, { useState } from "react";
import {
  X,
  CreditCard,
  MapPin,
  Truck,
  Copy,
  Check,
  Package,
  Receipt,
  Download,
} from "lucide-react";
import { Order } from "@/types/order";
import { formatCurrency } from "@/lib/utils";

interface OrderDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

export const OrderDetailsDrawer: React.FC<OrderDetailsDrawerProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    if (!order.carrier.trackingNumber) return;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(order.carrier.trackingNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-details-drawer-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-lg rounded-t-2xl sm:rounded-2xl bg-white shadow-floating max-h-[90vh] overflow-y-auto no-scrollbar border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Receipt className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="order-details-drawer-title"
                className="text-base font-bold text-slate-900"
              >
                Order & Receipt Details
              </h2>
              <p className="text-xs text-slate-500">
                Order #{order.orderNumber} • Placed {order.placedDate}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 active:scale-95 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 text-xs text-slate-700">
          {/* Items breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Purchased Items
            </h3>
            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50/40 overflow-hidden">
              {order.items.map((item) => (
                <div key={item.id} className="p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600">
                      <Package className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Qty {item.quantity} {item.variant ? `• ${item.variant}` : ""}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 flex-shrink-0">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Payment Breakdown
            </h3>
            <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50/40 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium text-slate-800">
                  {formatCurrency(order.payment.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Shipping</span>
                <span className="font-medium text-emerald-700">
                  {order.payment.shipping === 0 ? "FREE" : formatCurrency(order.payment.shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Tax</span>
                <span className="font-medium text-slate-800">
                  {formatCurrency(order.payment.tax)}
                </span>
              </div>
              {order.payment.discount && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promotional Discount</span>
                  <span className="font-medium">-{formatCurrency(order.payment.discount)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Paid</span>
                <span>{formatCurrency(order.payment.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping destination */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Shipping Destination
            </h3>
            <div className="rounded-xl border border-slate-200 p-3 bg-white flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-900">
                  {order.shippingAddress.recipientName}
                </p>
                <p className="text-slate-600">
                  {order.shippingAddress.street}
                  {order.shippingAddress.apartment ? `, ${order.shippingAddress.apartment}` : ""}
                </p>
                <p className="text-slate-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                {order.shippingAddress.deliveryInstructions && (
                  <p className="mt-1.5 text-[11px] text-amber-800 font-medium">
                    Instructions: &quot;{order.shippingAddress.deliveryInstructions}&quot;
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Payment Method
            </h3>
            <div className="rounded-xl border border-slate-200 p-3 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CreditCard className="h-4 w-4 text-slate-500" />
                <span className="font-medium text-slate-800">
                  {order.payment.method}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Paid
              </span>
            </div>
          </div>

          {/* Carrier & Tracking */}
          {order.carrier.trackingNumber && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Carrier & Waybill
              </h3>
              <div className="rounded-xl border border-slate-200 p-3 bg-white flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">
                    {order.carrier.name} ({order.carrier.service})
                  </p>
                  <p className="font-mono text-xs text-slate-500 mt-0.5">
                    {order.carrier.trackingNumber}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          )}

          {/* Download invoice button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => alert("Downloading PDF Invoice...")}
              className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.99] transition-all"
            >
              <Download className="h-4 w-4 text-slate-500" />
              <span>Download PDF Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
