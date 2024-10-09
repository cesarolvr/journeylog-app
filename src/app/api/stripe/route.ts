import { stripe } from "@/services/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from "next/cache";

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

  if (
    event.type === "checkout.session.completed" &&
    event.data.object.payment_status === "paid"
  ) {
    const metadata = event.data.object.metadata;
    console.log('metadata', metadata)
    if (metadata) {
      const res = await supabaseServerClient
        .from("users")
        .update({ subscription: "habit_creator" })
        .eq("id", metadata?.userId)
        .select()

        console.log('res', res)
      // const userId = metadata.userId;
      // await db
      //   .update(users)
      //   .set({ isSubscribed: true })
      //   .where(eq(users.id, userId));
    }
  }

  revalidatePath("/", "layout");

  return new NextResponse(null, { status: 200 });
}