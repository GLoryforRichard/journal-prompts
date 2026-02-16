import { sendPaymentMessage as sendPaymentMessageToDiscord } from './discord';
import { sendPaymentMessage as sendPaymentMessageToFeishu } from './feishu';

/**
 * Send a payment notification message when a user makes a purchase
 * @param sessionId The Stripe checkout session ID
 * @param customerId The Stripe customer ID
 * @param userName The username of the customer
 * @param amount The purchase amount in the currency's main unit (e.g., dollars, not cents)
 */
export async function sendPaymentNotification(
  sessionId: string,
  customerId: string,
  userName: string,
  amount: number
): Promise<void> {
  console.log('sendPaymentNotification', sessionId, customerId, userName, amount);

  // Send message to Discord channel
  await sendPaymentMessageToDiscord(sessionId, customerId, userName, amount);

  // Send message to Feishu group
  await sendPaymentMessageToFeishu(sessionId, customerId, userName, amount);
}
