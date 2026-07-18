import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '../../components/card';
import { MapPreview } from '../../components/mappreview';
import { StatusBadge } from '../../components/statusbadge';
import { FareBreakdownRow } from '../../components/farebreakdownrow';
import { PrimaryButton } from '../../components/primarybutton';
import { colors, spacing, typography } from '../../constants/passengertheme';
import { cancelBooking, getBookingById } from '../../services/passengerbookingservice';
import { formatCurrency, formatDateTime } from '../../utils/format';
import type { RootStackParamList } from '../../types';
import type { Booking } from '../../types/booking';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingDetails'>;

const CANCELLABLE_STATUSES: Booking['status'][] = ['requested', 'accepted'];

export default function BookingDetailsScreen({ route, navigation }: Props) {
  const { bookingId } = route.params;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getBookingById(bookingId);
      setBooking(result ?? null);
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCancel() {
    if (!booking) return;

    Alert.alert('Cancel booking?', "This can't be undone.", [
      { text: 'Keep booking', style: 'cancel' },
      {
        text: 'Cancel booking',
        style: 'destructive',
        onPress: async () => {
          setCancelling(true);
          try {
            const updated = await cancelBooking(booking.id, 'Cancelled by passenger');
            setBooking(updated);
          } finally {
            setCancelling(false);
          }
        },
      },
    ]);
  }

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centered]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </SafeAreaView>
    );
  }

  if (!booking) {
    return (
      <SafeAreaView style={[styles.safeArea, styles.centered]}>
        <Text style={styles.notFoundText}>Booking not found.</Text>
        <PrimaryButton label="Back to history" onPress={() => navigation.goBack()} variant="outline" />
      </SafeAreaView>
    );
  }

  const canCancel = CANCELLABLE_STATUSES.includes(booking.status);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <MapPreview
          pickup={booking.pickup.place.location}
          dropoff={booking.dropoff.place.location}
          height={90}
        />

        <Card style={styles.headerCard}>
          <View style={styles.headerTop}>
            <Text style={styles.bookingId}>Booking #{booking.id.replace('bk_', '')}</Text>
            <StatusBadge status={booking.status} />
          </View>
          <Text style={styles.requestedAt}>Requested {formatDateTime(booking.requestedAt)}</Text>
        </Card>

        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Route</Text>
          <RouteStop label="Pickup" title={booking.pickup.place.title} dotColor={colors.mapRoutePickup} />
          <View style={styles.routeConnector} />
          <RouteStop label="Drop-off" title={booking.dropoff.place.title} dotColor={colors.mapRouteDropoff} />
        </Card>

        {booking.driver && (
          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Driver</Text>
            <View style={styles.driverRow}>
              <Text style={styles.driverName}>{booking.driver.name}</Text>
              <Text style={styles.driverMeta}>Rating {booking.driver.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.driverMeta}>Plate: {booking.driver.plateNumber}</Text>
          </Card>
        )}

        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Receipt</Text>
          <FareBreakdownRow label="Base fare" value={formatCurrency(booking.fare.baseFare, booking.fare.currency)} />
          <FareBreakdownRow
            label="Distance fare"
            value={formatCurrency(booking.fare.distanceFare, booking.fare.currency)}
          />
          <FareBreakdownRow
            label="Service fee"
            value={formatCurrency(booking.fare.serviceFee, booking.fare.currency)}
          />
          <View style={styles.divider} />
          <FareBreakdownRow
            label="Total"
            value={formatCurrency(booking.fare.total, booking.fare.currency)}
            emphasize
          />
        </Card>

        {booking.status === 'cancelled' && booking.cancellationReason && (
          <Card style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Cancellation</Text>
            <Text style={styles.driverMeta}>{booking.cancellationReason}</Text>
          </Card>
        )}

        {canCancel && (
          <PrimaryButton
            label="Cancel booking"
            onPress={handleCancel}
            loading={cancelling}
            variant="danger"
            style={styles.cancelButton}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function RouteStop({ label, title, dotColor }: { label: string; title: string; dotColor: string }) {
  return (
    <View style={styles.routeStop}>
      <View style={[styles.routeDot, { backgroundColor: dotColor }]} />
      <View>
        <Text style={styles.routeLabel}>{label}</Text>
        <Text style={styles.routeTitle}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  notFoundText: {
    color: colors.textSecondary,
    fontSize: typography.size.md,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  headerCard: {
    gap: spacing.xxs,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingId: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  requestedAt: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },
  sectionCard: {
    gap: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: spacing.xs,
  },
  routeStop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routeConnector: {
    width: 1,
    height: 14,
    backgroundColor: colors.border,
    marginLeft: 3.5,
  },
  routeLabel: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },
  routeTitle: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
  },
  driverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  driverName: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  driverMeta: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  cancelButton: {
    marginTop: spacing.sm,
  },
});
