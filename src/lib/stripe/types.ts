export const STRIPE_PRICE_ID = "price_1P8QYbJq4QJq4QJq4QJq4QJq";

export interface CreateSubscriptionResponse {
  subscriptionId: string;
  clientSecret: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
} 