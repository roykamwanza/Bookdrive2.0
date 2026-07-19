// BookDrive brand theme
// One primary + one secondary color, per the project's design brief.

export const colors = {
  primary: '#121212',      // Off-Black
  secondary: '#FF6B00',    // Safety Orange
  background: '#121212',   // Off-Black
  surface: '#1C1C1E',      // Dark Surface
  text: '#FFFFFF',         // White text
  textInverse: '#FFFFFF',
  muted: '#8A8A8A',
  border: '#2C2C2E',       // Dark Border
  success: '#2E7D32',
  error: '#D32F2F',
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