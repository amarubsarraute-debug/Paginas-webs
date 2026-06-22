import type { Metadata } from "next";
import OrderPage from "@/components/order/OrderPage";

export const metadata: Metadata = {
  title: "Pago pendiente | Maggie's",
  robots: { index: false, follow: false },
};

export default async function CheckoutPendingPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}) {
  const { order_id } = await searchParams;
  return (
    <OrderPage
      orderId={order_id}
      banner={{
        tone: "yellow",
        title: "Pago en proceso",
        text: "Tu pago quedó pendiente de acreditación. Te confirmamos en cuanto Mercado Pago lo procese.",
      }}
    />
  );
}
