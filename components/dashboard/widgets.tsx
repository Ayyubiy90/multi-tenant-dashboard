'use client';

import { Card } from '@/components/ui/card';
import { 
  Users, 
  DollarSign, 
  TrendingUp,
  Activity,
  Settings 
} from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { WIDGET_PERMISSIONS } from '@/lib/types/tenant';
import { useRealtimeData } from '@/lib/hooks/useRealtimeData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const mockData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 500 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 600 },
  { name: 'Sat', value: 550 },
  { name: 'Sun', value: 700 },
];

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  canCustomize = false,
}: { 
  title: string; 
  value: string; 
  icon: any;
  trend: number;
  canCustomize?: boolean;
}) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
        <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? '+' : ''}{trend}% from last week
        </p>
      </div>
      <Icon className="h-8 w-8 text-muted-foreground" />
    </div>
  </Card>
);

export function DashboardWidgets() {
  const { user } = useAuth();
  const userRole = user?.role || 'viewer';
  const permissions = WIDGET_PERMISSIONS[userRole];

  const { data: usersData, isLoading: usersLoading } = useRealtimeData(2420);
  const { data: revenueData, isLoading: revenueLoading } = useRealtimeData(45231);
  const { data: conversionData, isLoading: conversionLoading } = useRealtimeData(3.2);
  const { data: engagementData, isLoading: engagementLoading } = useRealtimeData(87);

  if (usersLoading || revenueLoading || conversionLoading || engagementLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Daily Active Users"
          value="2,420"
          icon={Users}
          trend={12}
        />
        <StatCard
          title="Revenue"
          value="$45,231"
          icon={DollarSign}
          trend={8}
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          icon={TrendingUp}
          trend={-2}
        />
        <StatCard
          title="User Engagement"
          value="87%"
          icon={Activity}
          trend={5}
        />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Weekly User Activity</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}