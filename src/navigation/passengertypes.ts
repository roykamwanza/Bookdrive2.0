import type { PlaceResult, VehicleType } from '../types/booking';

export type PassengerStackParamList = {
  Home: undefined;
  Booking: {
    pickup?: PlaceResult;
    dropoff?: PlaceResult;
    vehicleType?: VehicleType;
  };
  BookingHistory: undefined;
  BookingDetails: {
    bookingId: string;
  };
};
