import { StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl * 2,
  },
  title: {
    ...typography.h1,
    fontSize: 48,
    color: colors.secondary, // Safety Orange
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  loader: {
    marginTop: spacing.lg,
  },
  selectionContainer: {
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    gap: spacing.md,
  },
  button: {
    width: '100%',
    backgroundColor: colors.secondary,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverButton: {
    backgroundColor: colors.primary, // Off-Black
  },
  buttonText: {
    color: colors.textInverse,
    ...typography.body,
    fontWeight: 'bold',
  },
});
