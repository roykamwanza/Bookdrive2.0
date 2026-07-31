import { useCallback, useState } from 'react';
import type { DriverStatus, RideRequest, TripStage } from '../types/driver';
import { UseDriverRequestsResult } from '../types/driver';
// TODO(Dev4): once BookingContext exists, replace the local mock state below
// with a subscription to live request events instead of useState.

const MOCK_REQUESTS: RideRequest[] = [
  {
    id: 'req-1',
    passengerName: 'John Doe',
    initials: 'JD',
    distanceAwayKm: 1.2,
    estimatedFare: 70,
    pickupEtaMinutes: 4,
    pickupLocation: 'Kenneth Kaunda Int. Airport',
    destination: 'East Park Mall',
    status: 'pending',
    timestamp: new Date()
  },
  {
    id: 'req-2',
    passengerName: 'Alice Smith',
    initials: 'AS',
    distanceAwayKm: 0.8,
    estimatedFare: 50,
    pickupEtaMinutes: 2,
    pickupLocation: 'UNZA Great East Gate',
    destination: 'Levy Junction Mall',
    status: 'pending',
    timestamp: new Date()
  },
  {
    id: 'req-3',
    passengerName: 'Charles Gold',
    initials: 'CG',
    distanceAwayKm: 2.5,
    estimatedFare: 100,
    pickupEtaMinutes: 6,
    pickupLocation: 'Lusaka CBD Terminal',
    destination: 'Manda Hill Shopping Centre',
    status: 'pending',
    timestamp: new Date()
  },
];


export function useDriverRequests(): UseDriverRequestsResult {
  const [requests, setRequests] = useState<RideRequest[]>(MOCK_REQUESTS);
  const [status, setStatus] = useState<DriverStatus>('accepting');
  const [currentStation] = useState('Central Station');

  const toggleStatus = useCallback(() => {
    setStatus((prev) => (prev === 'accepting' ? 'offline' : 'accepting'));
  }, []);

  const acceptRequest = useCallback((request: RideRequest) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === request.id
          ? { ...r, status: 'accepted' as const, tripStage: 'requested' as const }
          : r
      )
    );
  }, []);

  const rejectRequest = useCallback((request: RideRequest) => {
    setRequests((prev) => prev.filter((r) => r.id !== request.id));
  }, []);

  // Called once a trip's status stepper reaches 'completed'.
  // TODO(Dev4): once BookingContext exists, this should also log the
  // completed trip to Booking History instead of just removing it locally.
  const completeRequest = useCallback((request: RideRequest) => {
    setRequests((prev) => prev.filter((r) => r.id !== request.id));
  }, []);

  const advanceTripStage = useCallback((request: RideRequest) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== request.id) return r;
        const currentStage = r.tripStage || 'requested';
        const STAGE_ORDER: TripStage[] = ['requested', 'arrived', 'in-transit', 'completed'];
        const idx = STAGE_ORDER.indexOf(currentStage);
        const nextStage = STAGE_ORDER[Math.min(idx + 1, STAGE_ORDER.length - 1)];
        return { ...r, tripStage: nextStage };
      })
    );
  }, []);

  return {
    requests,
    status,
    currentStation,
    toggleStatus,
    acceptRequest,
    rejectRequest,
    completeRequest,
    advanceTripStage,
  };
}
