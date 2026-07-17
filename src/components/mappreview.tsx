import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../constants/passengertheme';
import type { GeoPoint } from '../types/booking';

interface MapPreviewProps {
  currentLocation?: GeoPoint | null;
  pickup?: GeoPoint | null;
  dropoff?: GeoPoint | null;
  height?: number;
}

/**
 * Lightweight illustrative map placeholder — a light-blue panel with pin
 * markers for whichever points are set. This has no native dependency
 * (no react-native-maps / Google Maps API key required), so it renders
 * immediately in Expo Go.
 *
 * To swap in a real live map later: install `react-native-maps`, then
 * replace the body of this component with a <MapView> — every screen
 * that imports MapPreview keeps working unchanged since the props
 * (currentLocation / pickup / dropoff / height) stay the same.
 */
export function MapPreview({ currentLocation, pickup, dropoff, height = 220 }: MapPreviewProps) {
  const showRoute = Boolean(pickup && dropoff);

  return (
    <View style={[styles.container, { height }]}>
      {showRoute ? (
        <View style={styles.routeRow}>
          <View style={styles.pin}>
            <View style={[styles.dot, { backgroundColor: colors.mapRoutePickup }]} />
            <Text style={styles.pinLabel}>Pickup</Text>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.pin}>
            <View style={[styles.dot, { backgroundColor: colors.mapRouteDropoff }]} />
            <Text style={styles.pinLabel}>Drop-off</Text>
          </View>
        </View>
      ) : currentLocation ? (
        <View style={styles.centeredPin}>
          <View style={[styles.dot, { backgroundColor: colors.info }]} />
          <Text style={styles.pinLabel}>You are here</Text>
        </View>
      ) : (
        <Text style={styles.placeholderText}>Map preview</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: radii.lg,
    backgroundColor: colors.infoLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: colors.info,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  routeLine: {
    width: 40,
    height: 2,
    backgroundColor: colors.info,
  },
  pin: {
    alignItems: 'center',
    gap: spacing.xxs,
  },
  centeredPin: {
    alignItems: 'center',
    gap: spacing.xxs,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  pinLabel: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
    fontWeight: typography.weight.medium,
  },
});
