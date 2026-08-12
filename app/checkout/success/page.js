import OrderSuccessClient from "../../../components/OrderSuccessClient";

export const metadata = {
  title: "Order Placed — Oishi Merch",
  description:
    "Your order has been placed successfully. Thank you for shopping with Oishi Merch.",
  openGraph: {
    title: "Order Placed — Oishi Merch",
    description:
      "Your order has been placed successfully. Thank you for shopping with Oishi Merch.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export default function OrderSuccessPage() {
  return <OrderSuccessClient />;
}
