import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';
import { styles } from './styles';

export function EmptyRequestsState() {
  return (
    <View style={styles.emptyState}>
      <Ionicons name="time-outline" size={32} color={colors.textSecondary} />
      <Text style={styles.emptyStateText}>No requests right now</Text>
    </View>
  );
}
