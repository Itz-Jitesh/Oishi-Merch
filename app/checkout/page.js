"use client";

import { useState, useEffect } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



function Field({ label, ...rest }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <Input
        {...rest}
        className="placeholder:text-muted-foreground/40"
      />
    </label>
  );
}

export default function CheckoutPage() {

  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart");

        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await response.json();

        console.log("CART API RESPONSE:", data);

        const cartItems = data.items ?? data.cart?.items ?? [];

        setItems(cartItems);

      } catch (error) {
        console.error("FAILED TO FETCH CART:", error);
      }
    };

    fetchCart();
  }, []);

  const handleProceedToPayment = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const shippingAddress = {
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      street: formData.get("street"),
      city: formData.get("city"),
      postalCode: formData.get("postalCode"),
    };

    try {
      const response = await fetch("/api/payment/create-order", {
        method: "POST"
      });

      if (!response.ok) {
        throw new Error("Failed to create payment order");
      }

      const data = await response.json();

      if (!window.Razorpay) {
        throw new Error("Razorpay Checkout has not loaded yet");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Oishi Merch",
        description: "Order payment",
        order_id: data.orderId,

        handler: async function (paymentResponse) {
          console.log("RAZORPAY PAYMENT RESPONSE:", paymentResponse);
          try {
            const response = await fetch("/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(paymentResponse),
            });
            const data = await response.json();
            if (!response.ok) {
              throw new Error(data.error || "Payment verification failed");



            }
            console.log("PAYMENT VERIFIED:", data);
            const successResponse = await fetch("/api/payment/success", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...paymentResponse,
                shippingAddress,
              }),
            });

            const successData = await successResponse.json();

            if (!successResponse.ok) {
              throw new Error(
                successData.message || "Failed to create order"

              );
            }

            console.log("ORDER CREATED:", successData);

            router.push("/checkout/success");


          } catch (error) {
            console.error("PAYMENT VERIFICATION ERROR:", error);
          }
        },
        modal: {
          ondismiss: function () {
          toast.error("Payment process was cancelled. Please try again."); 
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error("PAYMENT ERROR:", error);
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <PageShell title="Checkout" subtitle="Review your order, then add where we should ship it." wide>
        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          {/* Shipping address */}
          <form onSubmit={handleProceedToPayment} className="space-y-6">
            <section className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="font-display text-xl text-foreground">Shipping address</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Saved addresses aren't available yet — please enter your details for this order.
              </p>
              <div className="my-5 border-t border-border" />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full name" name="fullName" placeholder="Ada Lovelace" autoComplete="name" required />
                <Field label="Phone" name="phone" placeholder="+91 98765 43210" autoComplete="tel" required />
                <div className="md:col-span-2">
                  <Field label="Street" name="street" placeholder="123 Sakura Ave, Apt 4B" autoComplete="street-address" required />
                </div>
                <Field label="City" name="city" placeholder="Kyoto" autoComplete="address-level2" required />
                <Field label="Postal code" name="postalCode" placeholder="600-0000" autoComplete="postal-code" required />
              </div>

              <Button type="submit" className="mt-6 w-full rounded-full py-6 text-base">
                Proceed to payment
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" /> You'll pay securely on the next step — nothing is charged yet.
              </p>
            </section>
          </form>

          {/* Order summary */}
          <aside>
            <div className="sticky top-28 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="font-display text-xl text-foreground">Your order</h2>
              <div className="my-5 border-t border-border" />

              <ul className="space-y-4">
                {items.map((i) => (
                  <li key={i.id} className="flex items-center gap-3">
                    <div
                      className="h-14 w-14 shrink-0 rounded-xl border border-border"
                      style={{ background: `linear-gradient(135deg, ${i.color}, var(--background))` }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{i.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Size {i.size} · Qty {i.qty}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      ₹{(i.price * i.qty).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="my-5 border-t border-border" />

              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="text-foreground">₹{subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="text-foreground">₹{shipping === 0 ? "Free" : shipping.toFixed(2)}</dd>
                </div>

              </dl>

              <div className="my-5 border-t border-border" />

              <div className="flex items-baseline justify-between">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-display text-2xl text-primary">₹{total.toFixed(2)}</span>
              </div>

              <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-secondary-foreground" /> Free returns within 30 days
              </p>
            </div>
          </aside>
        </div>

      </PageShell>
    </>
  );
}
