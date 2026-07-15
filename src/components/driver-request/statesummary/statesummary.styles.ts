import { StyleSheet } from "react-native";
import { colors } from "../../../constants/theme";

export const styles = StyleSheet.create({
  statusRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 12,
  },
  statusCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
  },
  statusCardLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  statusCardValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusCardValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});
