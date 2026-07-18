import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { User } from '../types';
import { UserRole } from '../constants/app';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  switchRole: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  // Automatically authenticate passenger on startup after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setUser({
        id: 'demo_user_101',
        name: 'Demo Passenger',
        role: 'passenger',
      });
      setIsLoading(false);
    }, 1500); // Show splash for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const login = async () => {};
  const signUp = async () => {};
  const logout = async () => {
    setUser(null);
  };

  const switchRole = () => {
    setUser((prev) => {
      if (!prev) return null;
      const nextRole: UserRole = prev.role === 'passenger' ? 'driver' : 'passenger';
      return {
        ...prev,
        name: nextRole === 'driver' ? 'Demo Driver' : 'Demo Passenger',
        role: nextRole,
      };
    });
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, error, login, signUp, logout, switchRole }),
    [user, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
