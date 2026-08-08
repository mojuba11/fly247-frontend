'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { TrendingUp, Ticket, DollarSign, AlertCircle, RefreshCw, CreditCard } from 'lucide-react';

interface RecentTransaction {
  _id: string;
  user?: {
    email?: string;
    name?: string;
  };
  totalAmount?: number;
  amount?: number;
  status: string;
}

interface AdminDashboardStats {
  totalRevenue: number;
  activeBookings: number;
  platformCommission: number;
  recentTransactions: RecentTransaction[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminDashboardStats>({
    totalRevenue: 0,
    activeBookings: 0,
    platformCommission: 0,
    recentTransactions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/api/admin/stats'); // Or your main admin dashboard endpoint
      const data = res.data;

      setStats({
        totalRevenue: data.totalRevenue || data.stats?.totalRevenue || 0,
        activeBookings: data.activeBookings || data.stats?.activeBookings || 0,
        platformCommission: data.platformCommission || data.stats?.platformCommission || 0,
        recentTransactions: data.recentTransactions || data.transactions || [],
      });
    } catch (err: any) {
      console.error("Failed to fetch admin dashboard stats", err);
      setError(err.response?.data?.message || "Failed to load dashboard data. Ensure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-flyOrange"></div>
        <p className="text-gray-500 font-medium">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Platform performance metrics, bookings, and recent revenue logs.</p>
        </div>
        <button 
          onClick={fetchDashboardData}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-red-600 flex items-center gap-2 text-sm">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-orange-50 text-flyOrange p-4 rounded-2xl">
            <TrendingUp size={28} />
          </div>
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Revenue</h3>
            <p className="text-2xl font-black text-zinc-900 mt-1">₦{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-50 text-flyBlue p-4 rounded-2xl">
            <Ticket size={28} />
          </div>
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Active Bookings</h3>
            <p className="text-2xl font-black text-zinc-900 mt-1">{stats.activeBookings.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl">
            <DollarSign size={28} />
          </div>
          <div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Platform Commission</h3>
            <p className="text-2xl font-black text-zinc-900 mt-1">₦{stats.platformCommission.toLocaleString()}</p>
          </div>
        </div>

      </div>

      {/* Management Table / Recent Transactions */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-black text-gray-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="p-4 sm:p-6">User</th>
                <th className="p-4 sm:p-6">Amount</th>
                <th className="p-4 sm:p-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {stats.recentTransactions.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-12 text-gray-500">
                    <CreditCard className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                    <p className="font-semibold text-lg">No recent transactions</p>
                    <p className="text-xs text-gray-400 mt-1">Recent user payments will appear here.</p>
                  </td>
                </tr>
              ) : (
                stats.recentTransactions.map((tx, idx) => (
                  <tr key={tx._id || idx} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 sm:p-6 font-bold text-zinc-900">
                      {tx.user?.email || tx.user?.name || 'Customer'}
                    </td>
                    <td className="p-4 sm:p-6 font-bold text-zinc-900">
                      ₦{(tx.totalAmount || tx.amount || 0).toLocaleString()}
                    </td>
                    <td className="p-4 sm:p-6 capitalize">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        tx.status?.toLowerCase() === 'paid' || tx.status?.toLowerCase() === 'confirmed'
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tx.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
