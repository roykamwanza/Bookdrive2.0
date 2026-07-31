import { useState, useEffect, useRef } from 'react';
import { Animated, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBookings } from '../context/bookingcontext';
import { BOOKING_STATUS } from '../constants/app';
import { Location } from '../types';

export const MOCK_LOCATIONS: Location[] = [
  { label: 'Kenneth Kaunda International Airport', latitude: -15.3308, longitude: 28.4526 },
  { label: 'Central Railway Station', latitude: -15.4167, longitude: 28.2833 },
  { label: 'University of Zambia (UNZA)', latitude: -15.3941, longitude: 28.3378 },
  { label: 'East Park Mall', latitude: -15.3925, longitude: 28.3289 },
  { label: 'Levy Junction Mall', latitude: -15.4208, longitude: 28.2862 },
  { label: 'Lusaka National Museum', latitude: -15.4217, longitude: 28.2917 },
  { label: 'Manda Hill Shopping Centre', latitude: -15.4024, longitude: 28.3075 },
];

export const RIDE_OPTIONS = [
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

export function useBookingScreen() {
  const navigation = useNavigation<any>();
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
    const latDiff = Math.abs(pickup.latitude - destination.latitude);
    const lonDiff = Math.abs(pickup.longitude - destination.longitude);
    const distanceFactor = (latDiff + lonDiff) * 100;
    const baseFare = 35;
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

  return {
    pickup,
    setPickup,
    destination,
    setDestination,
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
    activeBooking,
    navigation
  };
}
