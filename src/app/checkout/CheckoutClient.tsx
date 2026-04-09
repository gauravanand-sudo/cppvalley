"use client";

import Link from "next/link";
import Script from "next/script";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CppvalleyLoading from "@/components/CppvalleyLoading";
import GoogleAdSlot from "@/components/GoogleAdSlot";
import { isPublicTrackSlug } from "@/lib/publicContent";

const CHECKOUT_AD_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT_CHECKOUT;

declare global {
  interface Window {
    Razorpay: new (options: {
      key: string;
      order_id: string;
      name: string;
      description: string;
      amount: number;
      currency: string;
      theme: { color: string };
      handler: (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => void;
    }) => { open: () => void };
  }
}

export default function CheckoutPage() {
  const sp = useSearchParams();
  const trackSlug = sp.get("track") || "";
  const validTrackSlug = isPublicTrackSlug(trackSlug) ? trackSlug : "";

  const title = useMemo(
    () => `Course: ${validTrackSlug || "Unavailable"}`,
    [validTrackSlug]
  );

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [paid, setPaid] = useState(false);
  const [verifying, setVerifying] = useState(false);

  async function startPayment() {
    setErr(null);
    setReady(false);
    setErr("Course payments are launching on May 1, 2026.");
  }

  if (verifying || paid) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#592332,_#33161f_42%,_#160f13_100%)] text-[#f7eef1]">
        <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-12">
          <div className="w-full rounded-[2rem] border border-[#ffffff1f] bg-[#ffffff0b] p-10 shadow-[0_30px_90px_rgba(18,8,12,0.42)] backdrop-blur">
            <CppvalleyLoading
              tone="dark"
              label="cppvalley loading"
              caption={
                paid
                  ? "Unlocking your course and sending you to your reader."
                  : "Payment received. Verifying securely with cppvalley."
              }
              className="min-h-[280px]"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-glide min-h-screen bg-[radial-gradient(circle_at_top,_#fcf4f6,_#f5f0f1_45%,_#ede7e8_100%)] text-[#2f2327]">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <section className="rounded-[2rem] border border-[#e5d7db] bg-white/80 p-8 shadow-[0_25px_70px_rgba(91,31,47,0.08)] backdrop-blur">
            <div className="mb-6 inline-flex rounded-full border border-[#ead2da] bg-[#fcf5f7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9B1C3A]">
              Secure checkout
            </div>
            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-[#4A1F2C]">
              Course checkout opens on May 1.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#6f555c]">
              {trackSlug
                ? validTrackSlug
                  ? `You selected "${validTrackSlug}". Payments are not live yet. Click below to see the launch notice for May 1, 2026.`
                  : "That course is not publicly available."
                : "Choose a valid course to continue to secure payment."}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#ead2da] bg-[#fcf7f8] p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B1C3A]">Step 1</div>
                <div className="mt-2 text-sm font-semibold text-[#4A1F2C]">Review course</div>
                <div className="mt-1 text-sm text-[#6f555c]">You land directly on checkout for the course you selected.</div>
              </div>
              <div className="rounded-2xl border border-[#ead2da] bg-[#fcf7f8] p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B1C3A]">Step 2</div>
                <div className="mt-2 text-sm font-semibold text-[#4A1F2C]">Launch notice</div>
                <div className="mt-1 text-sm text-[#6f555c]">Click the button to see the launch date instead of entering payment right now.</div>
              </div>
              <div className="rounded-2xl border border-[#ead2da] bg-[#fcf7f8] p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B1C3A]">Step 3</div>
                <div className="mt-2 text-sm font-semibold text-[#4A1F2C]">Come back at launch</div>
                <div className="mt-1 text-sm text-[#6f555c]">Full checkout and unlock flow will go live on May 1, 2026.</div>
              </div>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-[#d8c2c8] bg-[#4A1F2C] p-8 text-[#f7eef1] shadow-[0_25px_70px_rgba(91,31,47,0.16)]">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#dcbec7]">cppvalley payment</div>
            <h2 className="mt-3 text-2xl font-bold">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#e6d8dd]">
              Checkout is currently paused. We are opening payments for these courses on May 1, 2026.
            </p>

            <div className="mt-8 rounded-2xl bg-white/8 p-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#dcbec7]">After payment</div>
              <ul className="mt-3 space-y-2 text-sm text-[#f5eaee]">
                <li>Checkout opens on May 1, 2026.</li>
                <li>Your course access will unlock after successful verification.</li>
                <li>Your purchase will appear in your profile once payments go live.</li>
              </ul>
            </div>

            <GoogleAdSlot
              slot={CHECKOUT_AD_SLOT}
              className="mt-6"
              label="Sponsored"
            />

            {err ? (
              <div className="mt-6 rounded-2xl border border-[#d08da0] bg-[#ffffff14] p-4 text-sm text-[#ffe4ea]">
                {err}
              </div>
            ) : null}

            {err?.toLowerCase().includes("login") ? (
              <Link
                href="/"
                className="mt-4 inline-flex text-sm font-medium text-[#ffd7e1] underline underline-offset-4"
              >
                Go back and login first
              </Link>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={startPayment}
                disabled={loading || !validTrackSlug}
                className="rounded-xl bg-[#f7eef1] px-5 py-3 text-sm font-semibold text-[#4A1F2C] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                See launch date
              </button>
              <Link
                href={validTrackSlug ? `/learn/tracks/${validTrackSlug}` : "/learn/tracks"}
                className="rounded-xl border border-[#ffffff2b] px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                Back
              </Link>
            </div>

            <div className="mt-6 text-xs font-mono text-[#dcbec7]">
              Payments are signature-verified server-side before access is granted.
            </div>
            <div className="mt-2 text-xs font-mono text-[#cdaab4]">
              {ready ? "Checkout is ready." : "Payments are opening on May 1, 2026."}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
