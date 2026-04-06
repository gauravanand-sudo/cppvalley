import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { createClient as createSupabaseAuthClient } from "@supabase/supabase-js";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import { getTrackBySlug } from "@/lib/content";

function getBearerToken(req: Request) {
  const authHeader = req.headers.get("authorization") || "";
  if (!authHeader.startsWith("Bearer ")) return null;
  return authHeader.slice("Bearer ".length).trim() || null;
}

async function getAuthenticatedUser(req: Request) {
  const token = getBearerToken(req);
  if (!token) return null;

  const supabase = createSupabaseAuthClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error) {
    console.error("Error verifying Supabase token during payment confirmation:", error);
    return null;
  }

  return user;
}

function verifyPaymentSignature(orderId: string, paymentId: string, signature: string) {
  const secret = process.env.RAZORPAY_KEY_SECRET!;
  const payload = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const signatureBuffer = Buffer.from(signature, "utf8");

  if (expectedBuffer.length !== signatureBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "Please login before verifying payment." }, { status: 401 });
    }

    const body = await req.json();
    const orderId = typeof body?.razorpay_order_id === "string" ? body.razorpay_order_id : "";
    const paymentId = typeof body?.razorpay_payment_id === "string" ? body.razorpay_payment_id : "";
    const signature = typeof body?.razorpay_signature === "string" ? body.razorpay_signature : "";
    const trackSlug = typeof body?.trackSlug === "string" ? body.trackSlug : "";

    if (!orderId || !paymentId || !signature || !trackSlug) {
      return NextResponse.json({ error: "Incomplete payment verification payload." }, { status: 400 });
    }

    if (!verifyPaymentSignature(orderId, paymentId, signature)) {
      return NextResponse.json({ error: "Invalid payment signature." }, { status: 401 });
    }

    const track = getTrackBySlug(trackSlug);
    if (!track?.meta) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    const amount = typeof track.meta.price === "number" ? track.meta.price : 0;
    if (amount <= 0) {
      return NextResponse.json({ error: "This course does not require purchase." }, { status: 400 });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: "Razorpay credentials are not configured on the server." },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const [order, payment] = await Promise.all([
      razorpay.orders.fetch(orderId),
      razorpay.payments.fetch(paymentId),
    ]);

    const expectedAmount = Math.round(amount * 100);
    const orderNotes = order.notes || {};

    if (order.id !== orderId || payment.order_id !== orderId) {
      return NextResponse.json({ error: "Order mismatch during payment verification." }, { status: 400 });
    }

    if (order.amount !== expectedAmount || payment.amount !== expectedAmount) {
      return NextResponse.json({ error: "Payment amount mismatch." }, { status: 400 });
    }

    if (order.currency !== "INR" || payment.currency !== "INR") {
      return NextResponse.json({ error: "Unsupported payment currency." }, { status: 400 });
    }

    if (orderNotes.userId !== user.id || orderNotes.trackSlug !== trackSlug) {
      return NextResponse.json({ error: "Payment metadata mismatch." }, { status: 400 });
    }

    if (!["authorized", "captured"].includes(payment.status)) {
      return NextResponse.json({ error: "Payment is not in a valid completed state." }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    const { error: entitlementError } = await supabase
      .from("entitlements")
      .upsert(
        {
          user_id: user.id,
          scope: "track",
          track_slug: trackSlug,
          status: "active",
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,scope,track_slug",
        }
      );

    if (entitlementError) {
      console.error("Error granting track entitlement:", entitlementError);
      return NextResponse.json({ error: "Payment verified, but access grant failed." }, { status: 500 });
    }

    const { error: purchaseError } = await supabase.from("purchases").insert({
      user_id: user.id,
      track_slug: trackSlug,
      track_title: track.meta.title,
      amount: Math.round(amount * 100),
      currency: "INR",
      status: "completed",
    });

    if (purchaseError) {
      console.error("Error recording purchase:", purchaseError);
    }

    return NextResponse.json({
      ok: true,
      redirectTo: `/learn/tracks/${trackSlug}`,
    });
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    return NextResponse.json(
      { error: "Unable to verify Razorpay payment right now." },
      { status: 500 }
    );
  }
}
