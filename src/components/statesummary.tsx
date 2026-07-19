import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors } from '../constants/theme';
import type { DriverStatus } from '../types/driver';
import { styles } from '../styles/statesummarystyles';
import { StatusSummaryProps } from '../types/driver';
import { statusSummaryString } from '../constants/strings';

export function StatusSummary({ currentStation, status, onToggleStatus }: StatusSummaryProps) {
  const { t } = useTranslation();
  const isAccepting = status === 'accepting';

  return (
    <View style={styles.statusRow}>
      <View style={styles.statusCard}>
        <Text style={styles.statusCardLabel}>{t('driver.currentlyAt', statusSummaryString.currentlyAtLabel)}</Text>
        <View style={styles.statusCardValueRow}>
          <Ionicons name="radio-button-on" size={14} color={colors.secondary} />
          <Text style={styles.statusCardValue}>{currentStation}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.statusCard} onPress={onToggleStatus}>
        <Text style={styles.statusCardLabel}>{t('driver.status', statusSummaryString.statusLabel)}</Text>
        <View style={styles.statusCardValueRow}>
          <Ionicons
            name="checkmark-circle"
            size={14}
            color={isAccepting ? colors.success : colors.muted}
          />
          <Text style={styles.statusCardValue}>
            {isAccepting ? t('driver.accepting', statusSummaryString.acceptingLabel) : t('driver.offline', statusSummaryString.offlineLabel)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
