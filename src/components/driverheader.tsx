import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors } from '../constants/theme';
import { styles } from '../styles/driverheaderstyles';
import { DriverHeaderProps } from '../types/driver';

export function DriverHeader({ onBack }: DriverHeaderProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} hitSlop={10}>
        <Ionicons name="arrow-back" size={22} color={colors.textInverse} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{t('driver.brandName', 'BOOKDRIVE')}</Text>
      <View style={styles.driverModeBadge}>
        <View style={styles.liveDot} />
        <Text style={styles.driverModeText}>{t('driver.modeLabel', 'DRIVER MODE')}</Text>
      </View>
    </View>
  );
}
