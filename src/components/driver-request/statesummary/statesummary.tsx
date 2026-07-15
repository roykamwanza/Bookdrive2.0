import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';
import type { DriverStatus } from '../../../types/driver-request/driver';
import { styles } from './statesummary.styles';
import { StatusSummaryProps } from '../../../types/driver-request/driver';

export function StatusSummary({ currentStation, status, onToggleStatus }: StatusSummaryProps) {
  const isAccepting = status === 'accepting';

  return (
    <View style={styles.statusRow}>
      <View style={styles.statusCard}>
        <Text style={styles.statusCardLabel}>CURRENTLY AT</Text>
        <View style={styles.statusCardValueRow}>
          <Ionicons name="radio-button-on" size={14} color={colors.orange} />
          <Text style={styles.statusCardValue}>{currentStation}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.statusCard} onPress={onToggleStatus}>
        <Text style={styles.statusCardLabel}>STATUS</Text>
        <View style={styles.statusCardValueRow}>
          <Ionicons
            name="checkmark-circle"
            size={14}
            color={isAccepting ? colors.green : colors.textSecondary}
          />
          <Text style={styles.statusCardValue}>{isAccepting ? 'Accepting' : 'Offline'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
