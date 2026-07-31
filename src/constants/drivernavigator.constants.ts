import { Ionicons } from '@expo/vector-icons';
import type { DriverTabParamList } from '../types/navigation';

export const TAB_ICONS: Record<keyof DriverTabParamList, keyof typeof Ionicons.glyphMap> = {
  Requests: 'list-outline',
  Trip: 'navigate-outline',
  Profile: 'person-outline',
};
