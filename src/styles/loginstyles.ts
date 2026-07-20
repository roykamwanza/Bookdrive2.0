import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography, radius } from './../constants/theme';

// Define the shape of your styles
interface LoginStyles {
  container: ViewStyle;
  scrollContent: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  form: ViewStyle;
  inputContainer: ViewStyle;
  inputText: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
  footer: ViewStyle;
  footerText: TextStyle;
  signUpLink: TextStyle;
}

export const loginstyles = StyleSheet.create<LoginStyles>({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: spacing.xl, justifyContent: 'center', flexGrow: 1 },
  
  header: { alignItems: 'center', marginBottom: spacing.xl },
  title: { ...typography.h1, color: colors.text, fontWeight: '800', marginTop: spacing.md },
  subtitle: { ...typography.body, color: colors.muted, marginTop: spacing.xs },
  
  form: { gap: spacing.md },
  
  inputContainer: {
    flexDirection: 'row', // Added to allow icon + input alignment
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 50, // Pill shape
    paddingHorizontal: 16,
    height: 55,
    marginVertical: 8,
  },
  inputText: {
    flex: 1,
    marginLeft: 12,
    color: '#FFFFFF',
    ...typography.body,
  },

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