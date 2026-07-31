import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../constants/theme';

export function MapPreview() {
  return (
    <View style={styles.mapContainer}>
      <View style={styles.mapBackground}>
        {/* Grid Lines */}
        <View style={styles.gridLineH1} />
        <View style={styles.gridLineH2} />
        <View style={styles.gridLineV1} />
        <View style={styles.gridLineV2} />

        {/* Route Path */}
        <View style={styles.routePathContainer}>
          <View style={styles.routeConnector} />
          <View style={styles.movingVehicle}>
            <Ionicons name="bus" size={14} color={colors.secondary} />
          </View>
        </View>

        {/* Pins */}
        <View style={[styles.mapPin, styles.pickupPin]}>
          <Ionicons name="location" size={20} color="#30D158" />
          <View style={styles.pinLabel}>
            <Text style={styles.pinLabelText}>Rider</Text>
          </View>
        </View>

        <View style={[styles.mapPin, styles.destPin]}>
          <Ionicons name="location" size={20} color={colors.secondary} />
          <View style={styles.pinLabel}>
            <Text style={styles.pinLabelText}>Drop-off</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 150,
    marginHorizontal: spacing.lg,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#0F0F12',
    position: 'relative',
  },
  gridLineH1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '33%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  gridLineH2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '66%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  gridLineV1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '33%',
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  gridLineV2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '66%',
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  routePathContainer: {
    position: 'absolute',
    top: '45%',
    left: '25%',
    right: '25%',
    height: 20,
    justifyContent: 'center',
  },
  routeConnector: {
    height: 2,
    backgroundColor: colors.secondary,
    borderRadius: 1,
    opacity: 0.5,
  },
  movingVehicle: {
    position: 'absolute',
    left: '45%',
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 3,
    borderRadius: 10,
    top: -9,
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
  },
  pickupPin: {
    top: '35%',
    left: '12%',
  },
  destPin: {
    top: '30%',
    right: '12%',
  },
  pinLabel: {
    backgroundColor: colors.surface,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 2,
  },
  pinLabelText: {
    color: colors.text,
    fontSize: 8,
    fontWeight: '600',
  },
});
