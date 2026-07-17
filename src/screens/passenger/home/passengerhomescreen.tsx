import React, { useState } from 'react';
import {
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
import { PrimaryButton } from '../../../components/primarybutton';
import { LocationSearchInput } from '../../../components/locationsearchinput';
import { colors, radii, spacing, typography } from '../../../constants/passengertheme';
import { useCurrentLocation } from '../../../hooks/usecurrentlocation';
import type { PassengerStackParamList } from '../../../navigation/passengertypes';
import type { PlaceResult } from '../../../types/booking';
import { reverseGeocode } from '../../../services/passengerbookingservice';

type Props = NativeStackScreenProps<PassengerStackParamList, 'Home'>;

export function PassengerHomeScreen({ navigation }: Props) {
  const { location, loading, error, permissionDenied, refresh } = useCurrentLocation();
  const [dropoff, setDropoff] = useState<PlaceResult | null>(null);

  async function handleQuickBook() {
    const pickup = location ? await reverseGeocode(location) : undefined;
    navigation.navigate('Booking', { pickup, dropoff: dropoff ?? undefined });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconGlyph}>≡</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('BookingHistory')}>
            <Text style={styles.historyLink}>History</Text>
          </TouchableOpacity>
        </View>

        <MapPreview currentLocation={location} height={170} />

        {permissionDenied && (
          <Card style={styles.noticeCard}>
            <Text style={styles.noticeText}>
              Location access is off, so we can't set your pickup automatically.
            </Text>
            <PrimaryButton label="Enable location" onPress={refresh} variant="outline" />
          </Card>
        )}

        {error && !permissionDenied && (
          <Card style={styles.noticeCard}>
            <Text style={styles.noticeText}>{error}</Text>
          </Card>
        )}

        <Text style={styles.greeting}>Where are you headed?</Text>

        <LocationSearchInput
          label="Drop-off"
          placeholder="Search destination"
          value={dropoff}
          onSelect={setDropoff}
          dotColor={colors.mapRouteDropoff}
        />

        <PrimaryButton
          label="Book a ride"
          onPress={handleQuickBook}
          disabled={loading}
          style={styles.bookButton}
        />

        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.quickActionsRow}>
          <QuickAction label="New booking" onPress={() => navigation.navigate('Booking', {})} />
          <QuickAction label="History" onPress={() => navigation.navigate('BookingHistory')} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickAction({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.quickAction} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconGlyph: {
    fontSize: typography.size.md,
    color: colors.textPrimary,
  },
  historyLink: {
    color: colors.primary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
  },
  noticeCard: {
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  noticeText: {
    color: colors.textSecondary,
    fontSize: typography.size.sm,
    marginBottom: spacing.xs,
  },
  greeting: {
    marginTop: spacing.md,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  bookButton: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textSecondary,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quickAction: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  quickActionLabel: {
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
    fontSize: typography.size.sm,
  },
});
