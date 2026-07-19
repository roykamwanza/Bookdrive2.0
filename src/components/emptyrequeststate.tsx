import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors } from '../constants/theme';
import { styles } from '../styles/emptyrequeststyles';

export function EmptyRequestsState() {
  const { t } = useTranslation();

  return (
    <View style={styles.emptyState}>
      <Ionicons name="time-outline" size={32} color={colors.muted} />
      <Text style={styles.emptyStateText}>{t('driver.emptyMessage', 'No requests right now')}</Text>
    </View>
  );
}