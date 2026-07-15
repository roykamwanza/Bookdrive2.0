import { useState, useCallback } from 'react';
import { RideRequest } from '../../types/driver-request/driver';

export type TripStatus = 'accepted' | 'arrived' | 'in_transit' | 'completed';

export function useTripStatus(trip: RideRequest | null) {
  const [status, setStatus] = useState<TripStatus>('accepted');

  const advance = useCallback(() => {
    setStatus((prev) => {
      if (prev === 'accepted') return 'arrived';
      if (prev === 'arrived') return 'in_transit';
      if (prev === 'in_transit') return 'completed';
      return prev;
    });
  }, []);

  const reset = useCallback(() => {
    setStatus('accepted');
  }, []);

  return { status, advance, reset, trip };
}

export default useTripStatus;