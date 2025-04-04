// src/hooks/useRetryRequest.js
import { useState, useCallback } from 'react';

export function useRetryRequest(requestFn, onSuccess, onError) {
  const [error, setError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [hasAttempted, setHasAttempted] = useState(false);

  const execute = useCallback(async (...args) => {
    try {
      await requestFn(...args);
      setError(false);
      setHasAttempted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(true);
      setHasAttempted(true);
      if (onError) onError(err);
    }
  }, [requestFn, onSuccess, onError]);

  const retry = async () => {
    setIsRetrying(true);
    await execute();
    setIsRetrying(false);
  };

  return {
    execute,
    error,
    isRetrying,
    retry,
    hasAttempted,
  };
}
