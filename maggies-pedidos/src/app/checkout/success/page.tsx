import type { Metadata } from "next";
import OrderPage from "@/components/order/OrderPage";

export const metadata: Metadata = {
  title: "Pago confirmado | Maggie's",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}) {
  const { order_id } = await searchParams;
  return (
    <OrderPage
      orderId={order_id}
      banner={{
        tone: "green",
        title: "¡Pago recibido!",
        text: "Estamos confirmando el pago. En cuanto se acredite, el local prepara tu pedido.",
      }}
    />
  );
}
