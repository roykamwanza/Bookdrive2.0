import { useAuth } from './../context/authcontext';

export const navigationmap: Record<string, string> = {
  requests: 'DriverRequests',
  booking: 'Booking',
  history: 'BookingHistory',
  settings: 'Settings',
  profile: 'Profile',
};

export function usehome(navigation?: any) {
  const { user, logout } = useAuth();
  const navigate = (screenName: string) => navigation?.navigate?.(screenName);
  const getDestination = (id: string) => navigationmap[id] || 'Profile';
  return { user, navigate, logout, getDestination };
}