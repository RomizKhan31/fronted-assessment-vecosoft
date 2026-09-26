export type OrderTrackingState =
  | "tracking_unavailable"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delayed"
  | "delivered"
  | "delivered_not_received";

export type ViewState = OrderTrackingState | "loading" | "error" | "empty";

export type StepStatus = "completed" | "current" | "upcoming" | "delayed";

export interface TimelineStep {
  id: string;
  title: string;
  subtitle?: string;
  status: StepStatus;
  date?: string;
  time?: string;
  location?: string;
  details?: string;
  isImportant?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  brand?: string;
  variant?: string;
  quantity: number;
  price: number;
  imageUrl?: string;
  color?: string;
}

export interface CarrierInfo {
  name: string;
  service: string;
  trackingNumber?: string;
  trackingUrl?: string;
  phone?: string;
}

export interface ShippingAddress {
  recipientName: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  deliveryInstructions?: string;
}

export interface PaymentSummary {
  method: string;
  cardBrand?: string;
  last4?: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount?: number;
  total: number;
}

export interface DeliveryEstimate {
  headline: string;
  window: string;
  dateLabel?: string;
  statusBadge: string;
  badgeVariant: "success" | "warning" | "neutral" | "info" | "danger";
  contextNote?: string;
  updatedEstimate?: string;
}

export interface DeliveryIssueGuidance {
  title: string;
  explanation: string;
  checklist?: string[];
  primaryActionLabel: string;
  secondaryActionLabel?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  placedDate: string;
  state: OrderTrackingState;
  estimatedDelivery: DeliveryEstimate;
  items: ProductItem[];
  carrier: CarrierInfo;
  shippingAddress: ShippingAddress;
  payment: PaymentSummary;
  timeline: TimelineStep[];
  issueGuidance?: DeliveryIssueGuidance;
}
