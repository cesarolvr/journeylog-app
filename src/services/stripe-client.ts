export const createCustomer = async () => {
  const response = await fetch('/api/stripe/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'createCustomer',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create customer');
  }

  const { customer } = await response.json();
  return customer;
};

export const createSubscription = async (priceId: string) => {
  const response = await fetch('/api/stripe/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'createSubscription',
      priceId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create subscription');
  }

  const { subscription } = await response.json();
  return subscription;
};

export const cancelSubscription = async (subscriptionId: string) => {
  const response = await fetch('/api/stripe/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'cancelSubscription',
      subscriptionId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to cancel subscription');
  }

  const { subscription } = await response.json();
  return subscription;
}; 