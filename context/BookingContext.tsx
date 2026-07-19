"use client";
import { createContext, useContext, useState } from 'react';

const BookingContext = createContext<any>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedFlight, setSelectedFlight] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BookingContext.Provider value={{ selectedFlight, setSelectedFlight, isModalOpen, setIsModalOpen }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);