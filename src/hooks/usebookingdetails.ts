import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBookings } from '../context/bookingcontext';
import { BOOKING_STATUS, BookingStatus } from '../constants/app';
import { colors } from '../constants/theme';

export function useBookingDetails(bookingId: string) {
  const navigation = useNavigation<any>();
  const { getBookingDetails, cancelRide } = useBookings();
  const booking = getBookingDetails(bookingId);

  const handleCancelTrip = () => {
    if (!booking) return;
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
    if (!booking || !booking.driverPhone) return;
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

  const baseFare = booking?.fare ? Math.round(booking.fare * 0.8) : 0;
  const serviceFee = booking?.fare ? Math.round(booking.fare * 0.13) : 0;
  const vatAmount = booking?.fare ? booking.fare - baseFare - serviceFee : 0;

  return {
    booking,
    handleCancelTrip,
    handleContactDriver,
    getStatusLabel,
    getStatusColor,
    formatTime,
    baseFare,
    serviceFee,
    vatAmount,
    navigation
  };
}
