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
  price?: string;
}

/** Normalised shape used throughout the UI */
export interface UIProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  /** Lowercase category name, e.g. "electronics" */
  category: string;
  stock: number;
  originalPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isSale?: boolean;
  rating?: number;
  reviews?: number;
  specs?: Record<string, string>;
}

export function adaptProduct(p: Product): UIProduct {
  const images = (p.product_images ?? []).map((i) => i.image_url);
  return {
    id: String(p.product_id),
    name: p.name,
    description: p.description ?? '',
    price: p.price != null ? Number(p.price) : 0,
    image: images[0] ?? '',
    images: images.length ? images : [],
    category: p.categories?.category_name?.toLowerCase() ?? '',
    stock: p.stock_quantity,
  };
}

export async function getAllProducts(channelId?: number): Promise<UIProduct[]> {
  const query = channelId ? `?channel_id=${channelId}` : '';
  const raw = await api.get<Product[]>('product', `/api/products${query}`);
  return raw.map(adaptProduct);
}

export async function getProductById(id: number, channelId?: number): Promise<UIProduct> {
  const query = channelId ? `?channel_id=${channelId}` : '';
  const raw = await api.get<Product>('product', `/api/products/${id}${query}`);
  return adaptProduct(raw);
}

export async function getProductStock(id: number): Promise<{ stock_quantity: number }> {
  return api.get('product', `/api/products/${id}/stock`);
}