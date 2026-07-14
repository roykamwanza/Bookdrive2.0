import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, Auth } from 'firebase/auth';
// @ts-ignore - getReactNativePersistence exists at runtime but isn't in the public TS types yet
import { getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// These values are safe to keep in source control — they identify the
// project, they are not secret credentials.
const firebaseConfig = {
  apiKey: 'AIzaSyCfQUB_iSTOsE7m1zPOcoPa2NA4LuHvwpc',
  authDomain: 'bookdrive2-d559b.firebaseapp.com',
  projectId: 'bookdrive2-d559b',
  storageBucket: 'bookdrive2-d559b.firebasestorage.app',
  messagingSenderId: '959091877113',
  appId: '1:959091877113:web:a0083b59c8b733f0ab2e28',
};

// Avoid re-initializing the app on hot reload (Expo/Metro fast refresh)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Auth must be initialized with AsyncStorage persistence on React Native,
// otherwise users get logged out every time the app restarts.
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  // initializeAuth throws if it's already been called (e.g. fast refresh) —
  // fall back to the existing instance in that case.
  auth = getAuth(app);
}

export { app, auth };