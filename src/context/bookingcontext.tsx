import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Booking, Location } from '../types';
import { bookingService } from '../services/bookingservice';
import { useAuth } from './authcontext';
import { BookingStatus, BOOKING_STATUS } from '../constants/app';

interface BookingContextValue {
  currentBooking: Booking | null;
  availableBookings: Booking[];
  bookingHistory: Booking[];
  isLoading: boolean;
  error: string | null;
  requestRide: (pickup: Location, destination: Location, fare: number) => Promise<Booking>;
  acceptBooking: (bookingId: string) => Promise<Booking>;
  updateTripStatus: (bookingId: string, status: BookingStatus) => Promise<Booking>;
  loadHistory: () => Promise<void>;
  loadAvailableRequests: () => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  clearError: () => void;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const { user } = useAuth();
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [availableBookings, setAvailableBookings] = useState<Booking[]>([]);
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear state when user logs out
  useEffect(() => {
    if (!user) {
      setCurrentBooking(null);
      setBookingHistory([]);
      setAvailableBookings([]);
    }
  }, [user]);

  const clearError = useCallback(() => setError(null), []);

  // Simulates driver actions in sequence to demonstrate passenger transitions
  const simulateRideFlow = useCallback((bookingId: string) => {
    // 1. Driver accepts the ride
    setTimeout(() => {
      setCurrentBooking((prev) => {
        if (!prev || prev.id !== bookingId || prev.status !== BOOKING_STATUS.PENDING) return prev;

        // Use standard 'accepted' status
        const updated: Booking = {
          ...prev,
          status: BOOKING_STATUS.ACCEPTED,
          driverId: 'drv_demo_101',
          updatedAt: new Date().toISOString(),
        };

        setBookingHistory((history) =>
          history.map((b) => (b.id === bookingId ? updated : b))
        );
        return updated;
      });
    }, 4000);

    // 2. Driver starts the trip
    setTimeout(() => {
      setCurrentBooking((prev) => {
        if (!prev || prev.id !== bookingId || prev.status !== BOOKING_STATUS.ACCEPTED) return prev;

        // Use standard 'in_progress' status
        const updated: Booking = {
          ...prev,
          status: BOOKING_STATUS.IN_PROGRESS,
          updatedAt: new Date().toISOString(),
        };

        setBookingHistory((history) =>
          history.map((b) => (b.id === bookingId ? updated : b))
        );
        return updated;
      });
    }, 9000);

    // 3. Driver completes the trip
    setTimeout(() => {
      setCurrentBooking((prev) => {
        if (!prev || prev.id !== bookingId || prev.status !== BOOKING_STATUS.IN_PROGRESS) return prev;

        // Use standard 'completed' status
        const updated: Booking = {
          ...prev,
          status: BOOKING_STATUS.COMPLETED,
          updatedAt: new Date().toISOString(),
        };

        setBookingHistory((history) =>
          history.map((b) => (b.id === bookingId ? updated : b))
        );

        // Move current active booking to null since trip is completed
        return null;
      });
    }, 15000);
  }, []);

