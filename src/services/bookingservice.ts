import { apiClient } from '../api/client';
import { Booking } from '../types';

export const bookingService = {
  requestRide: (booking: Partial<Booking>) => apiClient.post<Booking>('/bookings', booking),
  getHistory: (passengerId: string) =>
    apiClient.get<Booking[]>(`/bookings?passengerId=${passengerId}`),
  getAvailableRequests: () => apiClient.get<Booking[]>('/bookings?status=pending'),
  acceptBooking: (bookingId: string, driverId: string) =>
    apiClient.put<Booking>(`/bookings/${bookingId}/accept`, { driverId }),
  updateStatus: (bookingId: string, status: Booking['status']) =>
    apiClient.put<Booking>(`/bookings/${bookingId}/status`, { status }),
  getById: (bookingId: string) => apiClient.get<Booking>(`/bookings/${bookingId}`),
};
