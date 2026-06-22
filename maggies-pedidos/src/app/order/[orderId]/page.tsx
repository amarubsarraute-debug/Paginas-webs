import type { Metadata } from "next";
import OrderPage from "@/components/order/OrderPage";

export const metadata: Metadata = {
  title: "Estado de tu pedido | Maggie's",
  robots: { index: false, follow: false },
};

export default async function OrderStatusPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return <OrderPage orderId={orderId} />;
}
