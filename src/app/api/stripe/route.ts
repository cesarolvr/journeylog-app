import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
  typescript: true,
});

export async function POST(req: Request) {
  let userId: string | undefined;
  let subscription_key: string | undefined;

  try {
    const { action, userId: reqUserId, subscription_key: reqSubscriptionKey } = await req.json();
    userId = reqUserId;
    subscription_key = reqSubscriptionKey;

    if (action === "subscribe") {
      if (!userId) {
        throw new Error("userId is required for subscription");
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: process.env.NEXT_PUBLIC_STRIPE_PRICE_HABIT_CREATOR_ID,
            quantity: 1,
          },
        ],
        metadata: {
          userId: userId,
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

    console.error("Invalid action received:", { action, userId, subscription_key });
    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    // Log detalhado do erro
    console.error("Stripe API Error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      action: "subscribe/unsubscribe",
      userId,
      subscription_key,
      timestamp: new Date().toISOString(),
    });

    // Retorna uma mensagem de erro mais específica
    const errorMessage = error instanceof Error 
      ? error.message 
      : "An unexpected error occurred";

    return NextResponse.json(
      { 
        error: "Internal Server Error",
        message: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}