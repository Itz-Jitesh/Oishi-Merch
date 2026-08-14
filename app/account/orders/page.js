"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Package, Calendar, MapPin, CreditCard, ShoppingBag, ArrowRight } from "lucide-react";

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/account/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data.orders || []);
      } catch (error) {
        toast.error(error.message || "Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "failed":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Order History</h2>
        {[1, 2].map((i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 animate-pulse space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-6 w-32 bg-muted rounded"></div>
              <div className="h-6 w-20 bg-muted rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-48 bg-muted rounded"></div>
              <div className="h-4 w-full bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Order History</h2>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-12 text-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium text-lg">No orders yet</h3>
            <p className="text-sm text-muted-foreground mt-1">
              You haven&apos;t placed any orders yet. Visit our shop to browse our merchandise!
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/95"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-display text-2xl font-semibold">Order History</h2>
        <span className="text-sm text-muted-foreground">{orders.length} {orders.length === 1 ? "order" : "orders"}</span>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="rounded-2xl border border-border bg-card overflow-hidden">
            {/* Header info */}
            <div className="border-b border-border bg-muted/20 p-5 flex flex-wrap justify-between items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted-foreground">Order ID: {order._id}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Placed on {formatDate(order.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus?.charAt(0).toUpperCase() + order.paymentStatus?.slice(1)}
                </span>
                <span className="font-display text-lg font-bold text-foreground">
                  ₹{order.totalAmount?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Content (Items & Shipping) */}
            <div className="p-5 space-y-4">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Items</p>
                <div className="divide-y divide-border">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between py-2 text-sm first:pt-0 last:pb-0">
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity} · Size: {item.size}
                        </p>
                      </div>
                      <p className="font-medium text-foreground">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-3 border-t border-border/60">
                {order.shippingAddress && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Shipping Address
                    </p>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p className="font-medium text-foreground">{order.shippingAddress.fullName}</p>
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city} - {order.shippingAddress.postalCode}</p>
                      <p>Phone: {order.shippingAddress.phone}</p>
                    </div>
                  </div>
                )}
                <div className="flex flex-col justify-between items-start md:items-end gap-3 self-end">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>Razorpay Paid</span>
                  </div>
                  <Link
                    href={`/orders/${order._id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    View invoice/receipt <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
