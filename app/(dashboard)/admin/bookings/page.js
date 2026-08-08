'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Ticket, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface Booking {
  _id: string;
  user?: {
    email?: string;
  };
  flightDetails?: {
    origin?: string;
    destination?: string;
    airline?: string;
    price?: number;
  };
  status: 'pending' | 'confirmed' | 'cancelled' | string;
  createdAt?: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setError('');
      const res = await api.get('/api/admin/bookings');
      // Handle various response data structures (e.g. res.data.bookings or direct array)
      const data = Array.isArray(res.data) ? res.data : res.data.bookings || res.data.data || [];
      setBookings(data);
    } catch (err: any) {
      console.error("Failed to fetch bookings", err);
      setError(err.response?.data?.message || "Failed to fetch bookings. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to update status
  const updateStatus = async (id: string, status: string) => {
    try {
      setActionLoadingId(id);
      await api.put(`/api/admin/bookings/${id}`, { status });
      await fetchBookings();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update booking status');
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-flyOrange"></div>
        <p className="text-gray-500 font-medium">Loading bookings management...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Booking Management</h1>
          <p className="text-sm text-gray-500">View and manage customer flight reservations and payment statuses.</p>
        </div>
        <button 
          onClick={fetchBookings} 
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

      {/* Bookings Table / Card container */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="p-4 sm:p-6">User Email</th>
                <th className="p-4 sm:p-6">Flight Route</th>
                <th className="p-4 sm:p-6">Status</th>
                <th className="p-4 sm:p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-500">
                    <Ticket className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                    <p className="font-semibold text-lg">No bookings found</p>
                    <p className="text-xs text-gray-400 mt-1">Bookings placed by users will appear here.</p>
                  </td>
                </tr>
              ) : (
                bookings.map((b) => {
                  const isBusy = actionLoadingId === b._id;
                  return (
                    <tr key={b._id} className="hover:bg-gray-50/50 transition">
                      <td className="p-4 sm:p-6 font-semibold text-zinc-900">
                        {b.user?.email || 'N/A'}
                      </td>
                      <td className="p-4 sm:p-6 text-gray-600 font-medium">
                        {b.flightDetails?.origin && b.flightDetails?.destination ? (
                          <span>{b.flightDetails.origin} → {b.flightDetails.destination}</span>
                        ) : (
                          <span className="text-gray-400 italic">Standard Booking</span>
                        )}
                      </td>
                      <td className="p-4 sm:p-6 capitalize">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          b.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : b.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {b.status === 'confirmed' && <CheckCircle size={12} />}
                          {b.status === 'cancelled' && <XCircle size={12} />}
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4 sm:p-6 text-right space-x-3">
                        {b.status !== 'confirmed' && (
                          <button 
                            disabled={isBusy}
                            onClick={() => updateStatus(b._id, 'confirmed')} 
                            className="text-green-600 font-bold hover:underline disabled:opacity-50 cursor-pointer"
                          >
                            {isBusy ? 'Updating...' : 'Confirm'}
                          </button>
                        )}
                        {b.status !== 'cancelled' && (
                          <button 
                            disabled={isBusy}
                            onClick={() => updateStatus(b._id, 'cancelled')} 
                            className="text-red-600 font-bold hover:underline disabled:opacity-50 cursor-pointer"
                          >
                            {isBusy ? 'Updating...' : 'Cancel'}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
