'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Ticket, Plane, Calendar, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';

interface Booking {
  _id: string;
  paymentReference: string;
  status: string;
  flightDetails?: {
    origin?: string;
    destination?: string;
    airline?: string;
    date?: string;
    price?: number;
  };
  totalAmount?: number;
  createdAt?: string;
}

export default function UserDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/api/user/my-bookings');
      // Handle direct array or nested data structures
      const data = Array.isArray(res.data) ? res.data : res.data.bookings || res.data.data || [];
      setBookings(data);
    } catch (err: any) {
      console.error("Failed to fetch user bookings", err);
      setError(err.response?.data?.message || "Failed to load your bookings. Please ensure you are logged in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-flyOrange"></div>
        <p className="text-gray-500 font-medium">Loading your travel dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Welcome Back, Traveler!</h1>
          <p className="text-sm text-gray-500">Manage your active flight bookings and review travel history.</p>
        </div>
        <button 
          onClick={fetchUserBookings} 
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

      {/* Bookings Card Container */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
          <Ticket className="text-flyOrange" size={24} /> Your Upcoming Flights
        </h2>

        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div 
                key={booking._id} 
                className="p-6 border border-gray-100 bg-gray-50/50 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gray-200 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-50 text-flyBlue p-2.5 rounded-xl">
                      <Plane size={20} />
                    </span>
                    <div>
                      <p className="font-black text-lg text-zinc-900">
                        {booking.flightDetails?.origin || 'LOS'} 
                        <ArrowRight className="inline mx-1.5 text-gray-400" size={16} /> 
                        {booking.flightDetails?.destination || 'LHR'}
                      </p>
                      <p className="text-xs text-gray-400 font-semibold">Ref: {booking.paymentReference}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-600 font-medium pt-1">
                    {booking.flightDetails?.airline && (
                      <span className="bg-white px-3 py-1 rounded-full border border-gray-200">
                        {booking.flightDetails.airline}
                      </span>
                    )}
                    {booking.flightDetails?.date && (
                      <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-gray-200">
                        <Calendar size={14} /> {booking.flightDetails.date}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-gray-200">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                  {booking.totalAmount && (
                    <p className="font-black text-gray-900">₦{booking.totalAmount.toLocaleString()}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-8">
            <Ticket className="mx-auto h-12 w-12 text-gray-300 mb-2" />
            <p className="text-lg font-bold text-gray-800">No active bookings found</p>
            <p className="text-sm text-gray-500 mt-1 mb-6">Start exploring available destinations and book your next flight.</p>
            <Link 
              href="/" 
              className="inline-block bg-flyOrange text-white font-bold px-8 py-3.5 rounded-xl hover:bg-orange-600 transition shadow-md"
            >
              Search Flights
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
