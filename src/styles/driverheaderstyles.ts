import { StyleSheet } from "react-native";
import { colors } from "../constants/theme";

// NOTE: Dev1's theme.ts doesn't yet expose a distinct "elevated surface"
// tone (only `surface`). Using `colors.surface` here as a stand-in for the
// badge background until a token like `surfaceElevated` is added.

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: colors.secondary,
    fontSize: 17,
    fontWeight: '700',
  },
  driverModeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  driverModeText: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
