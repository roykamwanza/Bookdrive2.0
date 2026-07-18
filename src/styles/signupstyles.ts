import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from './../constants/theme';

export const styles = StyleSheet.create({
  // Use the same shared styles from before, 
  // but you can add login-specific overrides here if needed.
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl, // Login header spacing might differ from Sign-Up
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 4,
  },
  form: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  formTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  // Reusing InputGroup styles from signupstyles
  inputGroup: {
    gap: spacing.xs,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: 50,
    color: colors.text,
    fontSize: 15,
  },
  visibilityToggle: {
    padding: spacing.sm,
  },
  button: {
    backgroundColor: colors.secondary,
    height: 52,
    borderRadius: radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonText: {
    color: colors.textInverse,
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    ...typography.body,
    color: colors.muted,
  },
  signUpLink: {
    ...typography.body,
    fontWeight: '700',
    color: colors.secondary,
  },
});