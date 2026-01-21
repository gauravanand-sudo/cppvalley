"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const sp = useSearchParams();
  const scope = sp.get("scope") || "track";       // "track" | "site"
  const trackSlug = sp.get("track") || "";
  const plan = (sp.get("plan") || "monthly") as "monthly" | "yearly";

  const title = useMemo(() => {
    if (scope === "site") return `cppvalley Premium (${plan})`;
    return `Track: ${trackSlug} (${plan})`;
  }, [scope, trackSlug, plan]);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function startPayment() {
    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/razorpay/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope, trackSlug, plan }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "failed");

      const options = {
        key: data.keyId,
        subscription_id: data.subscriptionId,
        name: "cppvalley",
        description: title,
        theme: { color: "#22d3ee" },
        handler: function () {
          // Payment confirmation comes via webhook (source of truth)
          window.location.href = "/pricing?paid=1";
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e: any) {
      setErr(e?.message || "Payment init failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // auto-start (optional)
    startPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="mt-2 text-white/70 font-mono text-sm">{title}</p>

      {err && <p className="mt-4 text-sm text-red-300">{err}</p>}

      <button
        onClick={startPayment}
        disabled={loading}
        className="mt-6 rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-black hover:bg-cyan-400 disabled:opacity-60"
      >
        {loading ? "Starting…" : "Pay with Razorpay"}
      </button>

      <p className="mt-4 text-xs text-white/50">
        Note: unlocking happens via webhook (may take a few seconds).
      </p>
    </div>
  );
}

