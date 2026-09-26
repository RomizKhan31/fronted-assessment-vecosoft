"use client";

import React from "react";
import { Headphones, Package, ChevronRight, FileText } from "lucide-react";
import { ProductItem } from "@/types/order";
import { formatCurrency } from "@/lib/utils";

interface ProductSummaryProps {
  items: ProductItem[];
  orderNumber: string;
  onOpenDetails: () => void;
}

export const ProductSummary: React.FC<ProductSummaryProps> = ({
  items,
  orderNumber,
  onOpenDetails,
}) => {
  const primaryItem = items[0];
  const extraItemsCount = items.length - 1;

  return (
    <section
      aria-labelledby="product-summary-heading"
      className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3
            id="product-summary-heading"
            className="text-sm font-bold text-slate-900 tracking-tight"
          >
            Order Items
          </h3>
          <p className="text-xs text-slate-500">Order #{orderNumber}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Main product display */}
      <div className="mt-3.5 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-xl border border-slate-100 p-2.5 bg-slate-50/40"
          >
            {/* Visual Icon / Mock thumbnail */}
            <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200/80 text-slate-700 shadow-2xs">
              {item.name.toLowerCase().includes("headphone") ? (
                <Headphones className="h-8 w-8 text-slate-700 stroke-[1.75]" />
              ) : (
                <Package className="h-7 w-7 text-slate-600 stroke-[1.75]" />
              )}
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white shadow-xs">
                {item.quantity}
              </span>
            </div>

            {/* Product description & pricing */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
                {item.name}
              </h4>
              {item.variant && (
                <p className="mt-0.5 text-xs text-slate-500 truncate">
                  {item.variant}
                </p>
              )}
              <div className="mt-1.5 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  Qty {item.quantity}
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View full order details trigger */}
      <button
        type="button"
        onClick={onOpenDetails}
        className="mt-3.5 flex min-h-[44px] w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.99] transition-all focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-slate-500" />
          <span>View Invoice & Receipt Breakdown</span>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-400" />
      </button>
    </section>
  );
};
