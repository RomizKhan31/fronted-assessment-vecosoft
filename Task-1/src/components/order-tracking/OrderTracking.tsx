"use client";

import React, { useState } from "react";
import { OrderTrackingState, ViewState, Order } from "@/types/order";
import { mockOrders } from "@/data/mockOrders";
import { TrackingHeader } from "./TrackingHeader";
import { StatusHero } from "./StatusHero";
import { DeliveryEstimate } from "./DeliveryEstimate";
import { TrackingTimeline } from "./TrackingTimeline";
import { ProductSummary } from "./ProductSummary";
import { SupportActions } from "./SupportActions";
import { OrderDetailsDrawer } from "./OrderDetailsDrawer";
import { ReportIssueModal } from "./ReportIssueModal";
import { ContactSupportModal } from "./ContactSupportModal";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";
import { DevStateSwitcher } from "./DevStateSwitcher";

interface OrderTrackingProps {
  initialState?: OrderTrackingState;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({
  initialState = "out_for_delivery",
}) => {
  // View and State Management
  const [viewState, setViewState] = useState<ViewState>(initialState);
  const [viewportWidth, setViewportWidth] = useState<string>("100%");

  // Modal Dialogs
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Active Order based on current state
  const currentOrder: Order | undefined =
    viewState === "loading" || viewState === "error" || viewState === "empty"
      ? undefined
      : mockOrders[viewState as OrderTrackingState] || mockOrders.out_for_delivery;

  // Handlers
  const handleBack = () => {
    alert("Navigating back to order history...");
  };

  const handleRetry = () => {
    setViewState("loading");
    setTimeout(() => {
      setViewState("out_for_delivery");
    }, 700);
  };

  const handleViewOrders = () => {
    setViewState("out_for_delivery");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start py-0 sm:py-6 selection:bg-blue-100 selection:text-blue-900">
      {/* Responsive Viewport Wrapper */}
      <div
        style={{
          width: viewportWidth === "100%" ? "100%" : viewportWidth,
          maxWidth: viewportWidth === "100%" ? "32rem" : viewportWidth,
        }}
        className="w-full bg-slate-50 min-h-screen sm:min-h-0 sm:rounded-3xl sm:shadow-card sm:border sm:border-slate-200/80 overflow-hidden flex flex-col transition-all duration-300"
      >
        {/* Render UI state conditionally */}
        {viewState === "loading" && <LoadingState />}

        {viewState === "error" && (
          <ErrorState
            onRetry={handleRetry}
            onBack={handleBack}
            onContactSupport={() => setIsSupportOpen(true)}
          />
        )}

        {viewState === "empty" && (
          <EmptyState
            onViewOrders={handleViewOrders}
            onContactSupport={() => setIsSupportOpen(true)}
            onBack={handleBack}
          />
        )}

        {currentOrder && (
          <>
            {/* Header */}
            <TrackingHeader
              orderNumber={currentOrder.orderNumber}
              onBack={handleBack}
              onOpenDetails={() => setIsDetailsOpen(true)}
            />

            {/* Main Scrollable Content */}
            <main className="flex-1 p-3.5 sm:p-5 space-y-4 pb-20 sm:pb-8">
              {/* 1. Status Hero Banner */}
              <StatusHero
                state={currentOrder.state}
                estimate={currentOrder.estimatedDelivery}
                onReportIssue={() => setIsReportOpen(true)}
                onContactSupport={() => setIsSupportOpen(true)}
                onViewDetails={() => setIsDetailsOpen(true)}
              />

              {/* 2. Delivery & Carrier Details */}
              <DeliveryEstimate
                estimate={currentOrder.estimatedDelivery}
                carrier={currentOrder.carrier}
                shippingAddress={currentOrder.shippingAddress}
                onOpenDetails={() => setIsDetailsOpen(true)}
              />

              {/* 3. Tracking Timeline */}
              <TrackingTimeline steps={currentOrder.timeline} />

              {/* 4. Product Summary */}
              <ProductSummary
                items={currentOrder.items}
                orderNumber={currentOrder.orderNumber}
                onOpenDetails={() => setIsDetailsOpen(true)}
              />

              {/* 5. Support & Assistance Actions */}
              <SupportActions
                state={currentOrder.state}
                onContactSupport={() => setIsSupportOpen(true)}
                onReportIssue={() => setIsReportOpen(true)}
              />
            </main>

            {/* Full Order & Invoice Details Drawer */}
            <OrderDetailsDrawer
              isOpen={isDetailsOpen}
              onClose={() => setIsDetailsOpen(false)}
              order={currentOrder}
            />

            {/* Contact Support Dialog */}
            <ContactSupportModal
              isOpen={isSupportOpen}
              onClose={() => setIsSupportOpen(false)}
              order={currentOrder}
            />

            {/* Report Delivery Issue Dialog */}
            <ReportIssueModal
              isOpen={isReportOpen}
              onClose={() => setIsReportOpen(false)}
              orderNumber={currentOrder.orderNumber}
              carrierName={currentOrder.carrier.name}
              initialCategory={
                currentOrder.state === "delivered_not_received"
                  ? "not_received"
                  : currentOrder.state === "delayed"
                  ? "delayed_exception"
                  : "not_received"
              }
              onContactSupport={() => {
                setIsReportOpen(false);
                setIsSupportOpen(true);
              }}
            />
          </>
        )}
      </div>

      {/* Floating State & Device Preview Controls for Developer/Reviewer */}
      <DevStateSwitcher
        currentState={viewState}
        onStateChange={(state) => setViewState(state)}
        currentWidth={viewportWidth}
        onWidthChange={(w) => setViewportWidth(w)}
      />
    </div>
  );
};
