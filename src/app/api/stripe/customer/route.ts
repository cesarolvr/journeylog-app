import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createStripeCustomer, createStripeSubscription, cancelStripeSubscription } from "@/lib/stripe";
import { cookies } from "next/headers";

export async function POST(req: Request) {
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

    const { action, priceId, subscriptionId } = await req.json();

    if (action === "createCustomer") {
      const customer = await createStripeCustomer(user.email!);
      
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ stripe_customer_id: customer.id })
        .eq("id", user.id);

      if (updateError) {
        throw new Error("Failed to update user profile");
      }

      return NextResponse.json({ customer });
    }

    if (action === "createSubscription" && priceId) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("stripe_customer_id")
        .eq("id", user.id)
        .single();

      if (!profile?.stripe_customer_id) {
        return NextResponse.json(
          { error: "Customer not found" },
          { status: 404 }
        );
      }

      const subscription = await createStripeSubscription(profile.stripe_customer_id, priceId);
      return NextResponse.json({ subscription });
    }

    if (action === "cancelSubscription" && subscriptionId) {
      const subscription = await cancelStripeSubscription(subscriptionId);
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