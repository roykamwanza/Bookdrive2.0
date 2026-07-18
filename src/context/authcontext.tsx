import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth } from '../services/firebase';
import { User } from '../types';
import { UserRole } from '../constants/app';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole, phone?: string) => Promise<void>;
  updateUser: (name: string, role: UserRole, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function encodeProfile(name: string, role: UserRole, phone?: string): string {
  return JSON.stringify({ name, role, phone });
}

function decodeProfile(displayName: string | null): { name: string; role: UserRole; phone?: string } {
  if (!displayName) {
    return { name: 'User', role: 'passenger' };
  }
  try {
    const parsed = JSON.parse(displayName);
    return {
      name: typeof parsed.name === 'string' ? parsed.name : 'User',
      role: parsed.role === 'driver' ? 'driver' : 'passenger',
      phone: typeof parsed.phone === 'string' ? parsed.phone : undefined,
    };
  } catch {
    return { name: displayName, role: 'passenger' };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const { name, role, phone } = decodeProfile(firebaseUser.displayName);
      setUser({
        id: firebaseUser.uid,
        name,
        email: firebaseUser.email ?? undefined,
        role,
        phone,
      });
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setIsLoading(false);
      throw err;
    }
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole, phone?: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: encodeProfile(name, role, phone) });
      
      setUser({ id: credential.user.uid, name, email, role, phone });
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
      setIsLoading(false);
      throw err;
    }
  };

  const updateUser = async (name: string, role: UserRole, phone?: string) => {
    if (!auth.currentUser) return;
    setError(null);
    setIsLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: encodeProfile(name, role, phone) });
      setUser({
        id: auth.currentUser.uid,
        name,
        email: auth.currentUser.email ?? undefined,
        role,
        phone,
      });
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update profile failed');
      setIsLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setError(null);
    await signOut(auth);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, error, login, signUp, updateUser, logout }),
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