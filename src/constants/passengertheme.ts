export const colors = {
  // Primary brand color — orange, used for the single main action per screen
  primary: '#FF7A45',
  primaryDark: '#E05F2A',
  primaryLight: '#FFE9DE',

  // Info / map placeholder tint (blue) — used for "searching" status and map boxes
  info: '#2F6FED',
  infoDark: '#1F4FBF',
  infoLight: '#E8EFFF',

  success: '#22A06B',
  successLight: '#E4F6ED',
  warning: '#F5A623',
  danger: '#E5484D',
  dangerLight: '#FBE7E8',

  background: '#000000',
  surface: '#1A1A1A',

  textPrimary: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textInverse: '#000000',
  textMuted: '#808080',

  border: '#333333',
  borderStrong: '#444444',

  mapRoutePickup: '#22A06B',
  mapRouteDropoff: '#E5484D',
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  size: { xs: 11, sm: 13, md: 15, lg: 18, xl: 22, xxl: 28 },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const theme = { colors, spacing, radii, typography };
export type Theme = typeof theme;
export default theme;
