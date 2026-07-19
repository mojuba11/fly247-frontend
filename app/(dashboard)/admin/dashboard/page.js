'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api'; // Ensure your api client is configured

export default function DashboardPage() {
  const [stats, setStats] = useState({ totalBookings: 0, totalRevenue: 0, totalUsers: 0 });

  useEffect(() => {
    // Fetch aggregated data from your backend endpoint
    api.get('/api/admin/stats').then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Overview</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm">Total Revenue</h3>
          <p className="text-2xl font-bold">₦{stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm">Total Bookings</h3>
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
      </div>
    </div>
  );
}