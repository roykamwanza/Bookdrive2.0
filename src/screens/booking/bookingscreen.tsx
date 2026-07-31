import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  Animated,
  ActivityIndicator,
  Alert,
  ScrollView
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography, radius } from '../../constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useBookings } from '../../context/bookingcontext';
import { BOOKING_STATUS } from '../../constants/app';
import { Location } from '../../types';

const MOCK_LOCATIONS: Location[] = [
  { label: 'Kenneth Kaunda International Airport', latitude: -15.3308, longitude: 28.4526 },
  { label: 'Central Railway Station', latitude: -15.4167, longitude: 28.2833 },
  { label: 'University of Zambia (UNZA)', latitude: -15.3941, longitude: 28.3378 },
  { label: 'East Park Mall', latitude: -15.3925, longitude: 28.3289 },
  { label: 'Levy Junction Mall', latitude: -15.4208, longitude: 28.2862 },
  { label: 'Lusaka National Museum', latitude: -15.4217, longitude: 28.2917 },
  { label: 'Manda Hill Shopping Centre', latitude: -15.4024, longitude: 28.3075 },
];

const RIDE_OPTIONS = [
  {
    id: 'standard',
    name: 'Standard Minibus',
    desc: 'Comfortable shared commuter van',
    basePriceMultiplier: 1.0,
    eta: '4 mins away',
    icon: 'bus-outline'
  },
  {
    id: 'express',
    name: 'Express Shuttle',
    desc: 'Direct rapid route, fewer stops',
    basePriceMultiplier: 1.6,
    eta: '6 mins away',
    icon: 'rocket-outline'
  },
  {
    id: 'private',
    name: 'Private Van',
    desc: 'Full minibus for group / private use',
    basePriceMultiplier: 4.0,
    eta: '9 mins away',
    icon: 'car-sport-outline'
  }
];

interface BookingScreenProps {
  navigation?: any;
}

