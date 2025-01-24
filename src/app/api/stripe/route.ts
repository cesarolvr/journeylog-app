import { stripe } from "@/services/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from "next/cache";
import { DateTime } from "luxon";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  const supabaseServerClient = createClient()

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.NEXT_PUBLIC_STRIPE_SIGNING_SECRET as string,
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("webhook error", { status: 400 });
  }

  console.log('event', JSON.stringify(event))

  if (
    (event.type === "checkout.session.completed" || event.type === 'checkout.session.async_payment_succeeded') &&
    event.data.object.payment_status === "paid"
  ) {
    const metadata = event.data.object.metadata;
    console.log('metadata', metadata)
    if (metadata) {
      const resSubscription = await supabaseServerClient
        .from("users")
        .update({ subscription: "habit_creator", subscription_record: JSON.stringify(event), subscription_key: event?.data?.object?.subscription })
        .eq("id", metadata?.userId)
        .select()

      console.log('on create subscription =>', resSubscription)

      const resNotification = await supabaseServerClient
        .from("notification")
        .delete()
        .eq("user_id", metadata?.userId)
        .select()

      console.log('on remove notification =>', resNotification)
    }
  } else if (event.type === "customer.subscription.updated") {
    const cancelDate = DateTime.fromJSDate(new Date(event?.data?.object?.cancel_at * 1000))
      .toUTC()
      .toISO()

    const res = await supabaseServerClient
      .from("users")
      .update({
        subscription_record: JSON.stringify(event), to_cancel_at: cancelDate
      })
      .eq("subscription_key", event?.data?.object?.id)
      .select()

    console.log('on update subscription', res)
  }

  revalidatePath("/", "layout");

  return new NextResponse(null, { status: 200 });
}