import { OrderTracking } from "@/components/order-tracking/OrderTracking";

export default function Home() {
  return (
    <main>
      <OrderTracking initialState="out_for_delivery" />
    </main>
  );
}
