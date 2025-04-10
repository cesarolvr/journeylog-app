import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createStripeCustomer, createStripeSubscription } from "@/lib/stripe";
import { STRIPE_PRICE_ID } from "@/lib/stripe/types";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "You must be logged in." },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        { error: "Not Found", message: "User profile not found." },
        { status: 404 }
      );
    }

    let customerId = profile.stripe_customer_id;

    if (!customerId) {
      const customer = await createStripeCustomer(profile.email);
      customerId = customer.id;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        return NextResponse.json(
          { error: "Server Error", message: "Failed to update user profile." },
          { status: 500 }
        );
      }
    }

    const subscription = await createStripeSubscription(customerId, STRIPE_PRICE_ID);

    if (!subscription.latest_invoice || typeof subscription.latest_invoice === 'string') {
      throw new Error("Invalid subscription response");
    }

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    if (!invoice.payment_intent || typeof invoice.payment_intent === 'string') {
      throw new Error("Invalid invoice response");
    }

    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Server Error", message: "Something went wrong." },
      { status: 500 }
    );
  }
}