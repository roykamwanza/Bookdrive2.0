import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../constants/theme';
import { useAuth } from '../context/authcontext';

// Import your Splash Screen
import SplashScreen from '../screens/splash/splashscreen';

import LoginScreen from '../screens/login/loginscreen';
import SignUpScreen from '../screens/signup/signupscreen';
import HomeScreen from '../screens/home/homescreen';
import BookingScreen from '../screens/booking/bookingscreen';
import BookingHistoryScreen from '../screens/bookinghistory/bookinghistoryscreen';
import BookingDetailsScreen from '../screens/bookingdetails/bookingdetailsscreen';
import DriverRequestsScreen from '../screens/driverrequests/driverrequestsscreen';
import ProfileScreen from '../screens/profile/profilescreen';
import EditProfileScreen from '../screens/profile/editprofilescreen';
import SettingsScreen from '../screens/settings/settingsscreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.textInverse,
          contentStyle: { backgroundColor: colors.background },
          headerShown: false,
        }}
      >

        <Stack.Screen name="Splash" component={SplashScreen} />

        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} />
            <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
            <Stack.Screen name="DriverRequests" component={DriverRequestsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}