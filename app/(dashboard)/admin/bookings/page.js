'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await api.get('/api/admin/bookings');
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to update status
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/admin/bookings/${id}`, { status });
      // Refresh the list after successful update
      fetchBookings();
    } catch (err) {
      alert('Failed to update booking status');
    }
  };

  if (loading) return <div className="p-8">Loading bookings...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Booking Management</h1>
      <table className="w-full bg-white rounded shadow text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-left">User Email</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id} className="border-t">
              <td className="p-4">{b.user?.email || 'N/A'}</td>
              <td className="p-4 capitalize">
                <span className={`px-2 py-1 rounded ${b.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {b.status}
                </span>
              </td>
              <td className="p-4">
                {b.status !== 'confirmed' && (
                  <button 
                    onClick={() => updateStatus(b._id, 'confirmed')} 
                    className="text-green-600 font-bold hover:underline mr-4"
                  >
                    Confirm
                  </button>
                )}
                {b.status !== 'cancelled' && (
                  <button 
                    onClick={() => updateStatus(b._id, 'cancelled')} 
                    className="text-red-600 font-bold hover:underline"
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}