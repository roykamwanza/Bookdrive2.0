import React from 'react';
import ProfileLayout from './profilelayout';
import { PassengerProfileScreenProps } from '../../types/profile';
import { usePassengerProfileScreen } from '../../hooks/profile';
import {
  ROLE_PASSENGER,
  STAT_LABEL_TOTAL_RIDES,
  PASSENGER_ACTION_PAYMENT,
  PASSENGER_ACTION_PLACES,
  PASSENGER_ACTION_HISTORY,
  PASSENGER_ACTION_PROMOS,
  PASSENGER_ACTION_SAFETY,
  DEFAULT_ACTION_LOGOUT,
} from '../../constants/profile';

export default function PassengerProfileScreen({ navigation, route }: PassengerProfileScreenProps) {
  const { passenger, onBack, onEdit, onLogout } = usePassengerProfileScreen({ navigation, route });

  const quickActions = [
    { icon: 'card-outline' as const, label: PASSENGER_ACTION_PAYMENT },
    { icon: 'location-outline' as const, label: PASSENGER_ACTION_PLACES },
    { icon: 'time-outline' as const, label: PASSENGER_ACTION_HISTORY },
    { icon: 'gift-outline' as const, label: PASSENGER_ACTION_PROMOS },
    { icon: 'shield-checkmark-outline' as const, label: PASSENGER_ACTION_SAFETY },
    { icon: 'log-out-outline' as const, label: DEFAULT_ACTION_LOGOUT, danger: true, onPress: onLogout },
  ];

  return (
    <ProfileLayout
      role={ROLE_PASSENGER}
      badgeIcon="person-outline"
      name={passenger.name}
      phone={passenger.phone}
      email={passenger.email}
      rating={passenger.rating}
      totalTrips={passenger.totalTrips}
      tripsLabel={STAT_LABEL_TOTAL_RIDES}
      avatarUri={passenger.avatarUri}
      onBack={onBack}
      onEdit={onEdit}
      onLogout={onLogout}
      quickActions={quickActions}
    />
  );
}
