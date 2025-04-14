import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
  typescript: true,
});

export async function POST(req: Request) {
  try {
    const { action, userId, subscription_key } = await req.json();

    if (action === "subscribe") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: process.env.NEXT_PUBLIC_STRIPE_PRICE_HABIT_CREATOR_ID,
            quantity: 1,
          },
        ],
        metadata: {
          userId,
        },
        mode: "subscription",
        success_url: `${process.env.NEXT_PUBLIC_URL}app`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
      });

      return NextResponse.json({ url: session.url });
    }

    if (action === "unsubscribe" && subscription_key) {
      const subscription = await stripe.subscriptions.update(subscription_key, {
        cancel_at_period_end: true
      });

      return NextResponse.json({ subscription });
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Stripe API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}