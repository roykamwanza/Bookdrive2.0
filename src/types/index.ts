import { BookingStatus, UserRole } from '../constants/app';

export interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Location {
  label: string;
  latitude: number;
  longitude: number;
}

export interface Booking {
  id: string;
  passengerId: string;
  driverId?: string;
  pickup: Location;
  destination: Location;
  status: BookingStatus;
  requestedAt: string;
  updatedAt: string;
  fare?: number;
}

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Booking: undefined;
  BookingHistory: undefined;
  BookingDetails: { bookingId: string };
  DriverRequests: undefined;
  Profile: undefined;
  Settings: undefined;
};
