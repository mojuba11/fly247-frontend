"use client";
import { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { X, CheckCircle, Plane } from 'lucide-react';

export default function BookingModal() {
  const { selectedFlight, isModalOpen, setIsModalOpen } = useBooking();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isModalOpen || !selectedFlight) return null;

  const handleClose = () => {
    setIsModalOpen(false);
    // Reset states after modal closes to ensure clean state next time
    setTimeout(() => {
      setIsConfirmed(false);
      setIsProcessing(false);
    }, 300);
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true); // Start loading state

    // Simulate secure payment processing delay (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false); // Stop loading
    setIsConfirmed(true);   // Move to confirmed state
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={handleClose} 
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 rounded-full bg-gray-50"
        >
          <X size={20} />
        </button>

        {isConfirmed ? (
          /* Confirmation Step */
          <div className="text-center py-6">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
            <h3 className="text-2xl font-black text-gray-900">Booking Confirmed!</h3>
            <p className="text-gray-600 mt-2">
              Your flight with <strong className="text-flyBlue">{selectedFlight.airline}</strong> has been successfully reserved.
            </p>
            <div className="bg-blue-50 p-4 rounded-2xl my-6 text-left border border-blue-100">
              <p className="text-sm text-gray-500 font-semibold">TOTAL PAID</p>
              <p className="text-2xl font-black text-flyBlue">{selectedFlight.price}</p>
              <p className="text-xs text-gray-500 mt-1">Time: {selectedFlight.time}</p>
            </div>
            <button 
              onClick={handleClose} 
              className="w-full bg-flyBlue text-white py-4 rounded-xl font-bold hover:bg-blue-950 transition"
            >
              Done & Return to Flights
            </button>
          </div>
        ) : (
          /* Booking Form Step */
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-50 p-3 rounded-full text-flyOrange">
                <Plane size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-flyBlue">Complete Booking</h2>
                <p className="text-sm text-gray-500">{selectedFlight.airline} • {selectedFlight.price}</p>
              </div>
            </div>

            <form onSubmit={handleConfirm} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">Full Name (as on ID)</label>
                <input required className="w-full p-3 border border-gray-200 rounded-xl mt-1 outline-none focus:border-flyBlue" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">Email Address</label>
                <input required type="email" className="w-full p-3 border border-gray-200 rounded-xl mt-1 outline-none focus:border-flyBlue" placeholder="john@example.com" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">Passport / ID Number</label>
                <input required className="w-full p-3 border border-gray-200 rounded-xl mt-1 outline-none focus:border-flyBlue" placeholder="A12345678" />
              </div>
              
              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full bg-flyOrange text-white py-4 rounded-xl font-black hover:bg-orange-600 transition shadow-lg mt-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing Payment..." : `Confirm & Pay ${selectedFlight.price}`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}