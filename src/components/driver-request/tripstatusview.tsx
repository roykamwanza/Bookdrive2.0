import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/driver-request/tripstatusviewstyles';
import { colors } from '../../constants/theme';

export interface TripStatusProps {
  status: 'en-route' | 'arrived' | 'cancelled';
  message: string;
}

export function TripStatusView({ status, message }: TripStatusProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'en-route': return 'car-sport';
      case 'arrived': return 'checkmark-circle';
      case 'cancelled': return 'close-circle';
      default: return 'information-circle';
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name={getStatusIcon()} size={24} color={colors.secondary} />
      <View style={styles.textContainer}>
        <Text style={styles.statusLabel}>{status.toUpperCase()}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}