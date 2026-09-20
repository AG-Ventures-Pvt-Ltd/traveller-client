'use client'

export const openRazorpaySubscription = (
  gatewaySubscriptionId: string,
  razorpayKeyId: string,
  onComplete: (subscriptionId: string) => void,
) => {
  const options = {
    key: razorpayKeyId,
    subscription_id: gatewaySubscriptionId,
    name: "Wondrr Trips",
    description: "Travel Pass Auto-pay Setup",
    theme: {
      color: '#121212',
    },
    handler: () => onComplete(gatewaySubscriptionId),
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};
