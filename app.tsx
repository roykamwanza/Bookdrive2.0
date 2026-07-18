import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './src/localization/i18n';
import RootNavigator from './src/navigation/rootnavigator';
import { AuthProvider } from './src/context/authcontext';
import { BookingProvider } from './src/context/bookingcontext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <BookingProvider>
          <StatusBar style="light" />
          <RootNavigator />
        </BookingProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
