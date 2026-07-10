import { useCallback, useState } from 'react';

/**
 * Generic async-action hook: wraps a promise-returning function with
 * loading/error state so screens don't repeat the same boilerplate.
 */
export function useAsyncAction<Args extends unknown[], Result>(
  action: (...args: Args) => Promise<Result>
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (...args: Args) => {
      setIsLoading(true);
      setError(null);
      try {
        return await action(...args);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        return undefined;
      } finally {
        setIsLoading(false);
      }
    },
    [action]
  );

  return { run, isLoading, error };
}
