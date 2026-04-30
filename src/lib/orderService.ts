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

export async function createOrder(): Promise<Order> {
  return api.post<Order>('order', '/api/orders', {});
}

export async function listOrders(): Promise<Order[]> {
  return api.get<Order[]>('order', '/api/orders');
}

export async function getOrder(orderId: number): Promise<Order> {
  return api.get<Order>('order', `/api/orders/${orderId}`);
}

export async function cancelOrder(orderId: number): Promise<Order> {
  return api.post<Order>('order', `/api/orders/${orderId}/cancel`, {});
}

export async function applyDiscount(code: string) {
  return api.post('order', '/api/discounts/apply', { code });
}