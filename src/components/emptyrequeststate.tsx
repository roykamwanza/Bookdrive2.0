import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';
import { styles } from '../styles/emptyrequeststyles';
import { emptyRequestsString } from '../constants/strings';

export function EmptyRequestsState() {
  return (
    <View style={styles.emptyState}>
      <Ionicons name="time-outline" size={32} color={colors.muted} />
      <Text style={styles.emptyStateText}>{emptyRequestsString.message}</Text>
    </View>
  );
}