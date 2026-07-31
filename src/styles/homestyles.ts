import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography, radius } from './../constants/theme';

export const homestyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  scroll: { 
    padding: spacing.lg 
  },

  // Personalized Welcome Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  welcomeText: {
    ...typography.caption,
    color: colors.muted,
  },
  nameText: {
    ...typography.h2,
    color: colors.text,
    fontWeight: '800',
  },
  profileBadge: {
    padding: 4,
  },

  // Action Banner ("Where are you headed?")
  bannerCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bannerTitle: {
    ...typography.h2,
    color: colors.text,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  bannerSubtitle: {
    ...typography.body,
    color: colors.muted,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  bannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  bannerBtnText: {
    ...typography.body,
    color: colors.textInverse,
    fontWeight: '700',
    marginRight: 6,
  },

  sectiontitle: { 
    ...typography.h3, 
    color: colors.text, 
    marginBottom: spacing.md 
  },
  
  // Grid
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },
  card: { 
    width: '48%', 
    backgroundColor: colors.surface, 
    borderRadius: radius.lg, 
    padding: spacing.lg, 
    marginBottom: spacing.md,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
      android: { elevation: 5 },
    })
  },
  
  icon: { 
    width: 48, 
    height: 48, 
    borderRadius: radius.md, 
    backgroundColor: colors.secondary, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: spacing.md 
  },
  cardtitle: { 
    ...typography.body, 
    fontWeight: '700', 
    color: colors.text 
  },
  
  // Stats Section
  statsContainer: { 
    marginBottom: spacing.lg 
  },
  statsGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: spacing.md 
  },
  
  // Modern Stat Cards
  statCardModern: { 
    flex: 1, 
    backgroundColor: colors.surface, 
    borderRadius: radius.lg, 
    padding: spacing.md, 
    alignItems: 'center', 
    justifyContent: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6 },
      android: { elevation: 3 },
    })
  },
  statValueLarge: { 
    ...typography.h1, 
    fontWeight: '800', 
    color: colors.text 
  },
  statLabelModern: { 
    ...typography.caption, 
    color: colors.muted, 
    textTransform: 'uppercase', 
    marginTop: 4, 
    letterSpacing: 1 
  },

  // Stat Values
  statValueOrange: { 
    ...typography.h1, 
    fontWeight: '800', 
    color: colors.secondary 
  },
  statValueWhite: { 
    ...typography.h1, 
    fontWeight: '800', 
    color: colors.text 
  },

  // Logout button styles
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    paddingVertical: 12,
  },
  logoutBtnText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.muted,
  },
});