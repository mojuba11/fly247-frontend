'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api'; // Ensure your axios/api instance is set up

// 1. Define the Booking interface
interface Booking {
  _id: string;
  paymentReference: string;
  status: string;
}

export default function UserDashboard() {
  // 2. Apply the interface to the state definition
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch bookings specifically for the logged-in user
    const fetchUserBookings = async () => {
      try {
        const res = await api.get('/api/user/my-bookings');
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-flyBlue mb-6">Welcome Back, Traveler!</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Your Upcoming Flights</h2>
          
          {loading ? (
            <p>Loading your bookings...</p>
          ) : bookings.length > 0 ? (
            <ul className="space-y-4">
              {bookings.map((booking) => (
                <li key={booking._id} className="p-4 border rounded-lg flex justify-between">
                  <div>
                    <p className="font-bold">Flight Ref: {booking.paymentReference}</p>
                    <p className="text-sm text-gray-600">Status: {booking.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p className="text-gray-500">No active bookings found. Start your search now!</p>
              <a href="/" className="mt-4 inline-block bg-flyOrange text-white px-4 py-2 rounded-lg">
                Search Flights
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}