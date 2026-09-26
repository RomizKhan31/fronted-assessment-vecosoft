"use client";

import React, { useState } from "react";
import {
  X,
  MessageSquare,
  Phone,
  Mail,
  ChevronRight,
  Clock,
  Sparkles,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { Order } from "@/types/order";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

export const ContactSupportModal: React.FC<ContactSupportModalProps> = ({
  isOpen,
  onClose,
  order,
}) => {
  const [activeTab, setActiveTab] = useState<"options" | "chat">("options");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "bot" | "user"; text: string; time: string }>>([
    {
      sender: "bot",
      text: `Hello ${order.shippingAddress.recipientName.split(" ")[0]}! I see you are tracking order #${order.orderNumber}. How can I assist you with your delivery today?`,
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg, time: "Just now" },
    ]);
    setInputText("");

    // Simulate smart bot response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Thanks for the details. Our logistics coordinator has flagged Order #${order.orderNumber} for priority tracking with ${order.carrier.name}. An update will be posted to your timeline shortly.`,
          time: "Just now",
        },
      ]);
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-support-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-lg rounded-t-2xl sm:rounded-2xl bg-white shadow-floating max-h-[90vh] overflow-y-auto no-scrollbar border border-slate-200">
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="contact-support-modal-title"
                className="text-base font-bold text-slate-900"
              >
                Customer Support
              </h2>
              <p className="text-xs text-slate-500">
                Order #{order.orderNumber} • {order.carrier.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 active:scale-95 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5">
          {activeTab === "options" ? (
            <div className="space-y-4">
              {/* Option 1: Live Chat */}
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className="flex w-full items-center justify-between rounded-xl border border-blue-200 bg-blue-50/50 p-3.5 hover:bg-blue-50 active:scale-[0.99] transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        Live Delivery Support Chat
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Online
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Chat directly with our logistics team. Typical wait time &lt; 2 mins.
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
              </button>

              {/* Option 2: Direct Carrier Line */}
              <a
                href={`tel:${order.carrier.phone || "+8809610001234"}`}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3.5 hover:bg-slate-50 active:scale-[0.99] transition-all text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">
                      Call Carrier Hotline ({order.carrier.name})
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {order.carrier.phone || "+880 9610-001234"} • Sat-Thu 9am-8pm
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
              </a>

              {/* Option 3: Email Ticket */}
              <div className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3.5 bg-white text-left">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">
                      Email Inquiry
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5">
                      support@aurastore.com.bd • Guaranteed reply within 4 hours
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Email ticket generated for Order #${order.orderNumber}`)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Send
                </button>
              </div>

              {/* Frequently Asked Questions */}
              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    <p className="font-semibold text-slate-900">
                      Can I change my delivery address right now?
                    </p>
                    <p className="mt-1 text-slate-600">
                      If the package is already marked &apos;Out for Delivery&apos;, address changes cannot be processed online. Contact our chat agent immediately for reroute assistance.
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    <p className="font-semibold text-slate-900">
                      What if no one is home to sign?
                    </p>
                    <p className="mt-1 text-slate-600">
                      Our carrier will follow your porch delivery notes or place it in a weather-protected spot. If a signature is strictly required, a re-delivery notice will be left.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Live chat tab */
            <div className="flex flex-col h-[380px]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => setActiveTab("options")}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  ← Back to Support Options
                </button>
                <span>Live Session #4829</span>
              </div>

              {/* Message scroll list */}
              <div className="flex-1 space-y-3 overflow-y-auto p-1 text-xs">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-2xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-xs"
                          : "bg-slate-100 text-slate-900 rounded-bl-xs"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="mt-2 pt-2 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
