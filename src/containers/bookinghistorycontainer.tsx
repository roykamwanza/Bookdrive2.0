import React from 'react';
import BookingHistoryScreen from '../screens/bookinghistory/bookinghistoryscreen';
import { useBookingHistory } from '../hooks/usebookinghistory';

export function BookingHistoryContainer() {
  const hookProps = useBookingHistory();
  return <BookingHistoryScreen {...hookProps} />;
}
