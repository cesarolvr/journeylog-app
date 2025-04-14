export const createCustomer = async () => {
  try {
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
      const errorData = await response.json();
      console.error('Failed to create customer:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`Failed to create customer: ${errorData.error || response.statusText}`);
    }

    const { customer } = await response.json();
    return customer;
  } catch (error) {
    console.error('Error in createCustomer:', error);
    throw error;
  }
};

export const createSubscription = async (priceId: string) => {
  try {
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
      const errorData = await response.json();
      console.error('Failed to create subscription:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        priceId
      });
      throw new Error(`Failed to create subscription: ${errorData.error || response.statusText}`);
    }

    const { subscription } = await response.json();
    return subscription;
  } catch (error) {
    console.error('Error in createSubscription:', error);
    throw error;
  }
};

export const cancelSubscription = async (subscriptionId: string) => {
  try {
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
      const errorData = await response.json();
      console.error('Failed to cancel subscription:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        subscriptionId
      });
      throw new Error(`Failed to cancel subscription: ${errorData.error || response.statusText}`);
    }

    const { subscription } = await response.json();
    return subscription;
  } catch (error) {
    console.error('Error in cancelSubscription:', error);
    throw error;
  }
}; 