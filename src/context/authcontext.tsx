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
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// We don't use a separate database (Firestore requires a billing account
// to be enabled on the Google Cloud project). Instead, the user's name and
// role are packed into Firebase Auth's built-in displayName field as JSON,
// e.g. '{"name":"Jane Doe","role":"driver"}'. This keeps the whole profile
// inside Firebase Auth itself, no extra service needed.
function encodeProfile(name: string, role: UserRole): string {
  return JSON.stringify({ name, role });
}

function decodeProfile(displayName: string | null): { name: string; role: UserRole } {
  if (!displayName) {
    return { name: 'User', role: 'passenger' };
  }
  try {
    const parsed = JSON.parse(displayName);
    return {
      name: typeof parsed.name === 'string' ? parsed.name : 'User',
      role: parsed.role === 'driver' ? 'driver' : 'passenger',
    };
  } catch {
    // Fallback for any account whose displayName isn't our JSON format.
    return { name: displayName, role: 'passenger' };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Keep the user in sync across app restarts / screens.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const { name, role } = decodeProfile(firebaseUser.displayName);
      setUser({
        id: firebaseUser.uid,
        name,
        email: firebaseUser.email ?? undefined,
        role,
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
      // onAuthStateChanged above picks up the resulting user automatically.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setIsLoading(false);
      throw err;
    }
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    setError(null);
    setIsLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: encodeProfile(name, role) });
      // onAuthStateChanged above picks up the resulting user, but it won't
      // see the just-set displayName until the next event, so set it here too.
      setUser({ id: credential.user.uid, name, email, role });
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
      setIsLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setError(null);
    await signOut(auth);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, isLoading, error, login, signUp, logout }),
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
