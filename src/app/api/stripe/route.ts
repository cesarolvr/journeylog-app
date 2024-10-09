import { stripe } from "@/services/stripe";
import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers, cookies } from "next/headers";
import { DateTime } from "luxon";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;
  const cookieStore = cookies()

  const supabaseServerClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          console.log('error on set cookie')
        }
      },
    },
  })

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
    if (metadata) {
      const res = await supabaseServerClient
        .from("users")
        .update({ subscription: "habit_maker" })
        .eq("id", metadata?.userId)
        .select()
      console.log('dddd', res)
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