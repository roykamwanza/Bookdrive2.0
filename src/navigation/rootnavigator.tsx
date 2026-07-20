import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Dev 5 owns the real AuthContext. Swap this import for theirs once merged.
import { useAuth } from '../context/authcontext';
import type { RootStackParamList } from '../types/navigation';
import { colors } from '../constants/theme';

import AuthNavigator from './authnavigator';
import PassengerNavigator from './passengernavigator';
import DriverNavigator from './drivernavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator(): React.JSX.Element {
  const { user, isLoading } = useAuth();
  const role = user?.role;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="PassengerFlow" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="PassengerFlow" component={PassengerNavigator} />
        <RootStack.Screen name="DriverFlow" component={DriverNavigator} />
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
});