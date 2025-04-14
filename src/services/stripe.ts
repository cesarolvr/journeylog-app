export const subscribeAction = async ({ userId }: any) => {
  const response = await fetch('/api/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'subscribe',
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create checkout session');
  }

  const { url } = await response.json();
  return url;
};

export const unsubscribeAction = async ({ userId, subscription_key }: any) => {
  const response = await fetch('/api/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'unsubscribe',
      userId,
      subscription_key,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update subscription');
  }

  const { subscription } = await response.json();
  return subscription;
};