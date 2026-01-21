import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";

function verifySignature(rawBody: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return expected === signature;
}

export async function POST(req: Request) {
  const signature = req.headers.get("x-razorpay-signature") || "";
  const rawBody = await req.text();

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const ev = event?.event;

  // We primarily care about activation/charge events
  if (!ev?.startsWith("subscription.")) {
    return NextResponse.json({ ok: true });
  }

  const sub = event?.payload?.subscription?.entity;
  const notes = sub?.notes || {};
  const userId = notes.userId as string | undefined;
  const scope = notes.scope as string | undefined; // "track" | "site"
  const trackSlug = (notes.trackSlug as string | undefined) || null;
  const plan = (notes.plan as string | undefined) || "monthly";

  if (!userId || !scope) return NextResponse.json({ ok: true });

  const status = sub?.status; // "active", "authenticated", "created", "cancelled" etc.

  const supabase = await createClient();

  if (status === "active") {
    // Upsert entitlement
    const { error } = await supabase
      .from("entitlements")
      .upsert({
        user_id: userId,
        scope,
        track_slug: scope === "track" ? trackSlug : null,
        plan,
        status: "active",
        razorpay_subscription_id: sub.id,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,scope,track_slug'
      });

    if (error) {
      console.error("Error updating entitlement:", error);
    }

    // Also record purchase
    if (sub.plan?.item?.amount) {
      await supabase.from("purchases").insert({
        user_id: userId,
        track_slug: scope === "track" ? trackSlug : null,
        track_title: notes.trackTitle || null,
        amount: sub.plan.item.amount,
        currency: "INR",
        status: "completed",
        subscription_id: sub.id,
      });
    }
  }

  if (status === "cancelled") {
    await supabase
      .from("entitlements")
      .update({ status: "canceled", updated_at: new Date().toISOString() })
      .eq("razorpay_subscription_id", sub.id);
  }

  return NextResponse.json({ ok: true });
}