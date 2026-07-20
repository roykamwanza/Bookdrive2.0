import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './../constants/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: spacing.lg },
  form: { gap: spacing.md },
  
  // The combined style for pill-shaped, white-text inputs
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 50, // Pill shape
    paddingHorizontal: 20,
    height: 55,
    marginVertical: 8,
  },
  
  // Added properties to resolve TypeScript errors
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    color: '#FFFFFF', // Adjust based on your theme
    fontSize: 14,
    marginBottom: 4,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  button: { 
    backgroundColor: colors.secondary, 
    height: 55, 
    borderRadius: 50, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: spacing.md 
  },
  buttonText: { color: colors.textInverse, fontWeight: '700', fontSize: 16 },
  
  roleContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  roleButton: { 
    flex: 1, 
    padding: 15, 
    borderRadius: 50, 
    alignItems: 'center', 
    marginHorizontal: 5 
  },
});