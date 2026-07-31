import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, radius, typography } from '../constants/theme';
import type { TripStage, TripStatusProps } from '../types/driver';
import { tripStatusString } from '../constants/strings';

const STEPS: { key: TripStage }[] = [
  { key: 'requested' },
  { key: 'arrived' },
  { key: 'in-transit' },
  { key: 'completed' },
];

const STAGE_ICON: Record<TripStage, keyof typeof Ionicons.glyphMap> = {
  requested: 'car-sport',
  arrived: 'location',
  'in-transit': 'navigate',
  completed: 'checkmark-circle',
};

export function TripStatusView({ request, onDone, onAdvance }: TripStatusProps) {
  const { t } = useTranslation();
  const stage = request.tripStage || 'requested';
  const stepIndex = STEPS.findIndex((s) => s.key === stage);

  const getStepLabel = (key: TripStage) => {
    switch (key) {
      case 'requested':
        return t('driver.tripStatus.steps.accepted', tripStatusString.steps.accepted);
      case 'arrived':
        return t('driver.tripStatus.steps.arrived', tripStatusString.steps.arrived);
      case 'in-transit':
        return t('driver.tripStatus.steps.inTransit', tripStatusString.steps.inTransit);
      case 'completed':
        return t('driver.tripStatus.steps.completed', tripStatusString.steps.completed);
      default:
        return '';
    }
  };

  const getCtaLabel = (key: TripStage) => {
    switch (key) {
      case 'requested':
        return t('driver.tripStatus.cta.confirmArrival', tripStatusString.cta.confirmArrival);
      case 'arrived':
        return t('driver.tripStatus.cta.startTrip', tripStatusString.cta.startTrip);
      case 'in-transit':
        return t('driver.tripStatus.cta.completeTrip', tripStatusString.cta.completeTrip);
      case 'completed':
        return t('driver.tripStatus.cta.done', tripStatusString.cta.done);
      default:
        return '';
    }
  };

  const getEtaBanner = () => {
    switch (stage) {
      case 'requested':
        return `${request.pickupEtaMinutes || 4} mins away from pickup point`;
      case 'arrived':
        return 'Arrived at pickup location. Waiting for boarding...';
      case 'in-transit':
        return 'Heading to destination. Est. arrival in 12 mins';
      case 'completed':
        return 'Arrived at destination. Trip finished successfully!';
      default:
        return '';
    }
  };

  const handlePress = () => {
    if (stage === 'completed') {
      onDone(request);
    } else {
      onAdvance(request);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Header Profile Info */}
      <View style={styles.headerRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{request.initials}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: spacing.sm }}>
          <Text style={styles.passengerName}>{request.passengerName}</Text>
          <Text style={styles.etaText}>{getEtaBanner()}</Text>
        </View>
        <Ionicons name={STAGE_ICON[stage]} size={24} color={colors.secondary} />
      </View>

      {/* Active Route Address Info */}
      <View style={styles.routeBox}>
        <Text style={styles.routeItem} numberOfLines={1}>
          <Text style={{ color: '#30D158' }}>●</Text> Pickup: {request.pickupLocation || 'Pickup Point'}
        </Text>
        <Text style={styles.routeItem} numberOfLines={1}>
          <Text style={{ color: colors.secondary }}>●</Text> Drop-off: {request.destination || 'Destination'}
        </Text>
      </View>

      {/* Passenger Contact & Fare Info */}
      {stage !== 'completed' && (
        <View style={styles.detailsRow}>
          <View style={styles.contactContainer}>
            <TouchableOpacity 
              style={styles.contactBtn}
              onPress={() => Alert.alert('Contacting Passenger', `Calling ${request.passengerName}...`)}
            >
              <Ionicons name="call" size={14} color={colors.secondary} style={{ marginRight: 4 }} />
              <Text style={styles.contactBtnText}>Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.contactBtn}
              onPress={() => Alert.alert('Contacting Passenger', `Opening chat with ${request.passengerName}...`)}
            >
              <Ionicons name="chatbubble" size={14} color={colors.secondary} style={{ marginRight: 4 }} />
              <Text style={styles.contactBtnText}>Message</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.fareValue}>K{request.estimatedFare.toFixed(2)}</Text>
            <Text style={styles.fareLabel}>EST. FARE</Text>
          </View>
        </View>
      )}

      {/* Stepper Timeline Tracker */}
      <View style={styles.stepperRow}>
        {STEPS.map((step, index) => {
          const isActive = index === stepIndex;
          const isDone = index < stepIndex;
          return (
            <React.Fragment key={step.key}>
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.stepDot,
                    (isActive || isDone) && styles.stepDotFilled,
                  ]}
                />
                <Text
                  style={[
                    styles.stepLabel,
                    isActive && styles.stepLabelActive,
                  ]}
                >
                  {getStepLabel(step.key)}
                </Text>
              </View>
              {index < STEPS.length - 1 && (
                <View
                  style={[
                    styles.stepConnector,
                    isDone && styles.stepConnectorFilled,
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* Action Button */}
      <TouchableOpacity style={styles.ctaButton} onPress={handlePress}>
        <Text style={styles.ctaText}>{getCtaLabel(stage)}</Text>
      </TouchableOpacity>
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
  headerRow: {
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
  passengerName: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
  },
  etaText: {
    ...typography.caption,
    color: colors.secondary,
    fontWeight: '600',
    marginTop: 2,
  },
  routeBox: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  routeItem: {
    ...typography.body,
    fontSize: 13,
    color: colors.text,
    fontWeight: '600',
    marginVertical: 2,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  contactContainer: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
  },
  contactBtnText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
  },
  fareValue: {
    ...typography.body,
    fontWeight: '800',
    color: colors.secondary,
  },
  fareLabel: {
    ...typography.caption,
    fontSize: 9,
    color: colors.muted,
    fontWeight: '600',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.md,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.border,
    marginBottom: 4,
  },
  stepDotFilled: {
    backgroundColor: colors.secondary,
  },
  stepLabel: {
    fontSize: 9,
    color: colors.muted,
    fontWeight: '500',
  },
  stepLabelActive: {
    color: colors.secondary,
    fontWeight: '700',
  },
  stepConnector: {
    height: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginTop: -12,
  },
  stepConnectorFilled: {
    backgroundColor: colors.secondary,
  },
  ctaButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  ctaText: {
    ...typography.body,
    color: colors.textInverse,
    fontWeight: '800',
  },
});
