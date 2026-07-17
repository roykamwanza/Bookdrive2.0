import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../constants/passengertheme';
import type { BookingStatus } from '../types/booking';

interface StatusBadgeProps {
  status: BookingStatus;
}

const CONFIG: Record<BookingStatus, { label: string; bg: string; fg: string }> = {
  draft: { label: 'Draft', bg: colors.border, fg: colors.textSecondary },
  requested: { label: 'Finding driver', bg: colors.infoLight, fg: colors.infoDark },
  accepted: { label: 'Driver assigned', bg: colors.primaryLight, fg: colors.primaryDark },
  in_progress: { label: 'On the way', bg: colors.primaryLight, fg: colors.primaryDark },
  completed: { label: 'Completed', bg: colors.successLight, fg: colors.success },
  cancelled: { label: 'Cancelled', bg: colors.dangerLight, fg: colors.danger },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = CONFIG[status];

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.fg }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radii.pill,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
  },
});
