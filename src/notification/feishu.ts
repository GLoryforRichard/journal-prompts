/**
 * Send a message to Feishu via webhook. Generic method that accepts any valid Feishu webhook payload.
 * @param body Message body (e.g. { msg_type: 'text', content: { text: '...' } })
 */
export async function sendMessage(body: Record<string, unknown>): Promise<void> {
  const webhookUrl = process.env.FEISHU_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      'FEISHU_WEBHOOK_URL is not set, skipping Feishu notification'
    );
    return;
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error('<< Failed to send Feishu message:', response);
  }
}

/**
 * Send a payment notificationmessage to Feishu when a user makes a purchase
 * @param sessionId The Stripe checkout session ID
 * @param customerId The Stripe customer ID
 * @param userName The username of the customer
 * @param amount The purchase amount in the currency's main unit (e.g., dollars, not cents)
 */
export async function sendPaymentMessage(
  sessionId: string,
  customerId: string,
  userName: string,
  amount: number
): Promise<void> {
  try {
    const message = {
      msg_type: 'text',
      content: {
        text: `🎉 New Purchase\nUsername: ${userName}\nAmount: $${amount.toFixed(2)}\nCustomer ID: ${customerId}\nSession ID: ${sessionId}`,
      },
    };

    await sendMessage(message);

    console.log(
      `<< Successfully sent Feishu notification for user ${userName}`
    );
  } catch (error) {
    console.error('<< Failed to send Feishu notification:', error);
  }
}
