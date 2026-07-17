import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/driver-request/tripstatusviewstyles';
import { colors } from '../../constants/theme';
import { useTripStatus } from '../../hooks/driver-request/usetripstatus';
import type { TripStage } from '../../types/driver-request/driver';
import type { TripStatusProps } from '../../types/driver-request/driver';

const STEPS: { key: TripStage; label: string }[] = [
  { key: 'requested', label: 'Accepted' },
  { key: 'arrived', label: 'Arrived' },
  { key: 'in-transit', label: 'In Transit' },
  { key: 'completed', label: 'Completed' },
];

const CTA_LABEL: Record<TripStage, string> = {
  requested: 'Confirm Arrival',
  arrived: 'Start Trip',
  'in-transit': 'Complete Trip',
  completed: 'Done',
};

const STAGE_ICON: Record<TripStage, keyof typeof Ionicons.glyphMap> = {
  requested: 'car-sport',
  arrived: 'location',
  'in-transit': 'navigate',
  completed: 'checkmark-circle',
};

export function TripStatusView({ request, onDone }: TripStatusProps) {
  const { stage, advance, reset } = useTripStatus();
  const stepIndex = STEPS.findIndex((s) => s.key === stage);

  const handlePress = () => {
    if (stage === 'completed') {
      reset();
      onDone(request);
    } else {
      advance();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons name={STAGE_ICON[stage]} size={22} color={colors.secondary} />
        <Text style={styles.passengerName}>{request.passengerName}</Text>
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
                  {step.label}
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
        <Text style={styles.ctaText}>{CTA_LABEL[stage]}</Text>
      </TouchableOpacity>
    </View>
  );
}
