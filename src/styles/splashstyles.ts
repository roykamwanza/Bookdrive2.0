import { StyleSheet } from 'react-native';
import { colors, typography } from './../constants/theme';

export const splashstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
  },
  brandName: {
    ...typography.h1,
    color: colors.textInverse,
    fontWeight: '800',
    marginTop: 20,
    letterSpacing: 2,
  },
});