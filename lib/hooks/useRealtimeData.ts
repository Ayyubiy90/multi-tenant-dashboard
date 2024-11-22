import { useState, useEffect } from 'react';

interface DataPoint {
  name: any;
  timestamp: number;
  value: number;
}

export function useRealtimeData(
  initialValue: number, 
  updateInterval: number = 5000,
  enabled: boolean = true
) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    // Initialize with some historical data
    const now = Date.now();
    const historical = Array.from({ length: 10 }, (_, i) => ({
      name: `Point ${i + 1}`, // Ensure each data point has a name
      timestamp: now - (9 - i) * updateInterval,
      value: initialValue + Math.random() * 100 - 50,
    }));
    setData(historical);
    setIsLoading(false);

    // Set up real-time updates
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    const interval = setInterval(() => {
      try {
        setData(prev => {
          const newPoint = {
            name: `Point ${prev.length + 1}`, // Assign a name for the new data point
            timestamp: Date.now(),
            value: prev[prev.length - 1].value + (Math.random() * 20 - 10),
          };
          return [...prev.slice(1), newPoint]; // Update the state with the new data point
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [enabled, initialValue, updateInterval]);

  return { data, isLoading, error };
}