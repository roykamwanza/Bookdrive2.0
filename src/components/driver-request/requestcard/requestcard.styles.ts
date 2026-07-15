import { StyleSheet } from "react-native";
import { colors } from "../../../constants/theme";

export const styles = StyleSheet.create({
  requestCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
  requestInfo: {
    flex: 1,
  },
  passengerName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  distanceText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  fareBlock: {
    alignItems: 'flex-end',
  },
  fareAmount: {
    color: colors.orange,
    fontSize: 15,
    fontWeight: '700',
  },
  fareLabel: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  rejectButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
  },
  rejectText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: colors.orange,
    alignItems: 'center',
  },
  acceptText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
  },
});