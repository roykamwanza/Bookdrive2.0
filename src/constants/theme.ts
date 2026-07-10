// BookDrive brand theme
// One primary + one secondary color, per the project's design brief.
// TODO: set these once your team locks in the brand colors in Stitch.

export const colors = {
  primary: '#000000', // TODO: primary brand color
  secondary: '#000000', // TODO: secondary brand color
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#121212',
  textInverse: '#FFFFFF',
  muted: '#8A8A8A',
  border: '#E0E0E0',
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
