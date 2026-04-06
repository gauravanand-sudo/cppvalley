import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getTrackBySlug } from "@/lib/content";

function getBearerToken(req: Request) {
  const authHeader = req.headers.get("authorization") || "";
  if (!authHeader.startsWith("Bearer ")) return null;
  return authHeader.slice("Bearer ".length).trim() || null;
}

async function getAuthenticatedUser(req: Request) {
  const token = getBearerToken(req);
  if (!token) return null;

  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error) {
    console.error("Error verifying Supabase token for payment:", error);
    return null;
  }

  return user;
}

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json(
        { error: "Please login before starting payment." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const trackSlug = typeof body?.trackSlug === "string" ? body.trackSlug : "";

    if (!trackSlug) {
      return NextResponse.json({ error: "Course slug is required." }, { status: 400 });
    }

    const track = getTrackBySlug(trackSlug);
    if (!track?.meta) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    if (track.meta.live === false) {
      return NextResponse.json({ error: "This course is not live yet." }, { status: 400 });
    }

    const amount = typeof track.meta.price === "number" ? track.meta.price : 0;
    if (amount <= 0) {
      return NextResponse.json(
        { error: "This course does not require purchase." },
        { status: 400 }
      );
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

    const receipt = `track_${trackSlug}_${Date.now()}`.slice(0, 40);

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt,
      notes: {
        userId: user.id,
        scope: "track",
        trackSlug,
        trackTitle: track.meta.title,
      },
    });

    return NextResponse.json({
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      trackTitle: track.meta.title,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Unable to start Razorpay checkout right now." },
      { status: 500 }
    );
  }
}
