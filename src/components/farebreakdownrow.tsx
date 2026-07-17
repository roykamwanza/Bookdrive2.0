import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../constants/passengertheme';

interface FareBreakdownRowProps {
  label: string;
  value: string;
  emphasize?: boolean;
}

export function FareBreakdownRow({ label, value, emphasize = false }: FareBreakdownRowProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, emphasize && styles.emphasizedLabel]}>{label}</Text>
      <Text style={[styles.value, emphasize && styles.emphasizedValue]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xxs,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
  },
  emphasizedLabel: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
  emphasizedValue: {
    color: colors.textPrimary,
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },
});
