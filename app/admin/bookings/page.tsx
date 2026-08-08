"use client";


import { useEffect, useState } from 'react';
import { Calendar, Users, Plane, Search, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { fetchAdminBookings } from '@/lib/api';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function getBookings() {
      try {
        setLoading(true);
        const res = await fetchAdminBookings();
        if (res && res.success) {
          setBookings(res.data || res.bookings || []);
        } else {
          setBookings([]);
          setError('Failed to retrieve bookings inventory.');
        }
      } catch (err: any) {
        console.error("Admin bookings fetch error:", err);
        setError(err.response?.data?.message || 'Server error while fetching bookings.');
      } finally {
        setLoading(false);
      }
    }

    getBookings();
  }, []);

  const filteredBookings = bookings.filter((b) => 
    b.pnr?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.airline?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-flyBlue">Manage Bookings</h1>
          <p className="text-sm text-gray-500">Monitor all flight reservations, passenger details, and PNR codes.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search by PNR, Email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-flyBlue text-sm text-zinc-900 shadow-sm"
          />
        </div>
      </div>

      {loading && (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-flyOrange mx-auto"></div>
          <p className="text-gray-600 font-medium text-sm">Loading enterprise bookings...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center text-red-600 flex items-center justify-center gap-2">
          <AlertCircle size={20} />
          <p className="font-semibold text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && filteredBookings.length === 0 && (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center text-gray-500">
          <p className="text-base font-semibold">No booking records found.</p>
        </div>
      )}

      {!loading && filteredBookings.length > 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-wider">
                  <th className="p-4">PNR / Ref</th>
                  <th className="p-4">Passenger</th>
                  <th className="p-4">Airline / Route</th>
                  <th className="p-4">Amount Paid</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredBookings.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 font-bold text-flyBlue">{item.pnr || item.reference || 'N/A'}</td>
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{item.passenger_name || item.full_name || 'Guest'}</p>
                      <p className="text-xs text-gray-400">{item.email}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-gray-800">{item.airline || 'Airline'}</p>
                      <p className="text-xs text-gray-400">{item.origin} <ArrowRight className="inline" size={10} /> {item.destination}</p>
                    </td>
                    <td className="p-4 font-extrabold text-gray-900">
                      ₦{typeof item.price === 'number' ? item.price.toLocaleString() : (item.price || '0')}
                    </td>
                    <td className="p-4">
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}