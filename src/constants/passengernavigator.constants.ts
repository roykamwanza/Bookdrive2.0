import { Ionicons } from '@expo/vector-icons';
import type { PassengerTabParamList } from '../types/navigation';

export const TAB_ICONS: Record<keyof PassengerTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home-outline',
  Booking: 'car-outline',
  History: 'time-outline',
  Profile: 'person-outline',
};
