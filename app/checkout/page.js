"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressMode, setAddressMode] = useState("manual");
  const [isAuthed, setIsAuthed] = useState(false);
  const [saveToAccount, setSaveToAccount] = useState(false);
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

  useEffect(() => {
    const fetchSavedAddresses = async () => {
      try {
        const response = await fetch("/api/account/addresses/fetch");

        if (response.status === 401) {
          setIsAuthed(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch saved addresses");
        }

        const data = await response.json();
        setIsAuthed(true);
        setSavedAddresses(data.addresses || []);

        const defaultAddress =
          (data.addresses || []).find((a) => a.isDefault) ||
          (data.addresses || [])[0];

        if (defaultAddress) {
          setSelectedAddressId(defaultAddress._id);
        }
      } catch (error) {
        setIsAuthed(false);
      }
    };

    fetchSavedAddresses();
  }, []);

  const switchToSavedMode = () => {
    setAddressMode("saved");
    if (!selectedAddressId && savedAddresses.length > 0) {
      setSelectedAddressId(savedAddresses[0]._id);
    }
  };

  const saveAddressToAccount = async (shippingAddress, state) => {
    try {
      await fetch("/api/account/addresses/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: shippingAddress.fullName,
          phone: shippingAddress.phone,
          addressLine1: shippingAddress.street,
          addressLine2: "",
          city: shippingAddress.city,
          state: state || "",
          postalCode: shippingAddress.postalCode,
          isDefault: false,
        }),
      });
    } catch (error) {
      // Best-effort convenience — never blocks payment.
    }
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    let shippingAddress;

    if (addressMode === "saved" && selectedAddressId) {
      const saved = savedAddresses.find((a) => a._id === selectedAddressId);

      shippingAddress = {
        fullName: saved.name,
        phone: saved.phone,
        street: [saved.addressLine1, saved.addressLine2].filter(Boolean).join(", "),
        city: saved.city,
        postalCode: saved.postalCode,
      };
    } else {
      shippingAddress = {
        fullName: formData.get("fullName"),
        phone: formData.get("phone"),
        street: formData.get("street"),
        city: formData.get("city"),
        postalCode: formData.get("postalCode"),
      };

      if (saveToAccount) {
        saveAddressToAccount(shippingAddress, formData.get("state"));
      }
    }

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

              {isAuthed ? (
                <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-border p-1 sm:flex-row sm:rounded-full">
                  <button
                    type="button"
                    onClick={() => setAddressMode("manual")}
                    className={`w-full rounded-full px-4 py-2.5 text-sm transition sm:w-auto ${addressMode === "manual"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    Add address manually
                  </button>
                  <button
                    type="button"
                    onClick={switchToSavedMode}
                    className={`w-full rounded-full px-4 py-2.5 text-sm transition sm:w-auto ${addressMode === "saved"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    Select a saved address
                  </button>
                </div>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground">
                  Enter your shipping details for this order.
                </p>
              )}

              <div className="my-5 border-t border-border" />

              {addressMode === "saved" && isAuthed ? (
                savedAddresses.length === 0 ? (
                  <div className="rounded-2xl border border-border bg-background p-8 text-center">
                    <p className="text-muted-foreground">
                      You don't have any saved addresses yet.
                    </p>
                    <Link
                      href="/account/addresses"
                      className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground"
                    >
                      Add an address
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedAddresses.map((a) => (
                      <label
                        key={a._id}
                        className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${selectedAddressId === a._id
                          ? "border-primary"
                          : "border-border hover:border-primary/50"
                          }`}
                      >
                        <input
                          type="radio"
                          name="savedAddress"
                          value={a._id}
                          checked={selectedAddressId === a._id}
                          onChange={() => setSelectedAddressId(a._id)}
                          className="mt-1 h-4 w-4 accent-[var(--primary)]"
                        />
                        <div className="min-w-0">
                          <p className="font-medium">
                            {a.name}{" "}
                            {a.isDefault && (
                              <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                Default
                              </span>
                            )}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {a.addressLine1}
                            {a.addressLine2 ? `, ${a.addressLine2}` : ""}, {a.city}, {a.state} {a.postalCode}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{a.phone}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                )
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full name" name="fullName" placeholder="Ada Lovelace" autoComplete="name" required />
                  <Field label="Phone" name="phone" placeholder="+91 98765 43210" autoComplete="tel" required />
                  <div className="md:col-span-2">
                    <Field label="Street" name="street" placeholder="123 Sakura Ave, Apt 4B" autoComplete="street-address" required />
                  </div>
                  <Field label="City" name="city" placeholder="Kyoto" autoComplete="address-level2" required />
                  <Field label="State" name="state" placeholder="Kyoto (optional)" autoComplete="address-level1" />
                  <Field label="Postal code" name="postalCode" placeholder="600-0000" autoComplete="postal-code" required />
                </div>
              )}

              {isAuthed && addressMode === "manual" && (
                <label className="mt-4 flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[var(--primary)]"
                    checked={saveToAccount}
                    onChange={(e) => setSaveToAccount(e.target.checked)}
                  />
                  Save this address to my account
                </label>
              )}

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
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border bg-secondary">
                      {i.images?.[0] ? (
                        <img
                          src={i.images[0]}
                          alt={i.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
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
