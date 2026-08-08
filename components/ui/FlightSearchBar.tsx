"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Calendar, ArrowRightLeft } from 'lucide-react';

export default function FlightSearchBar() {
  const router = useRouter();
  const [formData, setFormData] = useState({ 
    tripType: 'Round Trip',
    origin: '', 
    destination: '', 
    date: '',
    classType: 'Economy',
    flexibleDates: false
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation Logic
    const today = new Date().toISOString().split('T')[0];
    
    if (formData.date && formData.date < today) {
      alert("Please select a date from today onwards.");
      return;
    }
    
    if (formData.origin.toLowerCase().trim() === formData.destination.toLowerCase().trim()) {
      alert("Origin and destination cannot be the same.");
      return;
    }

    // Proceed with search (matching /flight route)
    const query = new URLSearchParams(formData as any).toString();
    router.push(`/flight?${query}`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-5xl mx-auto -mt-16 relative z-10 border border-gray-100">
      
      {/* Top Controls: Mobile optimized flex-wrap */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-700">
          {['One Way', 'Round Trip', 'Multi City'].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="tripType" 
                checked={formData.tripType === type} 
                onChange={() => setFormData({...formData, tripType: type})} 
                className="accent-flyBlue" 
              />
              {type}
            </label>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 cursor-pointer whitespace-nowrap">
            <input 
              type="checkbox" 
              checked={formData.flexibleDates} 
              onChange={(e) => setFormData({...formData, flexibleDates: e.target.checked})} 
              className="accent-flyBlue w-4 h-4" 
            />
            Flexible Dates
          </label>
          <select 
            className="bg-gray-50 px-3 py-1 rounded-md outline-none text-gray-900" 
            value={formData.classType} 
            onChange={(e) => setFormData({...formData, classType: e.target.value})}
          >
            <option>Economy</option>
            <option>Business</option>
            <option>First Class</option>
          </select>
        </div>
      </div>

      {/* Main Inputs: Responsive Grid */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Origin */}
        <div className="md:col-span-3 flex items-center p-3 border border-gray-200 rounded-lg bg-white">
          <MapPin className="text-flyOrange mr-2 shrink-0" size={20} />
          <input 
            required 
            placeholder="From (e.g. LOS)" 
            value={formData.origin}
            className="w-full outline-none text-gray-900 placeholder:text-gray-400 bg-transparent uppercase" 
            onChange={(e) => setFormData({...formData, origin: e.target.value.toUpperCase()})} 
          />
        </div>
        
        {/* Switch Icon */}
        <div className="flex justify-center md:col-span-1">
          <ArrowRightLeft size={16} className="text-gray-400 rotate-90 md:rotate-0" />
        </div>

        {/* Destination */}
        <div className="md:col-span-3 flex items-center p-3 border border-gray-200 rounded-lg bg-white">
          <MapPin className="text-flyOrange mr-2 shrink-0" size={20} />
          <input 
            required 
            placeholder="To (e.g. LHR)" 
            value={formData.destination}
            className="w-full outline-none text-gray-900 placeholder:text-gray-400 bg-transparent uppercase" 
            onChange={(e) => setFormData({...formData, destination: e.target.value.toUpperCase()})} 
          />
        </div>

        {/* Date */}
        <div className="md:col-span-3 flex items-center p-3 border border-gray-200 rounded-lg bg-white">
          <Calendar className="text-flyOrange mr-2 shrink-0" size={20} />
          <input 
            required 
            type="date" 
            min={new Date().toISOString().split('T')[0]}
            value={formData.date}
            className="w-full outline-none text-gray-900 bg-transparent" 
            onChange={(e) => setFormData({...formData, date: e.target.value})} 
          />
        </div>

        {/* Search Button */}
        <button 
          type="submit" 
          className="md:col-span-2 bg-flyOrange text-white font-black py-4 rounded-lg hover:bg-orange-600 transition text-lg w-full cursor-pointer"
        >
          SEARCH
        </button>
      </form>
    </div>
  );
}
