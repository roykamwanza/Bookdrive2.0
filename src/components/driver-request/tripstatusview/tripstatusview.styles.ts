import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textContainer: {
    marginLeft: spacing.sm,
  },
  statusLabel: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '700',
  },
  message: {
    color: colors.textInverse,
    fontSize: 14,
    marginTop: 2,
  },
});