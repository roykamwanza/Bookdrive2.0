import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '../../../components/card';
import { MapPreview } from '../../../components/mappreview';
import { LocationSearchInput } from '../../../components/locationsearchinput';
import { FareBreakdownRow } from '../../../components/farebreakdownrow';
import { PrimaryButton } from '../../../components/primarybutton';
import { colors, radii, spacing, typography } from '../../../constants/passengertheme';
import { createBooking, getFareEstimate } from '../../../services/passengerbookingservice';
import { formatCurrency, formatDistanceKm, formatEta } from '../../../utils/format';
import type { PassengerStackParamList } from '../../../navigation/passengertypes';
import type { FareEstimate, PlaceResult, VehicleType } from '../../../types/booking';

type Props = NativeStackScreenProps<PassengerStackParamList, 'Booking'>;

// TODO: replace with the authenticated passenger id from AuthContext.
const CURRENT_PASSENGER_ID = 'passenger_demo';

const VEHICLE_OPTIONS: { type: VehicleType; label: string }[] = [
  { type: 'shared', label: 'Shared' },
  { type: 'standard', label: 'Standard' },
  { type: 'xl', label: 'XL' },
];

export function BookingScreen({ route, navigation }: Props) {
  const [pickup, setPickup] = useState<PlaceResult | null>(route.params?.pickup ?? null);
  const [dropoff, setDropoff] = useState<PlaceResult | null>(route.params?.dropoff ?? null);
  const [vehicleType, setVehicleType] = useState<VehicleType>(
    route.params?.vehicleType ?? 'standard'
  );
  const [fare, setFare] = useState<FareEstimate | null>(null);
  const [estimating, setEstimating] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const canEstimate = Boolean(pickup && dropoff);

  useEffect(() => {
    let cancelled = false;

    async function loadEstimate() {
      if (!pickup || !dropoff) {
        setFare(null);
        return;
      }
      setEstimating(true);
      try {
        const estimate = await getFareEstimate(pickup, dropoff, vehicleType);
        if (!cancelled) setFare(estimate);
      } finally {
        if (!cancelled) setEstimating(false);
      }
    }

    loadEstimate();
    return () => {
      cancelled = true;
    };
  }, [pickup, dropoff, vehicleType]);

  async function handleConfirm() {
    if (!pickup || !dropoff) return;

    setSubmitting(true);
    try {
      const booking = await createBooking({
        passengerId: CURRENT_PASSENGER_ID,
        pickup,
        dropoff,
        vehicleType,
      });
      navigation.replace('BookingDetails', { bookingId: booking.id });
    } catch (e) {
      Alert.alert('Booking failed', 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <MapPreview pickup={pickup?.location} dropoff={dropoff?.location} height={110} />

        <Card style={styles.routeCard}>
          <LocationSearchInput
            label="Pickup"
            placeholder="Where should we pick you up?"
            value={pickup}
            onSelect={setPickup}
            dotColor={colors.mapRoutePickup}
          />
          <View style={styles.divider} />
          <LocationSearchInput
            label="Drop-off"
            placeholder="Where are you going?"
            value={dropoff}
            onSelect={setDropoff}
            dotColor={colors.mapRouteDropoff}
          />
        </Card>

        <Text style={styles.sectionTitle}>Vehicle type</Text>
        <View style={styles.vehicleRow}>
          {VEHICLE_OPTIONS.map((option) => {
            const selected = option.type === vehicleType;
            return (
              <TouchableOpacity
                key={option.type}
                onPress={() => setVehicleType(option.type)}
                style={[styles.vehicleOption, selected && styles.vehicleOptionSelected]}
                activeOpacity={0.85}
              >
                <Text style={[styles.vehicleLabel, selected && styles.vehicleLabelSelected]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Card style={styles.fareCard}>
          {!canEstimate && (
            <Text style={styles.placeholderText}>
              Choose a pickup and drop-off to see your fare estimate.
            </Text>
          )}

          {canEstimate && estimating && (
            <View style={styles.estimatingRow}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.placeholderText}>Calculating fare…</Text>
            </View>
          )}

          {canEstimate && !estimating && fare && (
            <View>
              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{formatDistanceKm(fare.distanceKm)}</Text>
                <Text style={styles.metaDivider}>•</Text>
                <Text style={styles.metaText}>~{formatEta(fare.etaMinutes)}</Text>
              </View>
              <FareBreakdownRow label="Base fare" value={formatCurrency(fare.baseFare, fare.currency)} />
              <FareBreakdownRow
                label="Distance fare"
                value={formatCurrency(fare.distanceFare, fare.currency)}
              />
              <FareBreakdownRow
                label="Service fee"
                value={formatCurrency(fare.serviceFee, fare.currency)}
              />
              <View style={styles.divider} />
              <FareBreakdownRow
                label="Total"
                value={formatCurrency(fare.total, fare.currency)}
                emphasize
              />
            </View>
          )}
        </Card>

        <PrimaryButton
          label="Confirm booking"
          onPress={handleConfirm}
          disabled={!canEstimate || estimating}
          loading={submitting}
          style={styles.confirmButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  routeCard: {
    gap: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,
  },
  vehicleRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  vehicleOption: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  vehicleOptionSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  vehicleLabel: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
  },
  vehicleLabelSelected: {
    color: colors.primaryDark,
    fontWeight: typography.weight.semibold,
  },
  fareCard: {},
  placeholderText: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
  },
  estimatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  metaText: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    fontWeight: typography.weight.medium,
  },
  metaDivider: {
    color: colors.textMuted,
  },
  confirmButton: {
    marginTop: spacing.sm,
  },
});
