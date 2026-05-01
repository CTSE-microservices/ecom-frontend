import { api } from './apiClient';

export interface Order {
  id: number;
  user_uuid: string;
  status_id: number;
  total_amount: string;
  discount_amount: string;
  final_amount: string;
  payment_id: string | null;
  tracking_id: string | null;
  created_at: string;
  order_status: { code: string; description: string };
  order_item: OrderItem[];
}

export interface OrderItem {
  id: number;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: string;
  total_price: string;
}

type Wrapped<T> = { message: string; data: T };

export async function createOrder(): Promise<Order> {
  const res = await api.post<Wrapped<Order>>('order', '/api/orders', {});
  return res.data;
}

export async function listOrders(): Promise<Order[]> {
  const res = await api.get<Wrapped<Order[]>>('order', '/api/orders');
  return res.data;
}

export async function getOrder(orderId: number): Promise<Order> {
  const res = await api.get<Wrapped<Order>>('order', `/api/orders/${orderId}`);
  return res.data;
}

export async function cancelOrder(orderId: number): Promise<Order> {
  const res = await api.post<Wrapped<Order>>('order', `/api/orders/${orderId}/cancel`, {});
  return res.data;
}

export async function applyDiscount(code: string, orderAmount: number) {
  const res = await api.post<Wrapped<unknown>>('order', '/api/discounts/apply', { code, orderAmount });
  return res.data;
}

/**
 * Single poll of the checkout-url endpoint.
 * 202 → still processing (data: null)
 * 200 → ready (data: { checkoutUrl: string })
 */
export async function getOrderCheckoutUrl(
  orderId: number
): Promise<{ ready: boolean; checkoutUrl: string | null }> {
  const { status, data } = await api.getWithStatus<Wrapped<{ checkoutUrl: string } | null>>(
    'order',
    `/api/orders/${orderId}/checkout-url`
  );
  if (status === 200 && data?.data?.checkoutUrl) {
    return { ready: true, checkoutUrl: data.data.checkoutUrl };
  }
  return { ready: false, checkoutUrl: null };
}

/**
 * Polls GET /orders/:id/checkout-url every intervalMs until 200 + checkoutUrl arrives,
 * or throws after timeoutMs. Pass an AbortSignal to cancel early.
 */
export async function pollForCheckoutUrl(
  orderId: number,
  {
    intervalMs = 1500,
    timeoutMs = 30_000,
    signal,
  }: { intervalMs?: number; timeoutMs?: number; signal?: AbortSignal } = {}
): Promise<string> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (signal?.aborted) throw new DOMException('Polling aborted', 'AbortError');
    const { ready, checkoutUrl } = await getOrderCheckoutUrl(orderId);
    if (ready && checkoutUrl) return checkoutUrl;
    await new Promise<void>((resolve, reject) => {
      const t = setTimeout(resolve, intervalMs);
      signal?.addEventListener('abort', () => { clearTimeout(t); reject(new DOMException('Polling aborted', 'AbortError')); }, { once: true });
    });
  }
  throw new Error('Payment session timed out. Please try again.');
}