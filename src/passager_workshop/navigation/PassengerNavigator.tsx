import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../constants/theme';
import type { PassengerStackParamList } from './passenger_types';
import { PassengerHomeScreen } from '../screens/Home/PassengerHomeScreen';
import { BookingScreen } from '../screens/Booking/BookingScreen';
import { BookingHistoryScreen } from '../screens/BookingHistory/BookingHistoryScreen';
import { BookingDetailsScreen } from '../screens/BookingDetails/BookingDetailsScreen';

const Stack = createNativeStackNavigator<PassengerStackParamList>();

export function PassengerNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Home" component={PassengerHomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'Book a ride' }} />
      <Stack.Screen
        name="BookingHistory"
        component={BookingHistoryScreen}
        options={{ title: 'Booking history' }}
      />
      <Stack.Screen
        name="BookingDetails"
        component={BookingDetailsScreen}
        options={{ title: 'Booking details' }}
      />
    </Stack.Navigator>
  );
}
