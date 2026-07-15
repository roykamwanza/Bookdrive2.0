import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';
import { styles } from './styles';
import { DriverHeaderProps } from '../../../types/driver-request/driver';


export function DriverHeader({ onBack }: DriverHeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} hitSlop={10}>
        <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>QuickBus</Text>
      <View style={styles.driverModeBadge}>
        <View style={styles.liveDot} />
        <Text style={styles.driverModeText}>DRIVER MODE</Text>
      </View>
    </View>
  );
}
