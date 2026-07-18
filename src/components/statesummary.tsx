import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';
import type { DriverStatus } from '../types/driver';
import { styles } from '../styles/statesummarystyles';
import { StatusSummaryProps } from '../types/driver';
import { statusSummaryString } from '../constants/strings';

export function StatusSummary({ currentStation, status, onToggleStatus }: StatusSummaryProps) {
  const isAccepting = status === 'accepting';

  return (
    <View style={styles.statusRow}>
      <View style={styles.statusCard}>
        <Text style={styles.statusCardLabel}>{statusSummaryString.currentlyAtLabel}</Text>
        <View style={styles.statusCardValueRow}>
          <Ionicons name="radio-button-on" size={14} color={colors.secondary} />
          <Text style={styles.statusCardValue}>{currentStation}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.statusCard} onPress={onToggleStatus}>
        <Text style={styles.statusCardLabel}>{statusSummaryString.statusLabel}</Text>
        <View style={styles.statusCardValueRow}>
          <Ionicons
            name="checkmark-circle"
            size={14}
            color={isAccepting ? colors.success : colors.muted}
          />
          <Text style={styles.statusCardValue}>
            {isAccepting ? statusSummaryString.acceptingLabel : statusSummaryString.offlineLabel}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
