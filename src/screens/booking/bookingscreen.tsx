import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  Animated,
  ScrollView
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography, radius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { BOOKING_STATUS } from '../../constants/app';
import { Booking, Location } from '../../types';
import { RIDE_OPTIONS } from '../../hooks/usebookingscreen';

interface BookingScreenProps {
  pickup: Location | null;
  destination: Location | null;
  focusedField: 'pickup' | 'destination' | null;
  setFocusedField: (field: 'pickup' | 'destination' | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRide: string;
  setSelectedRide: (ride: string) => void;
  isRequesting: boolean;
  pulseScale: Animated.Value;
  pulseOpacity: Animated.Value;
  filteredLocations: Location[];
  handleSelectLocation: (loc: Location) => void;
  getEstimatedFare: (multiplier: number) => number;
  handleRequestRide: () => void;
  handleCancelRequest: () => void;
  activeBooking: Booking | null;
  navigation: any;
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

export default function BookingScreen({
  pickup,
  destination,
  focusedField,
  setFocusedField,
  searchQuery,
  setSearchQuery,
  selectedRide,
  setSelectedRide,
  isRequesting,
  pulseScale,
  pulseOpacity,
  filteredLocations,
  handleSelectLocation,
  getEstimatedFare,
  handleRequestRide,
  handleCancelRequest,
  activeBooking
}: BookingScreenProps) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Autocomplete Search Focus Panel Overlay */}
      {focusedField && (
        <View style={styles.autocompleteOverlay}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.overlayHeader}>
              <TouchableOpacity onPress={() => setFocusedField(null)} style={styles.closeOverlayBtn}>
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={styles.overlayTitle}>
                {focusedField === 'pickup' ? 'Select Pickup Location' : 'Select Destination'}
              </Text>
            </View>
            <View style={styles.searchBarContainer}>
              <Ionicons name="search" size={20} color={colors.secondary} style={{ marginRight: spacing.sm }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Type location..."
                placeholderTextColor={colors.muted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close" size={20} color={colors.muted} />
                </TouchableOpacity>
              )}
            </View>

            <FlatList
              data={filteredLocations}
              keyExtractor={(item) => item.label}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelectLocation(item)}>
                  <View style={styles.suggestionPin}>
                    <Ionicons name="location-sharp" size={18} color={colors.secondary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.suggestionLabel}>{item.label}</Text>
                    <Text style={styles.suggestionSublabel}>Lusaka, Zambia</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={colors.border} />
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.suggestionList}
            />
          </SafeAreaView>
        </View>
      )}

      {/* Pulsing Sonar Request Matching Screen overlay */}
      {(isRequesting || (activeBooking && activeBooking.status === BOOKING_STATUS.PENDING)) && (
        <View style={styles.matchingOverlay}>
          <SafeAreaView style={styles.matchingContent}>
            <Text style={styles.matchingTitle}>Finding Drivers...</Text>
            <Text style={styles.matchingSubtitle}>Contacting standard minibuses and express shuttles nearby</Text>
            
            <View style={styles.sonarContainer}>
              <Animated.View
                style={[
                  styles.sonarRing,
                  {
                    transform: [{ scale: pulseScale }],
                    opacity: pulseOpacity,
                  },
                ]}
              />
              <View style={styles.sonarCore}>
                <Ionicons name="bus" size={40} color={colors.primary} />
              </View>
            </View>

            <View style={styles.matchingRouteDetails}>
              <View style={styles.matchingDetailsCard}>
                <Text style={styles.routeItemText} numberOfLines={1}>
                  <Ionicons name="pin" color={colors.secondary} size={14} /> Pickup: {pickup?.label || activeBooking?.pickup.label}
                </Text>
                <Text style={styles.routeItemText} numberOfLines={1}>
                  <Ionicons name="location" color={colors.secondary} size={14} /> Dropoff: {destination?.label || activeBooking?.destination.label}
                </Text>
                <Text style={styles.routeItemFare}>
                  Est. Fare: K{activeBooking?.fare || getEstimatedFare(1)}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.cancelRequestBtn} onPress={handleCancelRequest}>
              <Text style={styles.cancelRequestText}>Cancel Request</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      )}

      {/* Main Booking Screen */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Plan Your Trip</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Destination and Pickup Form */}
        <View style={styles.formContainer}>
          {/* Pickup Field */}
          <TouchableOpacity style={styles.formField} onPress={() => setFocusedField('pickup')}>
            <View style={styles.pinDotGreen} />
            <Text style={[styles.fieldValue, !pickup && styles.fieldPlaceholder]} numberOfLines={1}>
              {pickup ? pickup.label : 'Choose pickup location'}
            </Text>
            <Ionicons name="search" size={18} color={colors.muted} />
          </TouchableOpacity>

          {/* Dotted connecting line */}
          <View style={styles.formDivider} />

          {/* Destination Field */}
          <TouchableOpacity style={styles.formField} onPress={() => setFocusedField('destination')}>
            <View style={styles.pinDotOrange} />
            <Text style={[styles.fieldValue, !destination && styles.fieldPlaceholder]} numberOfLines={1}>
              {destination ? destination.label : 'Enter destination'}
            </Text>
            <Ionicons name="search" size={18} color={colors.muted} />
          </TouchableOpacity>
        </View>

        {/* Real Live Map */}
        <View style={styles.mapSimulatorContainer}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={{
              latitude: pickup ? pickup.latitude : -15.4167,
              longitude: pickup ? pickup.longitude : 28.2833,
              latitudeDelta: 0.0822,
              longitudeDelta: 0.0421,
            }}
            region={pickup && destination ? {
              latitude: (pickup.latitude + destination.latitude) / 2,
              longitude: (pickup.longitude + destination.longitude) / 2,
              latitudeDelta: Math.max(Math.abs(pickup.latitude - destination.latitude) * 1.6, 0.015),
              longitudeDelta: Math.max(Math.abs(pickup.longitude - destination.longitude) * 1.6, 0.015),
            } : undefined}
            userInterfaceStyle="dark"
            customMapStyle={darkMapStyle}
          >
            {pickup && (
              <Marker coordinate={{ latitude: pickup.latitude, longitude: pickup.longitude }}>
                <View style={styles.markerContainer}>
                  <View style={[styles.markerDot, { backgroundColor: '#30D158' }]} />
                </View>
              </Marker>
            )}

            {destination && (
              <Marker coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}>
                <View style={styles.markerContainer}>
                  <View style={[styles.markerDot, { backgroundColor: colors.secondary }]} />
                </View>
              </Marker>
            )}

            {pickup && destination && (
              <Polyline
                coordinates={[
                  { latitude: pickup.latitude, longitude: pickup.longitude },
                  { latitude: destination.latitude, longitude: destination.longitude }
                ]}
                strokeColor={colors.secondary}
                strokeWidth={3}
              />
            )}
          </MapView>

          {!pickup && (
            <View style={styles.mapOverlayLabel}>
              <Ionicons name="map-outline" size={28} color={colors.secondary} />
              <Text style={styles.mapOverlayText}>Enter route points above</Text>
            </View>
          )}
        </View>

        {/* Ride Options Card list */}
        {pickup && destination && (
          <View style={styles.optionsSection}>
            <Text style={styles.optionsTitle}>Select Service Type</Text>
            {RIDE_OPTIONS.map((item) => {
              const fare = getEstimatedFare(item.basePriceMultiplier);
              const isSelected = selectedRide === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.rideOptionCard, isSelected && styles.rideOptionCardSelected]}
                  onPress={() => setSelectedRide(item.id)}
                >
                  <View style={[styles.rideOptionIcon, isSelected && styles.rideOptionIconSelected]}>
                    <Ionicons name={item.icon as any} size={24} color={isSelected ? colors.primary : colors.secondary} />
                  </View>
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <View style={styles.rideOptionHeader}>
                      <Text style={styles.rideOptionName}>{item.name}</Text>
                      <Text style={styles.rideOptionFare}>K{fare}</Text>
                    </View>
                    <Text style={styles.rideOptionDesc} numberOfLines={1}>{item.desc}</Text>
                    <Text style={styles.rideOptionEta}>{item.eta}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity style={styles.requestButton} onPress={handleRequestRide}>
              <Text style={styles.requestButtonText}>REQUEST SHUTTLE</Text>
              <Ionicons name="arrow-forward" size={18} color={colors.textInverse} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text,
    fontWeight: '700',
  },
  scrollContent: {
    padding: spacing.lg,
  },
  formContainer: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pinDotGreen: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34C759',
    marginRight: spacing.md,
  },
  pinDotOrange: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    marginRight: spacing.md,
  },
  fieldValue: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  fieldPlaceholder: {
    color: colors.muted,
  },
  formDivider: {
    height: 12,
    width: 2,
    backgroundColor: colors.border,
    marginLeft: 20,
    marginVertical: 4,
    borderStyle: 'dashed',
  },
  mapSimulatorContainer: {
    height: 220,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  markerContainer: {
    padding: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  mapOverlayLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15,15,18,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapOverlayText: {
    ...typography.caption,
    color: colors.text,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  optionsSection: {
    marginBottom: spacing.xl,
  },
  optionsTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
    fontWeight: '700',
  },
  rideOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rideOptionCardSelected: {
    borderColor: colors.secondary,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255,107,0,0.03)',
  },
  rideOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E1E24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rideOptionIconSelected: {
    backgroundColor: colors.secondary,
  },
  rideOptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rideOptionName: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
  },
  rideOptionFare: {
    ...typography.h3,
    fontWeight: '700',
    color: colors.secondary,
  },
  rideOptionDesc: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 2,
  },
  rideOptionEta: {
    ...typography.caption,
    color: colors.secondary,
    fontWeight: '600',
    marginTop: 2,
  },
  requestButton: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: radius.pill,
    marginTop: spacing.md,
  },
  requestButtonText: {
    ...typography.body,
    fontWeight: '800',
    color: colors.textInverse,
    marginRight: spacing.sm,
    letterSpacing: 0.5,
  },
  autocompleteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.background,
    zIndex: 10,
  },
  overlayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeOverlayBtn: {
    marginRight: spacing.md,
  },
  overlayTitle: {
    ...typography.h3,
    color: colors.text,
    fontWeight: '700',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  suggestionList: {
    paddingHorizontal: spacing.lg,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  suggestionPin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,107,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  suggestionLabel: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  suggestionSublabel: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 2,
  },
  matchingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(18,18,18,0.95)',
    zIndex: 15,
    justifyContent: 'center',
  },
  matchingContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  matchingTitle: {
    ...typography.h1,
    color: colors.text,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  matchingSubtitle: {
    ...typography.body,
    color: colors.muted,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  sonarContainer: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  sonarRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
  },
  sonarCore: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchingRouteDetails: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  matchingDetailsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  routeItemText: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  routeItemFare: {
    ...typography.body,
    fontWeight: '700',
    color: colors.secondary,
    marginTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.xs,
  },
  cancelRequestBtn: {
    backgroundColor: colors.surface,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.error,
  },
  cancelRequestText: {
    ...typography.body,
    color: colors.error,
    fontWeight: '700',
  },
});
