import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient } from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
  typescript: true,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  // Log da requisição recebida
  console.log("Webhook received:", {
    method: req.method,
    headers: Object.fromEntries(headers().entries()),
    timestamp: new Date().toISOString(),
  });

  const body = await req.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    console.error("Stripe Webhook Error: Missing signature", {
      timestamp: new Date().toISOString(),
      headers: Object.fromEntries(headers().entries()),
      body: body.substring(0, 1000), // Log apenas o início do body para debug
    });
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Log antes de tentar construir o evento
    console.log("Attempting to construct event with:", {
      signatureLength: signature.length,
      bodyLength: body.length,
      webhookSecretExists: !!webhookSecret,
      timestamp: new Date().toISOString(),
    });

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // Log do evento construído com sucesso
    console.log("Event constructed successfully:", {
      type: event.type,
      id: event.id,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Stripe Webhook Error: Invalid signature", {
      error: err instanceof Error ? err.message : "Unknown error",
      stack: err instanceof Error ? err.stack : undefined,
      signature: signature.substring(0, 50) + "...", // Log apenas o início da signature
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  const supabase = createClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (!userId) {
          console.error("Stripe Webhook Error: Missing userId in session metadata", {
            sessionId: session.id,
            metadata: session.metadata,
            timestamp: new Date().toISOString(),
          });
          return NextResponse.json(
            { error: "Missing userId in session metadata" },
            { status: 400 }
          );
        }

        const { error: updateError } = await supabase
          .from("users")
          .update({
            subscription: "habit_creator",
            email: session.customer_email,
            subscription_record: JSON.stringify(event),
            subscription_key: session.subscription
          })
          .eq("id", userId);

        if (updateError) {
          console.error("Stripe Webhook Error: Failed to update user profile", {
            error: updateError,
            userId,
            sessionId: session.id,
            subscriptionId: session.subscription,
            timestamp: new Date().toISOString(),
          });
          throw new Error("Failed to update user profile");
        }

        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionId = subscription.id;

        const { data: user, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("subscription_key", subscriptionId)
          .single();

        if (userError || !user) {
          console.error("Stripe Webhook Error: User not found", {
            error: userError,
            subscriptionId,
            timestamp: new Date().toISOString(),
          });
          throw new Error("User not found");
        }

        const { error: updateError } = await supabase
          .from("users")
          .update({
            subscription_record: JSON.stringify(event),
            subscription: subscription.status === "active" ? "habit_creator" : "inactive"
          })
          .eq("id", user.id);

        if (updateError) {
          console.error("Stripe Webhook Error: Failed to update subscription status", {
            error: updateError,
            userId: user.id,
            subscriptionId: subscription.id,
            status: subscription.status,
            timestamp: new Date().toISOString(),
          });
          throw new Error("Failed to update subscription status");
        }

        break;
      }

      default:
        console.warn("Stripe Webhook: Unhandled event type", {
          type: event.type,
          timestamp: new Date().toISOString(),
        });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe Webhook Error: Processing failed", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      eventType: event.type,
      eventId: event.id,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        error: "Webhook processing failed",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 