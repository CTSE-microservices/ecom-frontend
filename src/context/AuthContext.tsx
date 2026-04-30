'use client';

import {
  createContext, useContext, useState,
  useEffect, useCallback, ReactNode,
} from 'react';
import { api } from '@/lib/apiClient';

const TOKEN_KEY = 'auth_token';

export interface AuthUser {
  id: string;
  username: string | null;
  email: string;
  phoneNumber: string | null;
  role: { id: number; roleName: string };
  channel: { id: number; channelName: string };
  isActive: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  username?: string;
  phoneNumber?: string;
  /** Defaults to 2 (customer) */
  roleId?: number;
  /** Defaults to 1 (retail) */
  userChannelId?: number;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    setToken(null);
  }, []);

  const verifyToken = useCallback(async (jwt: string) => {
    try {
      const me = await api.get<AuthUser>('user', '/api/auth/verify');
      setUser(me);
      setToken(jwt);
    } catch {
      logout();
    }
  }, [logout]);

  // Restore session on mount
  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) {
      verifyToken(saved).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [verifyToken]);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await api.post<{ token: string }>('user', '/api/auth/login', {
        email,
        password,
      });
      const jwt = data.token;
      localStorage.setItem(TOKEN_KEY, jwt);
      await verifyToken(jwt);
    } finally {
      setIsLoading(false);
    }
  }, [verifyToken]);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    try {
      await api.post('user', '/api/users/register', {
        ...data,
        roleId: data.roleId ?? 2,
        userChannelId: data.userChannelId ?? 1,
      });
      // Auto-login after successful registration
      await login(data.email, data.password);
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}