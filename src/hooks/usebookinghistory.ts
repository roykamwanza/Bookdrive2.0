import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useBookings } from '../context/bookingcontext';
import { BOOKING_STATUS, BookingStatus } from '../constants/app';
import { colors } from '../constants/theme';
import { Booking } from '../types';

export type TabType = 'all' | 'completed' | 'cancelled';

export function useBookingHistory() {
  const navigation = useNavigation<any>();
  const { bookings, isLoading, clearHistory } = useBookings();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'completed') {
      return booking.status === BOOKING_STATUS.COMPLETED;
    }
    if (activeTab === 'cancelled') {
      return booking.status === BOOKING_STATUS.CANCELLED;
    }
    return true; // 'all'
  });

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BOOKING_STATUS.COMPLETED:
        return { text: '#30D158', bg: 'rgba(48, 209, 88, 0.1)' };
      case BOOKING_STATUS.CANCELLED:
        return { text: '#FF453A', bg: 'rgba(255, 69, 58, 0.1)' };
      case BOOKING_STATUS.PENDING:
      case BOOKING_STATUS.ACCEPTED:
        return { text: colors.secondary, bg: 'rgba(255, 107, 0, 0.1)' };
      case BOOKING_STATUS.IN_PROGRESS:
        return { text: '#0A84FF', bg: 'rgba(10, 132, 255, 0.1)' };
      default:
        return { text: colors.text, bg: colors.border };
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return {
    bookings,
    filteredBookings,
    isLoading,
    activeTab,
    setActiveTab,
    getStatusColor,
    formatDate,
    clearHistory,
    navigation
  };
}
