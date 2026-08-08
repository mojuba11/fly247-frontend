"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from "@/components/layout/Navbar";
import { Plane, Calendar, Clock, Briefcase, Users, ArrowRight, AlertCircle } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';
import { searchFlights } from '@/lib/api';
import BookingModal from '@/ui/BookingModal';
import FlightSearchBar from '@/ui/FlightSearchBar';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const { setSelectedFlight, setIsModalOpen } = useBooking();
  
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Capturing search parameters
  const fromParam = searchParams.get('from' ) || searchParams.get('origin') || 'LOS';
  const toParam = searchParams.get('to') || searchParams.get('destination') || 'LHR';
  const dateParam = searchParams.get('date') || new Date().toISOString().split('T')[0];
  const classTypeParam = searchParams.get('classType') || 'Economy';
  const passengersParam = searchParams.get('passengers') || '1';

  useEffect(() => {
    async function fetchLiveFlights() {
      try {
        setLoading(true);
        setError('');

        const payload = {
          origin: fromParam.toUpperCase(),
          destination: toParam.toUpperCase(),
          departure_date: dateParam,
          passengers: Number(passengersParam),
          cabin_class: classTypeParam.toLowerCase(),
        };

        const response = await searchFlights(payload);

        if (response && response.success && response.data?.flights) {
          setFlights(response.data.flights); // Contains your 5% markup prices!
        } else if (response && response.flights) {
          setFlights(response.flights);
        } else {
          setFlights([]);
          setError('No flights found for this route and date.');
        }
      } catch (err: any) {
        console.error("Flight search error:", err);
        setError(err.response?.data?.message || 'Failed to fetch live flights from server. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchLiveFlights();
  }, [fromParam, toParam, dateParam, passengersParam, classTypeParam]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <FlightSearchBar />
      </div>

      {/* Search Summary Header */}
      <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6">
        <h1 className="text-2xl font-extrabold text-flyBlue">Available Flights</h1>
        <div className="flex flex-wrap gap-4 mt-4 text-gray-600 text-sm">
          <span className="bg-gray-100 px-3 py-1 rounded-full font-bold text-flyBlue flex items-center">
            {fromParam.toUpperCase()} <ArrowRight className="inline mx-1" size={14} /> {toParam.toUpperCase()}
          </span>
          <span className="flex items-center gap-1"><Calendar size={16} /> {dateParam}</span>
          <span className="flex items-center gap-1"><Briefcase size={16} /> {classTypeParam}</span>
          <span className="flex items-center gap-1"><Users size={16} /> {passengersParam} Passenger(s)</span>
        </div>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-flyOrange mx-auto"></div>
          <p className="text-gray-600 font-medium">Searching live supplier inventory...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center text-red-600 flex flex-col items-center gap-2">
          <AlertCircle size={24} />
          <p className="font-semibold">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && flights.length === 0 && (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center text-gray-500">
          <p className="text-lg font-semibold">No flights available for this search.</p>
          <p className="text-sm mt-1">Try modifying your airports or travel dates.</p>
        </div>
      )}

      {/* Live Flight Results List */}
      {!loading && flights.length > 0 && (
        <div className="space-y-4">
          {flights.map((flight, index) => (
            <div key={flight.id || index} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-4 rounded-full">
                  <Plane className="text-flyBlue" size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg text-flyBlue">{flight.airline || flight.airline_name || 'Airline'}</p>
                  <p className="text-sm text-gray-400">{flight.flight_number ? `Flight: ${flight.flight_number}` : `${fromParam.toUpperCase()} to ${toParam.toUpperCase()}`}</p>
                  <div className="flex gap-4 text-gray-600 text-sm mt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={14}/> {flight.departure_time || flight.time || 'Schedule available'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-right">
                <p className="text-2xl font-extrabold text-gray-900">
                  ₦{typeof flight.price === 'number' ? flight.price.toLocaleString() : flight.price}
                </p>
                <button 
                  onClick={() => {
                    setSelectedFlight(flight);
                    setIsModalOpen(true);
                  }}
                  className="mt-2 bg-flyOrange text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-md cursor-pointer"
                >
                  Select Flight
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading flight search...</div>}>
        <SearchResultsContent />
      </Suspense>
      <BookingModal />
    </main>
  );
}
