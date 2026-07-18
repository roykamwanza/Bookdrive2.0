import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography, radius } from './../constants/theme';

export const homestyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg },
  
  sectiontitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
  
  // Grid
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { 
    width: '48%', backgroundColor: colors.surface, 
    borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
      android: { elevation: 5 },
    })
  },
  
  icon: { 
    width: 48, height: 48, borderRadius: radius.md, 
    backgroundColor: colors.secondary, 
    justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md 
  },
  cardtitle: { ...typography.body, fontWeight: '700', color: colors.text },
  
  // Stats
  statsContainer: { marginBottom: spacing.lg },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  
  // These new properties resolve your TypeScript errors
  statCardModern: { 
    flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg, 
    padding: spacing.md, alignItems: 'center', justifyContent: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6 },
      android: { elevation: 3 },
    })
  },
  statValueLarge: { ...typography.h1, fontWeight: '800', color: colors.text },
  statLabelModern: { ...typography.caption, color: colors.muted, textTransform: 'uppercase', marginTop: 4, letterSpacing: 1 },

  // Existing stat styles
  statValueOrange: { ...typography.h1, fontWeight: '800', color: colors.secondary },
  statValueWhite: { ...typography.h1, fontWeight: '800', color: colors.text },
});