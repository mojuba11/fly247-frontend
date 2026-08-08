"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface FlightDetails {
  id?: string;
  airline?: string;
  origin?: string;
  destination?: string;
  price?: number;
  date?: string;
  departureTime?: string;
  arrivalTime?: string;
  flightNumber?: string;
  [key: string]: any;
}

interface BookingContextType {
  selectedFlight: FlightDetails | null;
  setSelectedFlight: (flight: FlightDetails | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  passengerCount: number;
  setPassengerCount: (count: number) => void;
  travelClass: 'economy' | 'business' | 'first';
  setTravelClass: (travelClass: 'economy' | 'business' | 'first') => void;
  clearBookingState: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedFlight, setSelectedFlight] = useState<FlightDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const [travelClass, setTravelClass] = useState<'economy' | 'business' | 'first'>('economy');

  const clearBookingState = () => {
    setSelectedFlight(null);
    setPassengerCount(1);
    setTravelClass('economy');
    setIsModalOpen(false);
  };

  return (
    <BookingContext.Provider 
      value={{ 
        selectedFlight, 
        setSelectedFlight, 
        isModalOpen, 
        setIsModalOpen,
        passengerCount,
        setPassengerCount,
        travelClass,
        setTravelClass,
        clearBookingState
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
