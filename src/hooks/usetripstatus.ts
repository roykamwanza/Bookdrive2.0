import { useCallback, useState } from 'react';
import type { TripStage } from '../types/driver';

const STAGE_ORDER: TripStage[] = ['requested', 'arrived', 'in-transit', 'completed'];

export function useTripStatus() {
  const [stage, setStage] = useState<TripStage>('requested');

  const advance = useCallback(() => {
    setStage((prev) => {
      const idx = STAGE_ORDER.indexOf(prev);
      return STAGE_ORDER[Math.min(idx + 1, STAGE_ORDER.length - 1)];
    });
  }, []);

  const reset = useCallback(() => setStage('requested'), []);

  return { stage, advance, reset };
}
