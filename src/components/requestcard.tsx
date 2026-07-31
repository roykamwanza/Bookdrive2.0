import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, radius, typography } from '../constants/theme';
import { RequestCardProps } from '../types/driver';
import { requestCardString } from '../constants/strings';

export function RequestCard({ request, onAccept, onReject }: RequestCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.cardContainer}>
      {/* Header Info */}
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{request.initials}</Text>
        </View>
        <View style={styles.passengerInfo}>
          <Text style={styles.passengerName}>{request.passengerName}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={13} color={colors.secondary} />
            <Text style={styles.metaText}>{request.pickupEtaMinutes} mins away</Text>
            <Text style={styles.metaDivider}>•</Text>
            <Ionicons name="location-outline" size={13} color={colors.muted} />
            <Text style={styles.metaText}>{request.distanceAwayKm} km</Text>
          </View>
        </View>
        <View style={styles.fareBlock}>
          <Text style={styles.fareAmount}>
            K{request.estimatedFare.toFixed(2)}
          </Text>
          <Text style={styles.fareLabel}>{t('driver.fareLabel', requestCardString.fareLabel)}</Text>
        </View>
      </View>

      {/* Visual Route Timeline */}
      <View style={styles.routeContainer}>
        <View style={styles.routeRow}>
          <View style={styles.dotGreen} />
          <Text style={styles.routeText} numberOfLines={1}>
            {request.pickupLocation || 'Pickup Point'}
          </Text>
        </View>
        <View style={styles.routeConnector} />
        <View style={styles.routeRow}>
          <View style={styles.dotOrange} />
          <Text style={styles.routeText} numberOfLines={1}>
            {request.destination || 'Destination'}
          </Text>
        </View>
      </View>

      {/* Action CTA Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.declineButton}
          onPress={() => onReject(request)}
        >
          <Text style={styles.declineText}>Decline</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => onAccept(request)}
        >
          <Text style={styles.acceptText}>Accept Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  avatarText: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: '700',
  },
  passengerInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  passengerName: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  metaText: {
    ...typography.caption,
    color: colors.muted,
    marginLeft: 3,
  },
  metaDivider: {
    color: colors.border,
    marginHorizontal: 5,
    fontSize: 10,
  },
  fareBlock: {
    alignItems: 'flex-end',
  },
  fareAmount: {
    ...typography.body,
    fontWeight: '800',
    color: colors.secondary,
  },
  fareLabel: {
    ...typography.caption,
    color: colors.muted,
    fontSize: 9,
    fontWeight: '600',
    marginTop: 2,
  },
  routeContainer: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotGreen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#30D158',
  },
  dotOrange: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  routeText: {
    ...typography.body,
    fontSize: 13,
    color: colors.text,
    marginLeft: spacing.sm,
    fontWeight: '600',
    flex: 1,
  },
  routeConnector: {
    width: 1,
    height: 12,
    backgroundColor: colors.border,
    marginLeft: 3.5,
    marginVertical: 2,
    borderStyle: 'dashed',
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  declineButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.error,
  },
  declineText: {
    ...typography.body,
    color: colors.error,
    fontWeight: '700',
  },
  acceptButton: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.secondary,
    alignItems: 'center',
  },
  acceptText: {
    ...typography.body,
    color: colors.textInverse,
    fontWeight: '800',
  },
});
