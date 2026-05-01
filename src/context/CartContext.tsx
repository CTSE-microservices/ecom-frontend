'use client';

import {
  createContext, useContext, useReducer,
  useEffect, useCallback, ReactNode,
} from 'react';
import { api } from '@/lib/apiClient';
import { useAuth } from './AuthContext';

// ── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  /** cart_item.id from the server (or a temp key for guests) */
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
}

type CartAction =
  | { type: 'SET_ITEMS'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'OPTIMISTIC_ADD'; payload: CartItem }
  | { type: 'OPTIMISTIC_UPDATE'; id: string; quantity: number }
  | { type: 'OPTIMISTIC_REMOVE'; id: string }
  | { type: 'CLEAR' };

// ── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_ITEMS':   return { ...state, items: action.payload, isLoading: false };
    case 'SET_LOADING': return { ...state, isLoading: action.payload };
    case 'CLEAR':       return { ...state, items: [] };
    case 'OPTIMISTIC_ADD': {
      const exists = state.items.find((i) => i.productId === action.payload.productId);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.payload.productId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'OPTIMISTIC_UPDATE':
      return {
        ...state,
        items: action.quantity <= 0
          ? state.items.filter((i) => i.id !== action.id)
          : state.items.map((i) =>
              i.id === action.id ? { ...i, quantity: action.quantity } : i
            ),
      };
    case 'OPTIMISTIC_REMOVE':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    default:
      return state;
  }
}

// ── Server response → CartItem mapper ────────────────────────────────────────

interface ServerCartItem {
  id: number;
  product_id: string;
  product_name: string;
  unit_price: string | number;
  quantity: number;
}

function toCartItem(raw: ServerCartItem): CartItem {
  return {
    id: String(raw.id),
    productId: raw.product_id,
    name: raw.product_name,
    price: Number(raw.unit_price),
    quantity: raw.quantity,
  };
}

// ── Context ──────────────────────────────────────────────────────────────────

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  addItem: (item: Omit<CartItem, 'id'>) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

const GUEST_CART_KEY = 'guest_cart';

// ── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth();
  const [state, dispatch] = useReducer(reducer, { items: [], isLoading: false });

  // Fetch server cart when logged in
  const fetchCart = useCallback(async () => {
    if (!token) return;
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await api.get<{ message: string; data: { cart_item: ServerCartItem[] } }>('order', '/api/cart');
      const items = (res.data?.cart_item ?? []).map(toCartItem);
      dispatch({ type: 'SET_ITEMS', payload: items });
    } catch {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [token]);

  // Sync guest cart → server on login, then clear guest cart
  const syncGuestCart = useCallback(async () => {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    if (!raw) return;
    const guestItems: CartItem[] = JSON.parse(raw);
    for (const item of guestItems) {
      try {
        await api.post('order', '/api/cart/items', {
          productId: item.productId,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        });
      } catch { /* non-fatal */ }
    }
    localStorage.removeItem(GUEST_CART_KEY);
  }, []);

  useEffect(() => {
    if (user && token) {
      syncGuestCart().then(fetchCart);
    } else if (!user) {
      // Load guest cart from localStorage
      try {
        const raw = localStorage.getItem(GUEST_CART_KEY);
        const items: CartItem[] = raw ? JSON.parse(raw) : [];
        dispatch({ type: 'SET_ITEMS', payload: items });
      } catch {
        dispatch({ type: 'SET_ITEMS', payload: [] });
      }
    }
  }, [user, token, fetchCart, syncGuestCart]);

  // Persist guest cart to localStorage whenever it changes
  useEffect(() => {
    if (!user) {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(state.items));
    }
  }, [state.items, user]);

  // ── Actions ──────────────────────────────────────────────────────────────

  const addItem = useCallback(async (item: Omit<CartItem, 'id'>) => {
    if (!token) {
      // Guest mode — local only
      dispatch({
        type: 'OPTIMISTIC_ADD',
        payload: { ...item, id: `guest-${item.productId}` },
      });
      return;
    }
    dispatch({ type: 'OPTIMISTIC_ADD', payload: { ...item, id: 'pending' } });
    try {
      await api.post('order', '/api/cart/items', {
        productId: item.productId,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
      });
      await fetchCart(); // re-sync to get real IDs from server
    } catch (err) {
      await fetchCart(); // revert optimistic update
      throw err;
    }
  }, [token, fetchCart]);

  const updateItem = useCallback(async (id: string, quantity: number) => {
    if (!token) {
      dispatch({ type: 'OPTIMISTIC_UPDATE', id, quantity });
      return;
    }
    dispatch({ type: 'OPTIMISTIC_UPDATE', id, quantity });
    try {
      if (quantity <= 0) {
        await api.delete('order', `/api/cart/items/${id}`);
      } else {
        await api.patch('order', `/api/cart/items/${id}`, { quantity });
      }
    } catch (err) {
      await fetchCart();
      throw err;
    }
  }, [token, fetchCart]);

  const removeItem = useCallback(async (id: string) => {
    dispatch({ type: 'OPTIMISTIC_REMOVE', id });
    if (!token) return;
    try {
      await api.delete('order', `/api/cart/items/${id}`);
    } catch (err) {
      await fetchCart();
      throw err;
    }
  }, [token, fetchCart]);

  const clearCart = useCallback(async () => {
    dispatch({ type: 'CLEAR' });
    if (!token) { localStorage.removeItem(GUEST_CART_KEY); return; }
    try {
      await api.delete('order', '/api/cart');
    } catch { /* non-fatal */ }
  }, [token]);

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        totalPrice,
        isLoading: state.isLoading,
        addItem,
        updateItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}