'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { TrendingUp, Ticket, Users, AlertCircle, RefreshCw } from 'lucide-react';

interface Stats {
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ totalBookings: 0, totalRevenue: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/api/admin/stats');
      // Handle direct object or nested response data
      const data = res.data.stats || res.data.data || res.data;
      setStats({
        totalBookings: data.totalBookings || 0,
        totalRevenue: data.totalRevenue || 0,
        totalUsers: data.totalUsers || 0,
      });
    } catch (err: any) {
      console.error("Failed to fetch dashboard stats", err);
      setError(err.response?.data?.message || 'Failed to load analytics. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-flyOrange"></div>
        <p className="text-gray-500 font-medium">Loading admin overview...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Admin Overview</h1>
          <p className="text-sm text-gray-500">Real-time platform performance metrics and analytics.</p>
        </div>
        <button 
          onClick={fetchStats}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer"
        >
          <RefreshCw size={16} /> Refresh Stats
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-red-600 flex items-center gap-2 text-sm">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Revenue Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-orange-50 text-flyOrange p-4 rounded-2xl">
            <TrendingUp size={28} />
          </div>
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Revenue</h3>
            <p className="text-2xl font-black text-zinc-900 mt-1">
              ₦{stats.totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-50 text-flyBlue p-4 rounded-2xl">
            <Ticket size={28} />
          </div>
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Bookings</h3>
            <p className="text-2xl font-black text-zinc-900 mt-1">
              {stats.totalBookings.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Total Users Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl">
            <Users size={28} />
          </div>
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Users</h3>
            <p className="text-2xl font-black text-zinc-900 mt-1">
              {stats.totalUsers.toLocaleString()}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
