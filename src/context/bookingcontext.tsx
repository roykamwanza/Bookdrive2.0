import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Booking, Location } from '../types';
import { BOOKING_STATUS, BookingStatus } from '../constants/app';
import { useAuth } from './authcontext';

interface BookingContextValue {
  bookings: Booking[];
  activeBooking: Booking | null;
  isLoading: boolean;
  requestRide: (pickup: Location, destination: Location, fare: number, rideType: string) => Promise<Booking>;
  cancelRide: (bookingId: string) => Promise<void>;
  getBookingDetails: (bookingId: string) => Booking | undefined;
  clearHistory: () => Promise<void>;
}

const BookingContext = createContext<BookingContextValue | undefined>(undefined);

const STORAGE_KEY = '@bookdrive_bookings_v1';

const MOCK_HISTORY_INITIAL: Booking[] = [
  {
    id: 'booking-past-1',
    passengerId: 'mock-user-id',
    pickup: { label: 'Central Railway Station', latitude: -15.4167, longitude: 28.2833 },
    destination: { label: 'Kenneth Kaunda International Airport', latitude: -15.3308, longitude: 28.4526 },
    status: BOOKING_STATUS.COMPLETED,
    fare: 150,
    requestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    driverName: 'Mike Banda',
    driverPhone: '+260 97 123 4567',
    driverRating: 4.9,
    driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    vehicleModel: 'Toyota HiAce (Standard Shuttle)',
    vehiclePlate: 'AB 1234 CD',
    rideType: 'Standard Minibus'
  },
  {
    id: 'booking-past-2',
    passengerId: 'mock-user-id',
    pickup: { label: 'University of Zambia', latitude: -15.3941, longitude: 28.3378 },
    destination: { label: 'East Park Mall', latitude: -15.3925, longitude: 28.3289 },
    status: BOOKING_STATUS.CANCELLED,
    fare: 45,
    requestedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(), // 22 hours ago
    updatedAt: new Date(Date.now() - 21.8 * 60 * 60 * 1000).toISOString(),
    rideType: 'Express Shuttle'
  }
];

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // References to active simulation timers so they can be cleared if cancelled
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load bookings from storage
  useEffect(() => {
    async function loadData() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as Booking[];
          setBookings(parsed);
          // Look for any active booking in stored list
          const active = parsed.find(
            (b) =>
              b.status === BOOKING_STATUS.PENDING ||
              b.status === BOOKING_STATUS.ACCEPTED ||
              b.status === BOOKING_STATUS.IN_PROGRESS
          );
          if (active) {
            setActiveBooking(active);
            // Resume simulation if it was in progress
            resumeSimulation(active, parsed);
          }
        } else {
          // Initialize with mock history
          const initial = MOCK_HISTORY_INITIAL.map(b => ({
            ...b,
            passengerId: user?.id || 'mock-user-id'
          }));
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
          setBookings(initial);
        }
      } catch (err) {
        console.error('Failed to load bookings:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();

    return () => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    };
  }, [user?.id]);

  // Helper to save bookings list to AsyncStorage
  const saveToStorage = async (list: Booking[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error('Failed to save bookings:', err);
    }
  };

  // Simulation Logic
  const startSimulation = (bookingId: string) => {
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current);

    // Step 1: Pending -> Accepted (4 seconds)
    stepTimerRef.current = setTimeout(() => {
      updateBookingStatus(bookingId, BOOKING_STATUS.ACCEPTED, {
        driverName: 'Chanda Kapuya',
        driverPhone: '+260 96 987 6543',
        driverRating: 4.85,
        driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        vehicleModel: 'Nissan Caravan (Express)',
        vehiclePlate: 'BCA 4529 ZM',
      });

      // Step 2: Accepted -> In Progress (6 seconds later)
      stepTimerRef.current = setTimeout(() => {
        updateBookingStatus(bookingId, BOOKING_STATUS.IN_PROGRESS);

        // Step 3: In Progress -> Completed (10 seconds later)
        stepTimerRef.current = setTimeout(() => {
          updateBookingStatus(bookingId, BOOKING_STATUS.COMPLETED);
          setActiveBooking(null);
        }, 10000);
      }, 6000);
    }, 4000);
  };

  const resumeSimulation = (booking: Booking, currentList: Booking[]) => {
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    
    const timeElapsed = Date.now() - new Date(booking.requestedAt).getTime();

    if (booking.status === BOOKING_STATUS.PENDING) {
      // Still early, start from beginning
      startSimulation(booking.id);
    } else if (booking.status === BOOKING_STATUS.ACCEPTED) {
      // Driver accepted, wait a bit then start transit
      stepTimerRef.current = setTimeout(() => {
        updateBookingStatus(booking.id, BOOKING_STATUS.IN_PROGRESS);
        stepTimerRef.current = setTimeout(() => {
          updateBookingStatus(booking.id, BOOKING_STATUS.COMPLETED);
          setActiveBooking(null);
        }, 10000);
      }, Math.max(1000, 6000 - (timeElapsed - 4000)));
    } else if (booking.status === BOOKING_STATUS.IN_PROGRESS) {
      // Already riding, wait remaining time
      stepTimerRef.current = setTimeout(() => {
        updateBookingStatus(booking.id, BOOKING_STATUS.COMPLETED);
        setActiveBooking(null);
      }, Math.max(1000, 16000 - timeElapsed));
    }
  };

  const updateBookingStatus = (
    bookingId: string, 
    status: BookingStatus, 
    driverDetails: Partial<Booking> = {}
  ) => {
    setBookings((prev) => {
      const updated = prev.map((b) => {
        if (b.id !== bookingId) return b;
        const newBooking = {
          ...b,
          status,
          updatedAt: new Date().toISOString(),
          ...driverDetails
        };
        // Update active booking state if applicable
        if (activeBooking && activeBooking.id === bookingId) {
          setActiveBooking(newBooking.status === BOOKING_STATUS.COMPLETED || newBooking.status === BOOKING_STATUS.CANCELLED ? null : newBooking);
        }
        return newBooking;
      });
      saveToStorage(updated);
      return updated;
    });
  };

  // Actions
  const requestRide = async (pickup: Location, destination: Location, fare: number, rideType: string): Promise<Booking> => {
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      passengerId: user?.id || 'mock-user-id',
      pickup,
      destination,
      status: BOOKING_STATUS.PENDING,
      fare,
      rideType,
      requestedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBookings((prev) => {
      const updated = [newBooking, ...prev];
      saveToStorage(updated);
      return updated;
    });

    setActiveBooking(newBooking);
    startSimulation(newBooking.id);

    return newBooking;
  };

  const cancelRide = async (bookingId: string) => {
    if (stepTimerRef.current) {
      clearTimeout(stepTimerRef.current);
    }
    updateBookingStatus(bookingId, BOOKING_STATUS.CANCELLED);
    setActiveBooking(null);
  };

  const getBookingDetails = (bookingId: string) => {
    return bookings.find((b) => b.id === bookingId);
  };

  const clearHistory = async () => {
    if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    await AsyncStorage.removeItem(STORAGE_KEY);
    setBookings([]);
    setActiveBooking(null);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        activeBooking,
        isLoading,
        requestRide,
        cancelRide,
        getBookingDetails,
        clearHistory
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
}
