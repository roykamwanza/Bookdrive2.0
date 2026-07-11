import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

import { auth, app } from '../services/firebase';
import { User } from '../types';
import { UserRole } from '../constants/app';

const db = getFirestore(app);

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Keep the user in sync across app restarts / screens.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const profileSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
        const profile: any = profileSnap.exists() ? profileSnap.data() : {};

        setUser({
          id: firebaseUser.uid,
          name: profile.name ?? firebaseUser.email ?? 'User',
          email: firebaseUser.email ?? undefined,
          role: (profile.role as UserRole) ?? 'passenger',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user profile');
      } finally {
        setIsLoading(false);
      }
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
      await setDoc(doc(db, 'users', credential.user.uid), { name, role, email });
      // onAuthStateChanged above picks up the resulting user automatically.
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
