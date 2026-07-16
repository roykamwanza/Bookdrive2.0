import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types';
import { colors } from '../constants/theme';

import SplashScreen from '../screens/splash/splashscreen';
import LoginScreen from '../screens/login/loginscreen';
import SignUpScreen from '../screens/signup/signupscreen';
import HomeScreen from '../screens/home/homescreen';
import BookingScreen from '../screens/booking/bookingscreen';
import BookingHistoryScreen from '../screens/bookinghistory/bookinghistoryscreen';
import BookingDetailsScreen from '../screens/bookingdetails/bookingdetailsscreen';
import DriverRequestsScreen from '../screens/driverrequests/driverrequestsscreen';
import ProfileScreen from '../screens/profile/profilescreen';
import SettingsScreen from '../screens/settings/settingsscreen';
import { PassengerNavigator } from '../passager_workshop/navigation/PassengerNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Passenger"
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.textInverse,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Passenger" component={PassengerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} />
        <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
        <Stack.Screen name="DriverRequests" component={DriverRequestsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
