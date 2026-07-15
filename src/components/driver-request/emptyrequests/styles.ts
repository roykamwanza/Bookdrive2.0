import { StyleSheet } from "react-native";
import { colors } from "../../../constants/theme";


export const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 80,
  },
  emptyStateText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});
