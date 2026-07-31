import React from 'react';
import BookingDetailsScreen from '../screens/bookingdetails/bookingdetailsscreen';
import { useBookingDetails } from '../hooks/usebookingdetails';

interface BookingDetailsContainerProps {
  route: {
    params: {
      bookingId: string;
    };
  };
}

export function BookingDetailsContainer({ route }: BookingDetailsContainerProps) {
  const { bookingId } = route.params;
  const hookProps = useBookingDetails(bookingId);
  return <BookingDetailsScreen {...hookProps} bookingId={bookingId} />;
}
