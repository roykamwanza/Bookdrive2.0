import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from './../constants/theme';

export const loginstyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: spacing.xl, justifyContent: 'center', flexGrow: 1 },
  
  header: { alignItems: 'center', marginBottom: spacing.xl },
  title: { ...typography.h1, color: colors.text, fontWeight: '800', marginTop: spacing.md },
  subtitle: { ...typography.body, color: colors.muted, marginTop: spacing.xs },
  
  form: { gap: spacing.md },
  button: { 
    backgroundColor: colors.secondary, padding: spacing.md, 
    borderRadius: radius.md, alignItems: 'center', marginTop: spacing.lg 
  },
  buttonText: { ...typography.body, color: colors.textInverse, fontWeight: '700' },
  
  footer: { 
    flexDirection: 'row', justifyContent: 'center', 
    marginTop: spacing.xl 
  },
  footerText: { ...typography.body, color: colors.text },
  signUpLink: { ...typography.body, color: colors.secondary, fontWeight: '700' }
});