export default function BookingScreen({ navigation }: BookingScreenProps) {
  const { t } = useTranslation();
  const { activeBooking, requestRide, cancelRide } = useBookings();

  const [pickup, setPickup] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [focusedField, setFocusedField] = useState<'pickup' | 'destination' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRide, setSelectedRide] = useState('standard');
  const [isRequesting, setIsRequesting] = useState(false);

  // Pulser animations
  const pulseScale = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.6)).current;

  // Track if activeBooking turns to accepted
  useEffect(() => {
    if (activeBooking && activeBooking.status === BOOKING_STATUS.ACCEPTED && isRequesting) {
      setIsRequesting(false);
      // Auto navigate to details
      navigation?.navigate('History', {
        screen: 'BookingDetails',
        params: { bookingId: activeBooking.id }
      });
    }
  }, [activeBooking, isRequesting]);

  // Sonar pulsing loop
  useEffect(() => {
    let anim: Animated.CompositeAnimation | null = null;
    if (isRequesting || (activeBooking && activeBooking.status === BOOKING_STATUS.PENDING)) {
      anim = Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(pulseScale, {
              toValue: 2.2,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(pulseScale, {
              toValue: 1,
              duration: 0,
              useNativeDriver: true,
            })
          ]),
          Animated.sequence([
            Animated.timing(pulseOpacity, {
              toValue: 0,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(pulseOpacity, {
              toValue: 0.6,
              duration: 0,
              useNativeDriver: true,
            })
          ])
        ])
      );
      anim.start();
    } else {
      pulseScale.setValue(1);
      pulseOpacity.setValue(0.6);
    }
    return () => {
      if (anim) anim.stop();
    };
  }, [isRequesting, activeBooking?.status]);

  const filteredLocations = searchQuery
    ? MOCK_LOCATIONS.filter(loc =>
        loc.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MOCK_LOCATIONS;

  const handleSelectLocation = (loc: Location) => {
    if (focusedField === 'pickup') {
      setPickup(loc);
      setFocusedField(null);
    } else if (focusedField === 'destination') {
      setDestination(loc);
      setFocusedField(null);
    }
    setSearchQuery('');
  };

  const getEstimatedFare = (multiplier: number) => {
    if (!pickup || !destination) return 0;
    // Simple mock calculation based on coordinates difference
    const latDiff = Math.abs(pickup.latitude - destination.latitude);
    const lonDiff = Math.abs(pickup.longitude - destination.longitude);
    const distanceFactor = (latDiff + lonDiff) * 100;
    const baseFare = 35; // base price in Kwacha
    return Math.round((baseFare + distanceFactor * 15) * multiplier);
  };

  const handleRequestRide = async () => {
    if (activeBooking) {
      Alert.alert(
        'Active Ride Exists',
        'You already have an active request or trip in progress. Please track or cancel it before booking a new one.',
        [
          { 
            text: 'Track Current Trip', 
            onPress: () => navigation?.navigate('History', {
              screen: 'BookingDetails',
              params: { bookingId: activeBooking.id }
            })
          },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
      return;
    }

    if (!pickup || !destination) {
      Alert.alert('Incomplete Search', 'Please select both pickup and destination locations.');
      return;
    }

    const selectedOption = RIDE_OPTIONS.find(o => o.id === selectedRide);
    const fare = getEstimatedFare(selectedOption?.basePriceMultiplier || 1.0);
    
    setIsRequesting(true);
    try {
      await requestRide(pickup, destination, fare, selectedOption?.name || 'Standard Minibus');
    } catch (err) {
      setIsRequesting(false);
      Alert.alert('Request Failed', 'Could not request a ride. Please check network connection.');
    }
  };

  const handleCancelRequest = async () => {
    if (activeBooking) {
      await cancelRide(activeBooking.id);
    }
    setIsRequesting(false);
  };

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

        {/* Map Simulator */}
        <View style={styles.mapSimulatorContainer}>
          {/* Visual Canvas Layout representing Dark Mode Route Map */}
          <View style={styles.mapBackground}>
            {/* Grid Line Grid mockups */}
            <View style={styles.mapGridLineH1} />
            <View style={styles.mapGridLineH2} />
            <View style={styles.mapGridLineV1} />
            <View style={styles.mapGridLineV2} />

            {pickup && destination ? (
              <>
                {/* Active Route connecting pickup & dropoff */}
                <View style={styles.routePathContainer}>
                  <View style={styles.routeConnector} />
                  {/* Vehicle mock heading */}
                  <View style={styles.movingVehicle}>
                    <Ionicons name="bus" size={16} color={colors.secondary} />
                  </View>
                </View>

                {/* Pickup Pin */}
                <View style={[styles.mapPin, styles.pickupMapPin]}>
                  <Ionicons name="location" size={24} color="#34C759" />
                  <View style={styles.mapPinLabel}>
                    <Text style={styles.mapPinLabelText} numberOfLines={1}>Pickup</Text>
                  </View>
                </View>

                {/* Destination Pin */}
                <View style={[styles.mapPin, styles.destinationMapPin]}>
                  <Ionicons name="location" size={24} color={colors.secondary} />
                  <View style={styles.mapPinLabel}>
                    <Text style={styles.mapPinLabelText} numberOfLines={1}>Destination</Text>
                  </View>
                </View>
              </>
            ) : (
              <View style={styles.mapCenterLabel}>
                <Ionicons name="map" size={40} color={colors.border} style={{ marginBottom: spacing.sm }} />
                <Text style={styles.mapCenterText}>Enter locations to preview route</Text>
              </View>
            )}
          </View>
        </View>

        {/* Ride Options Card list (Only show when locations are populated) */}
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
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#0F0F12',
    position: 'relative',
  },
  mapGridLineH1: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '33%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  mapGridLineH2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '66%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  mapGridLineV1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '33%',
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  mapGridLineV2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '66%',
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  mapCenterLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCenterText: {
    ...typography.caption,
    color: colors.muted,
  },
  routePathContainer: {
    position: 'absolute',
    top: '40%',
    left: '25%',
    right: '25%',
    height: 40,
    justifyContent: 'center',
  },
  routeConnector: {
    height: 3,
    backgroundColor: colors.secondary,
    borderRadius: 2,
    opacity: 0.6,
  },
  movingVehicle: {
    position: 'absolute',
    top: -6,
    left: '40%',
    backgroundColor: colors.primary,
    borderWidth: 1.5,
    borderColor: colors.secondary,
    padding: 3,
    borderRadius: 12,
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
  },
  pickupMapPin: {
    top: '40%',
    left: '15%',
  },
  destinationMapPin: {
    top: '30%',
    right: '15%',
  },
  mapPinLabel: {
    backgroundColor: colors.surface,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 2,
  },
  mapPinLabelText: {
    color: colors.text,
    fontSize: 9,
    fontWeight: '600',
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
