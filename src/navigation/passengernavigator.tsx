import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../constants/passengertheme';
import type { PassengerStackParamList } from './passengertypes';
import { PassengerHomeScreen } from '../screens/passenger/home/passengerhomescreen';
import { BookingScreen } from '../screens/passenger/booking/bookingscreen';
import { BookingHistoryScreen } from '../screens/passenger/bookinghistory/bookinghistoryscreen';
import { BookingDetailsScreen } from '../screens/passenger/bookingdetails/bookingdetailsscreen';

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