  const requestRide = useCallback(async (pickup: Location, destination: Location, fare: number) => {
    if (!user) throw new Error('User must be logged in to request a ride');
    setIsLoading(true);
    setError(null);
    try {
      const newBookingData: Partial<Booking> = {
        passengerId: user.id,
        pickup,
        destination,
        fare,
        status: BOOKING_STATUS.PENDING,
        requestedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      let resBooking: Booking;
      try {
        resBooking = await bookingService.requestRide(newBookingData);
      } catch (apiErr) {
        console.warn('API call failed, falling back to local simulation:', apiErr);
        resBooking = {
          id: 'booking_' + Math.random().toString(36).substring(2, 11),
          passengerId: user.id,
          pickup,
          destination,
          fare,
          status: BOOKING_STATUS.PENDING,
          requestedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }

      setCurrentBooking(resBooking);
      setBookingHistory((prev) => [resBooking, ...prev]);

      // Start the driver simulation for testing
      simulateRideFlow(resBooking.id);

      return resBooking;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to request ride';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user, simulateRideFlow]);

  const acceptBooking = useCallback(async (bookingId: string) => {
    if (!user) throw new Error('User must be logged in to accept a booking');
    setIsLoading(true);
    setError(null);
    try {
      let updated: Booking;
      try {
        updated = await bookingService.acceptBooking(bookingId, user.id);
      } catch (apiErr) {
        console.warn('API call failed, falling back to local update:', apiErr);
        const booking = availableBookings.find((b) => b.id === bookingId);
        if (!booking) {
          throw new Error('Booking not found in available list');
        }
        updated = {
          ...booking,
          status: BOOKING_STATUS.ACCEPTED,
          driverId: user.id,
          updatedAt: new Date().toISOString(),
        };
      }

      setCurrentBooking(updated);
      setAvailableBookings((prev) => prev.filter((b) => b.id !== bookingId));
      return updated;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to accept booking';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user, availableBookings]);

  const updateTripStatus = useCallback(async (bookingId: string, status: BookingStatus) => {
    setIsLoading(true);
    setError(null);
    try {
      let updated: Booking;
      try {
        updated = await bookingService.updateStatus(bookingId, status);
      } catch (apiErr) {
        console.warn('API call failed, falling back to local status update:', apiErr);
        const active = currentBooking && currentBooking.id === bookingId ? currentBooking : null;
        if (!active) {
          throw new Error('No active booking matches the requested ID');
        }
        updated = {
          ...active,
          status,
          updatedAt: new Date().toISOString(),
        };
      }

      if (status === BOOKING_STATUS.COMPLETED || status === BOOKING_STATUS.CANCELLED) {
        setCurrentBooking(null);
      } else {
        setCurrentBooking(updated);
      }

      setBookingHistory((prev) => {
        const exists = prev.some((b) => b.id === bookingId);
        if (exists) {
          return prev.map((b) => (b.id === bookingId ? updated : b));
        }
        return [updated, ...prev];
      });

      return updated;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update trip status';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentBooking]);

  const loadHistory = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      let res: Booking[];
      try {
        res = await bookingService.getHistory(user.id);
      } catch (apiErr) {
        console.warn('API call failed, falling back to local history:', apiErr);
        res = bookingHistory;
      }
      setBookingHistory(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load booking history');
    } finally {
      setIsLoading(false);
    }
  }, [user, bookingHistory]);

  const loadAvailableRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let res: Booking[];
      try {
        res = await bookingService.getAvailableRequests();
      } catch (apiErr) {
        console.warn('API call failed, falling back to mock available requests:', apiErr);
        res = [
          {
            id: 'booking_mock_1',
            passengerId: 'psg_mock_99',
            pickup: { label: 'Downtown Mall', latitude: -1.2921, longitude: 36.8219 },
            destination: { label: 'Airport Terminal 1', latitude: -1.3192, longitude: 36.9275 },
            fare: 450,
            status: BOOKING_STATUS.PENDING,
            requestedAt: new Date(Date.now() - 60000).toISOString(),
            updatedAt: new Date(Date.now() - 60000).toISOString(),
          },
          {
            id: 'booking_mock_2',
            passengerId: 'psg_mock_98',
            pickup: { label: 'Westlands Square', latitude: -1.2618, longitude: 36.8044 },
            destination: { label: 'National Museum', latitude: -1.2745, longitude: 36.8143 },
            fare: 150,
            status: BOOKING_STATUS.PENDING,
            requestedAt: new Date(Date.now() - 120000).toISOString(),
            updatedAt: new Date(Date.now() - 120000).toISOString(),
          },
        ];
      }
      setAvailableBookings(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load available requests');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelBooking = useCallback(async (bookingId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      try {
        await bookingService.updateStatus(bookingId, BOOKING_STATUS.CANCELLED);
      } catch (apiErr) {
        console.warn('API call failed, cancelling booking locally:', apiErr);
      }
      setCurrentBooking(null);
      setBookingHistory((prev) =>
        prev.map((b) =>
          b.id === bookingId
            ? { ...b, status: BOOKING_STATUS.CANCELLED, updatedAt: new Date().toISOString() }
            : b
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel booking');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <BookingContext.Provider
      value={{
        currentBooking,
        availableBookings,
        bookingHistory,
        isLoading,
        error,
        requestRide,
        acceptBooking,
        updateTripStatus,
        loadHistory,
        loadAvailableRequests,
        cancelBooking,
        clearError,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
