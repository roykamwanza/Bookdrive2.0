import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './src/localization/i18n';
// @ts-ignore
import RootNavigator from './src/navigation/rootnavigator';
// @ts-ignore
import { AuthProvider } from './src/context/authcontext';

export default function App() {
  return React.createElement(
    SafeAreaProvider,
    null,
    React.createElement(
      AuthProvider,
      null,
      React.createElement(StatusBar, { style: 'light' }),
      React.createElement(RootNavigator, null),
    ),
  );
}
