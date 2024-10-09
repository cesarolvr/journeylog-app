import Stripe from "stripe";

const key: any = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY
const priceIdHabitMaker: any = process.env.NEXT_PUBLIC_STRIPE_PRICE_HABIT_MAKER_ID

export const stripe = new Stripe(key, {
  apiVersion: "2024-06-20",
  typescript: true,
});


export const subscribeAction = async ({ userId }: any) => {
  const { url, ...props } = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceIdHabitMaker,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
    },
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_URL}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
  });

  return url;
};