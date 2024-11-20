'use client';

import { useState, useEffect } from 'react';
import { DashboardStats, ActivityData, mockStats, mockActivityData } from '../data/dashboard-mock';

export function useDashboardData() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activityData, setActivityData] = useState<ActivityData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In production, replace with real API calls
        setStats(mockStats);
        setActivityData(mockActivityData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { stats, activityData, isLoading, error };
}
