export type BookingStatus =
  | 'draft'
  | 'requested'
  | 'accepted'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type VehicleType = 'standard' | 'shared' | 'xl';

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface PlaceResult {
  id: string;
  title: string;
  subtitle?: string;
  location: GeoPoint;
}

export interface FareEstimate {
  currency: string;
  baseFare: number;
  distanceFare: number;
  serviceFee: number;
  total: number;
  distanceKm: number;
  etaMinutes: number;
}

export interface BookingStop {
  place: PlaceResult;
}

export interface Booking {
  id: string;
  passengerId: string;
  status: BookingStatus;
  vehicleType: VehicleType;
  pickup: BookingStop;
  dropoff: BookingStop;
  fare: FareEstimate;
  driver?: {
    id: string;
    name: string;
    plateNumber: string;
    rating: number;
  };
  requestedAt: string;
  acceptedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  notes?: string;
}

export interface CreateBookingPayload {
  passengerId: string;
  pickup: PlaceResult;
  dropoff: PlaceResult;
  vehicleType: VehicleType;
  notes?: string;
}
