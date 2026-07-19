"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from "@/components/layout/Navbar";
import { Plane, Calendar, Clock, Briefcase, Users, ArrowRight } from 'lucide-react';
import { useBooking } from '@/context/BookingContext';

// This is the inner component that accesses searchParams
function FlightResultsContent() {
  const searchParams = useSearchParams();
  const { setSelectedFlight, setIsModalOpen } = useBooking();
  
  // Capturing search parameters
  const flightInfo = {
    origin: searchParams.get('origin') || 'Lagos',
    destination: searchParams.get('destination') || 'London',
    date: searchParams.get('date') || '2026-08-01',
    classType: searchParams.get('classType') || 'Economy',
    tripType: searchParams.get('tripType') || 'Round Trip'
  };

  const flightResults = [
    { id: 1, airline: 'Air Peace', price: '₦580,000', time: '08:00 AM - 12:00 PM' },
    { id: 2, airline: 'British Airways', price: '₦950,000', time: '10:30 AM - 02:30 PM' },
    { id: 3, airline: 'Virgin Atlantic', price: '₦920,000', time: '02:00 PM - 06:00 PM' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-extrabold text-flyBlue">Available Flights</h1>
        <div className="flex flex-wrap gap-4 mt-4 text-gray-600 text-sm">
          <span className="bg-gray-100 px-3 py-1 rounded-full font-bold text-flyBlue">
            {flightInfo.origin} <ArrowRight className="inline mx-1" size={14} /> {flightInfo.destination}
          </span>
          <span className="flex items-center gap-1"><Calendar size={16} /> {flightInfo.date}</span>
          <span className="flex items-center gap-1"><Briefcase size={16} /> {flightInfo.classType}</span>
          <span className="flex items-center gap-1"><Users size={16} /> {flightInfo.tripType}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {flightResults.map((flight) => (
          <div key={flight.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-4 rounded-full">
                <Plane className="text-flyBlue" size={24} />
              </div>
              <div>
                <p className="font-bold text-lg text-flyBlue">{flight.airline}</p>
                <p className="text-sm text-gray-400">{flightInfo.origin} to {flightInfo.destination}</p>
                <div className="flex gap-4 text-gray-600 text-sm mt-1">
                  <span className="flex items-center gap-1"><Clock size={14}/> {flight.time}</span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-2xl font-extrabold text-gray-900">{flight.price}</p>
              <button 
                onClick={() => {
                  setSelectedFlight(flight);
                  setIsModalOpen(true);
                }}
                className="mt-2 bg-flyOrange text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-md"
              >
                Select Flight
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// This is the default export that wraps the content in Suspense
export default function FlightsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={<div className="p-12 text-center">Loading flights...</div>}>
        <FlightResultsContent />
      </Suspense>
    </main>
  );
}