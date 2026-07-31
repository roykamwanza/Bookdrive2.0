import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import type { DriverStackParamList, DriverTabParamList } from '../types/navigation';
import { colors } from '../constants/theme';
import { TAB_ICONS } from '../constants/drivernavigator.constants';
import styles from '../screens/styles/drivernavigator.styles';

import DriverRequestsScreen from '../screens/driverrequests/driverrequestsscreen';
import TripStatusScreen from '../screens/tripstatus/tripstatusscreen';
import ProfileScreen from '../screens/profile/profilescreen';
import SettingsScreen from '../screens/settings/settingsscreen';

const Tab = createBottomTabNavigator<DriverTabParamList>();
const RootStack = createNativeStackNavigator<DriverStackParamList>();

function DriverTabs(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={TAB_ICONS[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Requests" component={DriverRequestsScreen} />
      <Tab.Screen name="Trip" component={TripStatusScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function DriverNavigator(): React.JSX.Element {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="DriverTabs" component={DriverTabs} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
    </RootStack.Navigator>
  );
}