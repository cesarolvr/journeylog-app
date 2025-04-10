import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY

if (!key) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

export const stripe = new Stripe(key, {
  apiVersion: "2023-10-16" as const,
});

export const createStripeCustomer = async (email: string): Promise<Stripe.Customer> => {
  return await stripe.customers.create({
    email,
  });
};

export const createStripeSubscription = async (
  customerId: string,
  priceId: string
): Promise<Stripe.Subscription> => {
  return await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    payment_behavior: "default_incomplete",
    payment_settings: { save_default_payment_method: "on_subscription" },
    expand: ["latest_invoice.payment_intent"],
  });
};

export const cancelStripeSubscription = async (
  subscriptionId: string
): Promise<Stripe.Subscription> => {
  return await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}; 