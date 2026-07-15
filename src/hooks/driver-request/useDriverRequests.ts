import { useCallback, useState } from 'react';
import type { DriverStatus, RideRequest } from '../../types/driver-request/driver';
import { UseDriverRequestsResult } from '../../types/driver-request/driver';
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
    pickupLocation: '',
    destination: '',
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
    pickupLocation: '',
    destination: '',
    status: 'pending',
    timestamp: new Date()
  },
  {
    id: 'req-3',
    passengerName: 'Charles Gold',
    initials: 'CG',
    distanceAwayKm: 2,
    estimatedFare: 100,
    pickupEtaMinutes: 25,
    pickupLocation: '',
    destination: '',
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
      r.id === request.id ? { ...r, status: 'accepted' } : r
    )
  );
}, []);

  const rejectRequest = useCallback((request: RideRequest) => {
    setRequests((prev) => prev.filter((r) => r.id !== request.id));
  }, []);

  return {
    requests,
    status,
    currentStation,
    toggleStatus,
    acceptRequest,
    rejectRequest,
  };
}
