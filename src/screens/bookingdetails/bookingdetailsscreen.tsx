import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography, radius } from '../../constants/theme';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useBookings } from '../../context/bookingcontext';
import { BOOKING_STATUS, BookingStatus } from '../../constants/app';

interface BookingDetailsScreenProps {
  route: {
    params: {
      bookingId: string;
    };
  };
  navigation?: any;
}

export default function BookingDetailsScreen({ route, navigation }: BookingDetailsScreenProps) {
  const { t } = useTranslation();
  const { bookingId } = route.params;
  const { getBookingDetails, cancelRide } = useBookings();
  const booking = getBookingDetails(bookingId);

  if (!booking) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
        <Text style={styles.errorText}>Trip details not found.</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleCancelTrip = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this ride request?',
      [
        { text: 'No, Keep Request', style: 'cancel' },
        { 
          text: 'Yes, Cancel Ride', 
          style: 'destructive',
          onPress: async () => {
            await cancelRide(booking.id);
            Alert.alert('Trip Cancelled', 'Your booking request has been cancelled.');
          }
        }
      ]
    );
  };

  const handleContactDriver = (type: 'call' | 'message') => {
    if (!booking.driverPhone) return;
    Alert.alert(
      type === 'call' ? 'Simulating Call' : 'Simulating Chat',
      type === 'call' 
        ? `Connecting a call to driver ${booking.driverName} at ${booking.driverPhone}...`
        : `Opening chat channel with ${booking.driverName}...`
    );
  };

  const getStatusLabel = (status: BookingStatus) => {
    switch (status) {
      case BOOKING_STATUS.PENDING:
        return 'FINDING DRIVER';
      case BOOKING_STATUS.ACCEPTED:
        return 'DRIVER EN ROUTE';
      case BOOKING_STATUS.IN_PROGRESS:
        return 'TRIP IN PROGRESS';
      case BOOKING_STATUS.COMPLETED:
        return 'COMPLETED';
      case BOOKING_STATUS.CANCELLED:
        return 'CANCELLED';
      default:
        return (status as string).toUpperCase();
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BOOKING_STATUS.COMPLETED:
        return '#30D158';
      case BOOKING_STATUS.CANCELLED:
        return '#FF453A';
      case BOOKING_STATUS.PENDING:
      case BOOKING_STATUS.ACCEPTED:
        return colors.secondary;
      case BOOKING_STATUS.IN_PROGRESS:
        return '#0A84FF';
      default:
        return colors.text;
    }
  };

  // Helper date formatter
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  const baseFare = booking.fare ? Math.round(booking.fare * 0.8) : 0;
  const serviceFee = booking.fare ? Math.round(booking.fare * 0.13) : 0;
  const vatAmount = booking.fare ? booking.fare - baseFare - serviceFee : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={() => navigation?.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Trip Details</Text>
          <Text style={styles.headerSubtitle}>ID: #{booking.id.split('-').pop()}</Text>
        </View>
        <View style={[styles.statusBadge, { borderColor: getStatusColor(booking.status) }]}>
          <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
            {getStatusLabel(booking.status)}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Map Preview */}
        <View style={styles.mapContainer}>
          <View style={styles.mapLayout}>
            {/* Grid Map elements */}
            <View style={styles.mapGridLineH1} />
            <View style={styles.mapGridLineH2} />
            <View style={styles.mapGridLineV1} />
            <View style={styles.mapGridLineV2} />

            {/* Simulated Route */}
            <View style={styles.mapRoutePath} />
            <View style={styles.pickupPin}>
              <Ionicons name="location" size={20} color="#34C759" />
            </View>
            <View style={styles.dropoffPin}>
              <Ionicons name="location" size={20} color={colors.secondary} />
            </View>
          </View>
        </View>

        {/* Route Address Panel */}
        <View style={styles.card}>
          <View style={styles.addressRow}>
            <View style={styles.pinIndicatorGreen} />
            <View style={styles.addressLabelCol}>
              <Text style={styles.addressTitle}>PICKUP LOCATION</Text>
              <Text style={styles.addressDesc}>{booking.pickup.label}</Text>
            </View>
          </View>
          <View style={styles.addressDivider} />
          <View style={styles.addressRow}>
            <View style={styles.pinIndicatorOrange} />
            <View style={styles.addressLabelCol}>
              <Text style={styles.addressTitle}>DESTINATION</Text>
              <Text style={styles.addressDesc}>{booking.destination.label}</Text>
            </View>
          </View>
        </View>

        {/* Driver Section */}
        {booking.driverName ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Driver Details</Text>
            <View style={styles.driverProfileContainer}>
              <View style={styles.driverAvatarContainer}>
                {booking.driverAvatar ? (
                  <Image source={{ uri: booking.driverAvatar }} style={styles.driverAvatar} />
                ) : (
                  <View style={styles.driverAvatarFallback}>
                    <Text style={styles.driverInitialText}>{booking.driverName.charAt(0)}</Text>
                  </View>
                )}
              </View>

              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={styles.driverNameText}>{booking.driverName}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#FFD700" style={{ marginRight: 4 }} />
                  <Text style={styles.ratingText}>{booking.driverRating || '4.8'}</Text>
                </View>
                <Text style={styles.vehicleText}>{booking.vehicleModel}</Text>
                <View style={styles.plateBadge}>
                  <Text style={styles.plateText}>{booking.vehiclePlate}</Text>
                </View>
              </View>
            </View>

            {/* Call / Message options */}
            {(booking.status === BOOKING_STATUS.ACCEPTED || booking.status === BOOKING_STATUS.IN_PROGRESS) && (
              <View style={styles.contactRow}>
                <TouchableOpacity style={styles.contactBtn} onPress={() => handleContactDriver('message')}>
                  <Ionicons name="chatbubble-ellipses" size={18} color={colors.secondary} style={{ marginRight: 6 }} />
                  <Text style={styles.contactBtnText}>Message</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactBtn} onPress={() => handleContactDriver('call')}>
                  <Ionicons name="call" size={18} color={colors.secondary} style={{ marginRight: 6 }} />
                  <Text style={styles.contactBtnText}>Call Driver</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : booking.status === BOOKING_STATUS.PENDING ? (
          <View style={[styles.card, styles.pendingCard]}>
            <ActivityIndicator size="small" color={colors.secondary} style={{ marginRight: spacing.md }} />
            <Text style={styles.pendingText}>Searching for an available driver shuttle...</Text>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.noDriverText}>
              {booking.status === BOOKING_STATUS.CANCELLED 
                ? 'Booking request was cancelled. No driver assigned.' 
                : 'No driver information is available.'}
            </Text>
          </View>
        )}

        {/* Trip Timeline Status Tracker */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Trip Progression</Text>
          <View style={styles.timelineContainer}>
            {/* Item 1: Requested */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineMarker}>
                <View style={styles.timelineDotActive} />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineInfo}>
                <Text style={styles.timelineLabelActive}>Requested Trip</Text>
                <Text style={styles.timelineTime}>{formatTime(booking.requestedAt)}</Text>
              </View>
            </View>

            {/* Item 2: Accepted */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineMarker}>
                <View style={
                  booking.status === BOOKING_STATUS.ACCEPTED || 
                  booking.status === BOOKING_STATUS.IN_PROGRESS || 
                  booking.status === BOOKING_STATUS.COMPLETED
                    ? styles.timelineDotActive 
                    : styles.timelineDotInactive
                } />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineInfo}>
                <Text style={
                  booking.status === BOOKING_STATUS.ACCEPTED || 
                  booking.status === BOOKING_STATUS.IN_PROGRESS || 
                  booking.status === BOOKING_STATUS.COMPLETED
                    ? styles.timelineLabelActive 
                    : styles.timelineLabelInactive
                }>
                  Driver Accepted Request
                </Text>
                <Text style={styles.timelineTime}>
                  {booking.driverName ? formatTime(booking.updatedAt) : ''}
                </Text>
              </View>
            </View>

            {/* Item 3: In Transit */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineMarker}>
                <View style={
                  booking.status === BOOKING_STATUS.IN_PROGRESS || 
                  booking.status === BOOKING_STATUS.COMPLETED
                    ? styles.timelineDotActive 
                    : styles.timelineDotInactive
                } />
                <View style={styles.timelineLine} />
              </View>
              <View style={styles.timelineInfo}>
                <Text style={
                  booking.status === BOOKING_STATUS.IN_PROGRESS || 
                  booking.status === BOOKING_STATUS.COMPLETED
                    ? styles.timelineLabelActive 
                    : styles.timelineLabelInactive
                }>
                  Boarded & In Transit
                </Text>
                <Text style={styles.timelineTime}>
                  {booking.status === BOOKING_STATUS.IN_PROGRESS || booking.status === BOOKING_STATUS.COMPLETED ? formatTime(booking.updatedAt) : ''}
                </Text>
              </View>
            </View>

            {/* Item 4: Completed or Cancelled */}
            {booking.status === BOOKING_STATUS.CANCELLED ? (
              <View style={styles.timelineItem}>
                <View style={styles.timelineMarker}>
                  <View style={[styles.timelineDotActive, { backgroundColor: '#FF453A' }]} />
                </View>
                <View style={styles.timelineInfo}>
                  <Text style={[styles.timelineLabelActive, { color: '#FF453A' }]}>Trip Cancelled</Text>
                  <Text style={styles.timelineTime}>{formatTime(booking.updatedAt)}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.timelineItem}>
                <View style={styles.timelineMarker}>
                  <View style={
                    booking.status === BOOKING_STATUS.COMPLETED
                      ? styles.timelineDotActive 
                      : styles.timelineDotInactive
                  } />
                </View>
                <View style={styles.timelineInfo}>
                  <Text style={
                    booking.status === BOOKING_STATUS.COMPLETED
                      ? styles.timelineLabelActive 
                      : styles.timelineLabelInactive
                  }>
                    Arrived at Destination
                  </Text>
                  <Text style={styles.timelineTime}>
                    {booking.status === BOOKING_STATUS.COMPLETED ? formatTime(booking.updatedAt) : ''}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Receipt Panel */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Fare Receipt</Text>
          
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Ride Fare ({booking.rideType || 'Standard'})</Text>
            <Text style={styles.receiptValue}>K{baseFare}.00</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>BookDrive Booking Fee</Text>
            <Text style={styles.receiptValue}>K{serviceFee}.00</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Local Transit Tax (VAT)</Text>
            <Text style={styles.receiptValue}>K{vatAmount}.00</Text>
          </View>

          <View style={styles.receiptDivider} />

          <View style={styles.receiptTotalRow}>
            <Text style={styles.receiptTotalLabel}>Total Charge</Text>
            <Text style={styles.receiptTotalValue}>K{booking.fare}.00</Text>
          </View>

          <View style={styles.paymentMethodRow}>
            <Ionicons name="card" size={16} color={colors.secondary} style={{ marginRight: 6 }} />
            <Text style={styles.paymentMethodText}>Charged to Wallet</Text>
          </View>
        </View>

        {/* Cancel CTA */}
        {(booking.status === BOOKING_STATUS.PENDING || booking.status === BOOKING_STATUS.ACCEPTED) && (
          <TouchableOpacity style={styles.cancelTripBtn} onPress={handleCancelTrip}>
            <Ionicons name="close-circle-outline" size={20} color="#FF453A" style={{ marginRight: 6 }} />
            <Text style={styles.cancelTripBtnText}>Cancel Booking Request</Text>
          </TouchableOpacity>
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
  errorContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  errorText: {
    ...typography.h3,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  backBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
  },
  backBtnText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textInverse,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerBackBtn: {
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.text,
    fontWeight: '700',
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.muted,
    fontWeight: '500',
  },
  statusBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  mapContainer: {
    height: 140,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapLayout: {
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
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  mapGridLineH2: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '66%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  mapGridLineV1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '33%',
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  mapGridLineV2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '66%',
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  mapRoutePath: {
    position: 'absolute',
    top: '50%',
    left: '20%',
    right: '20%',
    height: 3,
    backgroundColor: colors.secondary,
    opacity: 0.5,
  },
  pickupPin: {
    position: 'absolute',
    top: '40%',
    left: '15%',
  },
  dropoffPin: {
    position: 'absolute',
    top: '40%',
    right: '15%',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    letterSpacing: 0.2,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinIndicatorGreen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#30D158',
    marginRight: spacing.md,
  },
  pinIndicatorOrange: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    marginRight: spacing.md,
  },
  addressLabelCol: {
    flex: 1,
  },
  addressTitle: {
    ...typography.caption,
    color: colors.muted,
    fontWeight: '700',
  },
  addressDesc: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    marginTop: 2,
  },
  addressDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  driverProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverAvatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: colors.border,
  },
  driverAvatar: {
    width: '100%',
    height: '100%',
  },
  driverAvatarFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1E1E24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverInitialText: {
    ...typography.h2,
    color: colors.secondary,
  },
  driverNameText: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    ...typography.caption,
    fontWeight: '600',
    color: '#FFD700',
  },
  vehicleText: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 4,
  },
  plateBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2C2C2E',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: spacing.xs,
  },
  plateText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
    fontSize: 10,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: radius.md,
  },
  contactBtnText: {
    ...typography.body,
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  pendingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  pendingText: {
    ...typography.body,
    color: colors.muted,
    flex: 1,
  },
  noDriverText: {
    ...typography.body,
    color: colors.muted,
    textAlign: 'center',
  },
  timelineContainer: {
    paddingLeft: spacing.xs,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 50,
  },
  timelineMarker: {
    alignItems: 'center',
    width: 20,
    marginRight: spacing.md,
  },
  timelineDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.secondary,
    zIndex: 2,
  },
  timelineDotInactive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
    zIndex: 2,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: colors.border,
    marginVertical: 2,
  },
  timelineInfo: {
    flex: 1,
    paddingBottom: spacing.md,
  },
  timelineLabelActive: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
  },
  timelineLabelInactive: {
    ...typography.body,
    color: colors.muted,
  },
  timelineTime: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 2,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  receiptLabel: {
    ...typography.body,
    color: colors.muted,
  },
  receiptValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  receiptDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
    borderStyle: 'dashed',
  },
  receiptTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  receiptTotalLabel: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
  },
  receiptTotalValue: {
    ...typography.h2,
    fontWeight: '800',
    color: colors.secondary,
  },
  paymentMethodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.sm,
    borderRadius: radius.sm,
    alignSelf: 'flex-start',
  },
  paymentMethodText: {
    ...typography.caption,
    color: colors.muted,
    fontWeight: '600',
  },
  cancelTripBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 69, 58, 0.1)',
    borderWidth: 1,
    borderColor: '#FF453A',
    paddingVertical: 14,
    borderRadius: radius.pill,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  cancelTripBtnText: {
    ...typography.body,
    color: '#FF453A',
    fontWeight: '700',
  },
});
