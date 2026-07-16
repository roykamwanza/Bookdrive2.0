import React from 'react';
import ProfileLayout from './profilelayout';
import { DriverProfileScreenProps } from '../../types/profile/types';
import { useDriverProfileScreen } from '../../hooks/profile/hooks';
import {
  ROLE_DRIVER,
  STAT_LABEL_DRIVER_TRIPS,
  DRIVER_ACTION_EARNINGS,
  DRIVER_ACTION_VEHICLE,
  DRIVER_ACTION_DOCUMENTS,
  DRIVER_ACTION_SETTINGS,
  DEFAULT_ACTION_LOGOUT,
} from '../../constants/profile/constants';

export default function DriverProfileScreen({ navigation, route }: DriverProfileScreenProps) {
  const { driver, onBack, onEdit, onLogout } = useDriverProfileScreen({ navigation, route });

  const quickActions = [
    { icon: 'cash-outline' as const, label: DRIVER_ACTION_EARNINGS },
    { icon: 'car-outline' as const, label: DRIVER_ACTION_VEHICLE },
    { icon: 'document-text-outline' as const, label: DRIVER_ACTION_DOCUMENTS },
    { icon: 'settings-outline' as const, label: DRIVER_ACTION_SETTINGS },
    { icon: 'log-out-outline' as const, label: DEFAULT_ACTION_LOGOUT, danger: true, onPress: onLogout },
  ];

  return (
    <ProfileLayout
      role={ROLE_DRIVER}
      badgeIcon="car-sport-outline"
      name={driver.name}
      phone={driver.phone}
      email={driver.email}
      rating={driver.rating}
      totalTrips={driver.totalTrips}
      tripsLabel={STAT_LABEL_DRIVER_TRIPS}
      avatarUri={driver.avatarUri}
      onBack={onBack}
      onEdit={onEdit}
      onLogout={onLogout}
      quickActions={quickActions}
    />
  );
}
