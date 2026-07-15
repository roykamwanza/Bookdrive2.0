// BookDrive brand theme - Updated for UI System Alignment

export const colors = {
  primary: '#121212',       // Off-Black
  secondary: '#FF6B00',     // Safety Orange
  surface: '#131211',       // New Surface/Container shade
  muted: '#797676',         // New TextSecondary shade
  
  // Retaining support colors for accessibility/logic
  background: '#FFFFFF',
  text: '#121212',
  textInverse: '#FFFFFF',
  border: '#E0E0E0',
  success: '#2E7D32',
  error: '#D32F2F',
  bg: '#121212',
  surfaceAlt: '#232326',
  orange: '#FF6B00',
  green: '#2ECC71',
  red: '#3A2323',
  redText: '#FF6B6B',
  textPrimary: '#FFFFFF',
  textSecondary: '#9A9A9E',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  pill: 999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const },
  h2: { fontSize: 22, fontWeight: '700' as const },
  h3: { fontSize: 18, fontWeight: '600' as const },
  body: { fontSize: 15, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
};

const theme = { colors, spacing, radius, typography };

export default theme;