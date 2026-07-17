import { StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

// NOTE: using colors.surface as a stand-in for an "elevated surface" tone
// (avatar, reject button) until Dev1 adds a distinct token for it.

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
    borderWidth: 1,
    borderColor: colors.muted, 
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: colors.textInverse,
    fontSize: 13,
    fontWeight: '700',
  },
  requestInfo: {
    flex: 1,
  },
  passengerName: {
    color: colors.textInverse,
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
    color: colors.muted,
    fontSize: 12,
  },
  fareBlock: {
    alignItems: 'flex-end',
  },
  fareAmount: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: '700',
  },
  fareLabel: {
    color: colors.muted,
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
    opacity: .7,
    backgroundColor: colors.error,
    alignItems: 'center',
  },
  rejectText: {
    color: colors.textInverse,
    opacity: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    alignItems: 'center',
  },
  acceptText: {
    color: colors.textInverse,
    fontSize: 13,
    fontWeight: '700',
  },
});
