import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { DateTime } from "luxon";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string || process.env.NEXT_PUBLIC_TRSIPE_WEBHOOK_SECRET as string
    );

    const supabase = createClient();

    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (session.payment_status === "paid") {
        const metadata = session.metadata;

        if (metadata?.userId) {
          // Update user subscription
          await supabase
            .from("users")
            .update({ 
              subscription: "habit_creator", 
              subscription_record: JSON.stringify(event), 
              subscription_key: session.subscription 
            })
            .eq("id", metadata.userId);

          // Remove notification
          await supabase
            .from("notification")
            .delete()
            .eq("user_id", metadata.userId);
        }
      }
    } else if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;
      
      if (subscription.cancel_at) {
        const cancelDate = DateTime.fromSeconds(subscription.cancel_at)
          .toUTC()
          .toISO();

        await supabase
          .from("users")
          .update({
            subscription_record: JSON.stringify(event),
            to_cancel_at: cancelDate
          })
          .eq("subscription_key", subscription.id);
      }
    }

    revalidatePath("/", "layout");
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return new NextResponse("Webhook error", { status: 400 });
  }
} 