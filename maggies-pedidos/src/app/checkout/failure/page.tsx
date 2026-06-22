import type { Metadata } from "next";
import OrderPage from "@/components/order/OrderPage";

export const metadata: Metadata = {
  title: "Pago no completado | Maggie's",
  robots: { index: false, follow: false },
};

export default async function CheckoutFailurePage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}) {
  const { order_id } = await searchParams;
  return (
    <OrderPage
      orderId={order_id}
      banner={{
        tone: "red",
        title: "El pago no se completó",
        text: "No se concretó el pago online. Podés reintentar o coordinar otro medio de pago por WhatsApp.",
      }}
    />
  );
}
