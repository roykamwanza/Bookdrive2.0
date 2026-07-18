import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '../../components/card';
import { StatusBadge } from '../../components/statusbadge';
import { colors, spacing, typography } from '../../constants/passengertheme';
import { getBookingHistory } from '../../services/passengerbookingservice';
import { formatCurrency, formatDateTime } from '../../utils/format';
import type { RootStackParamList } from '../../types';
import type { Booking } from '../../types/booking';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingHistory'>;

const CURRENT_PASSENGER_ID = 'passenger_demo';

export default function BookingHistoryScreen({ navigation }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    try {
      const history = await getBookingHistory(CURRENT_PASSENGER_ID);
      setBookings(history);
    } finally {
      isRefresh ? setRefreshing(false) : setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => load(true)} tintColor={colors.primary} />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No bookings yet</Text>
              <Text style={styles.emptySubtitle}>Rides you request will show up here.</Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <BookingRow
            booking={item}
            onPress={() => navigation.navigate('BookingDetails', { bookingId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
}

function BookingRow({ booking, onPress }: { booking: Booking; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <Card style={styles.row}>
        <View style={styles.rowTop}>
          <Text style={styles.routeText} numberOfLines={1}>
            {booking.pickup.place.title} to {booking.dropoff.place.title}
          </Text>
          <StatusBadge status={booking.status} />
        </View>
        <View style={styles.rowBottom}>
          <Text style={styles.dateText}>{formatDateTime(booking.requestedAt)}</Text>
          <Text style={styles.fareText}>
            {formatCurrency(booking.fare.total, booking.fare.currency)}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.md,
    gap: spacing.sm,
    flexGrow: 1,
  },
  row: {
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  routeText: {
    flex: 1,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  rowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },
  fareText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: spacing.xxl,
    gap: spacing.xs,
  },
  emptyTitle: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },
});
