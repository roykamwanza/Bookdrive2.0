import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { colors, spacing, radius } from '../constants/theme';

export function MapPreview() {
  // Coordinates for Lusaka, Zambia route
  const initialRegion = {
    latitude: -15.3958,
    longitude: 28.3242,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0221,
  };

  const riderCoord = { latitude: -15.3962, longitude: 28.3298 }; // UNZA Great East Gate
  const destinationCoord = { latitude: -15.3958, longitude: 28.3242 }; // East Park Mall

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        userInterfaceStyle="dark"
        customMapStyle={darkMapStyle}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
      >
        <Marker coordinate={riderCoord}>
          <View style={styles.markerContainer}>
            <View style={[styles.markerDot, { backgroundColor: '#30D158' }]} />
          </View>
        </Marker>

        <Marker coordinate={destinationCoord}>
          <View style={styles.markerContainer}>
            <View style={[styles.markerDot, { backgroundColor: colors.secondary }]} />
          </View>
        </Marker>

        <Polyline
          coordinates={[riderCoord, destinationCoord]}
          strokeColor={colors.secondary}
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
}

const darkMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#1C1C1E" }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#8E8E93" }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#1C1C1E" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#2C2C2E" }]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#AEAEB2" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#0F0F12" }]
  }
];

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
  markerContainer: {
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
