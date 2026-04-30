import { api } from './apiClient';

export interface ProductImage {
  image_id: number;
  image_url: string;
}

export interface Category {
  category_id: number;
  category_name: string;
  description?: string;
}

export interface Product {
  product_id: number;
  name: string;
  description?: string;
  stock_quantity: number;
  category_id?: number;
  categories?: Category;
  product_images: ProductImage[];
  /** Price from the user's channel price book — injected by product service */
  price?: number;
}

export async function getAllProducts(channelId?: number): Promise<Product[]> {
  const query = channelId ? `?channelId=${channelId}` : '';
  return api.get<Product[]>('product', `/api/products${query}`);
}

export async function getProductById(id: number, channelId?: number): Promise<Product> {
  const query = channelId ? `?channelId=${channelId}` : '';
  return api.get<Product>('product', `/api/products/${id}${query}`);
}

export async function getProductStock(id: number): Promise<{ stock_quantity: number }> {
  return api.get('product', `/api/products/${id}/stock`);
}