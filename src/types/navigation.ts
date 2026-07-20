import type { NavigatorScreenParams } from '@react-navigation/native';

// ---- Auth stack ----
export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
};

// ---- Passenger tabs ----
export type PassengerTabParamList = {
  Home: undefined;
  Booking: undefined;
  History: NavigatorScreenParams<PassengerHistoryStackParamList>;
  Profile: undefined;
};

export type PassengerHistoryStackParamList = {
  BookingHistory: undefined;
  BookingDetails: { bookingId: string };
};

export type PassengerStackParamList = {
  PassengerTabs: NavigatorScreenParams<PassengerTabParamList>;
  Settings: undefined;
};

// ---- Driver tabs ----
export type DriverTabParamList = {
  Requests: undefined;
  Trip: { bookingId?: string } | undefined;
  Profile: undefined;
};

export type DriverStackParamList = {
  DriverTabs: NavigatorScreenParams<DriverTabParamList>;
  Settings: undefined;
};

// ---- Root ----
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  PassengerFlow: NavigatorScreenParams<PassengerStackParamList>;
  DriverFlow: NavigatorScreenParams<DriverStackParamList>;
};