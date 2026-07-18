import React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../constants/theme';
import { styles } from '../styles/previewmapstyles';

// TODO(Dev4): replace this placeholder with the real map layer
// (react-native-maps or equivalent) once location/context wiring is ready.
export function MapPreview() {
  return (
    <View style={styles.mapPlaceholder}>
      <MaterialIcons name="map" size={28} color={colors.muted} />
    </View>
  );
}
