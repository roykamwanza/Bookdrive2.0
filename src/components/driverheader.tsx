import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';
import { styles } from '../styles/driverheaderstyles';
import { DriverHeaderProps } from '../types/driver';
import { driverHeaderString } from '../constants/strings';

export function DriverHeader({ onBack }: DriverHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} hitSlop={10}>
        <Ionicons name="arrow-back" size={22} color={colors.textInverse} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{driverHeaderString.brandName}</Text>
      <View style={styles.driverModeBadge}>
        <View style={styles.liveDot} />
        <Text style={styles.driverModeText}>{driverHeaderString.modeLabel}</Text>
      </View>
    </View>
  );
}
