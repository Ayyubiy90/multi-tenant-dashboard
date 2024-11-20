export interface DashboardStats {
  dailyActiveUsers: {
    value: number;
    trend: number;
  };
  revenue: {
    value: number;
    trend: number;
  };
  conversionRate: {
    value: number;
    trend: number;
  };
  userEngagement: {
    value: number;
    trend: number;
  };
}

export interface ActivityData {
  name: string;
  value: number;
}

export const mockStats: DashboardStats = {
  dailyActiveUsers: {
    value: 2420,
    trend: 12
  },
  revenue: {
    value: 45231,
    trend: 8
  },
  conversionRate: {
    value: 3.2,
    trend: -2
  },
  userEngagement: {
    value: 87,
    trend: 5
  }
};

export const mockActivityData: ActivityData[] = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 500 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 600 },
  { name: 'Sat', value: 550 },
  { name: 'Sun', value: 700 },
];
