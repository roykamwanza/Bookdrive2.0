import React from 'react';
import BookingScreen from '../screens/booking/bookingscreen';
import { useBookingScreen } from '../hooks/usebookingscreen';

export function BookingContainer() {
  const hookProps = useBookingScreen();
  return <BookingScreen {...hookProps} />;
}
