import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import type {
  PassengerStackParamList,
  PassengerTabParamList,
  PassengerHistoryStackParamList,
} from '../types/navigation';
import { colors } from '../constants/theme';
import { TAB_ICONS } from '../constants/passengernavigator.constants';
import styles from '../screens/styles/passengernavigator.styles';

import PassengerHomeScreen from '../screens/home/homescreen';
import { BookingContainer } from '../containers/bookingcontainer';
import { BookingHistoryContainer } from '../containers/bookinghistorycontainer';
import { BookingDetailsContainer } from '../containers/bookingdetailscontainer';
import ProfileScreen from '../screens/profile/profilescreen';
import SettingsScreen from '../screens/settings/settingsscreen';

const Tab = createBottomTabNavigator<PassengerTabParamList>();
const HistoryStack = createNativeStackNavigator<PassengerHistoryStackParamList>();
const RootStack = createNativeStackNavigator<PassengerStackParamList>();

function BookingHistoryStackNavigator(): React.JSX.Element {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="BookingHistory" component={BookingHistoryContainer} />
      <HistoryStack.Screen name="BookingDetails" component={BookingDetailsContainer} />
    </HistoryStack.Navigator>
  );
}

function PassengerTabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: keyof PassengerTabParamList } }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <Ionicons name={TAB_ICONS[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={PassengerHomeScreen} />
      <Tab.Screen name="Booking" component={BookingContainer} />
      <Tab.Screen name="History" component={BookingHistoryStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function PassengerNavigator(): React.JSX.Element {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="PassengerTabs" component={PassengerTabs} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
    </RootStack.Navigator>
  );
}