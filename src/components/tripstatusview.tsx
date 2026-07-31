import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { styles } from '../styles/tripstatusviewstyles';
import { colors } from '../constants/theme';
import type { TripStage } from '../types/driver';
import type { TripStatusProps } from '../types/driver';
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

  const handlePress = () => {
    if (stage === 'completed') {
      onDone(request);
    } else {
      onAdvance(request);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons name={STAGE_ICON[stage]} size={22} color={colors.secondary} />
        <Text style={styles.passengerName}>{request.passengerName}</Text>
      </View>

      {/* Active Route Address Info */}
      <View style={{ backgroundColor: colors.background, padding: 12, borderRadius: 8, marginVertical: 10, borderWidth: 1, borderColor: colors.border }}>
        <Text style={{ color: colors.text, fontSize: 13, fontWeight: '600', marginBottom: 4 }} numberOfLines={1}>
          <Text style={{ color: '#30D158' }}>●</Text> Pickup: {request.pickupLocation || 'Pickup Point'}
        </Text>
        <Text style={{ color: colors.text, fontSize: 13, fontWeight: '600' }} numberOfLines={1}>
          <Text style={{ color: colors.secondary }}>●</Text> Drop-off: {request.destination || 'Destination'}
        </Text>
      </View>

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

      <TouchableOpacity style={styles.ctaButton} onPress={handlePress}>
        <Text style={styles.ctaText}>{getCtaLabel(stage)}</Text>
      </TouchableOpacity>
    </View>
  );
}
