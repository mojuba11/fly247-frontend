"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Fixed position ensures it stays at the top.
    // Ensure your main content has a padding-top (e.g., pt-24) to avoid overlap.
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-16 md:px-10 py-4 bg-white shadow-md border-b border-gray-100 z-[9999]">
      {/* Brand Logo - Updated to use your local image */}
      <Link href="/" className="flex items-center">
        <img 
          src="/images/fly247logo5.jpeg" 
          alt="Fly247 Logo" 
          className="h-20 w-auto object-contain min-w-[120px]"
        />
      </Link>

      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden">
        <button 
          type="button"
          className="p-2 text-gray-700 cursor-pointer pointer-events-auto" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-8 font-medium text-gray-700">
        <Link href="/" className="hover:text-flyBlue transition-colors">Home</Link>
        <Link href="/flights" className="hover:text-flyBlue transition-colors">Flights</Link>
        <Link href="/deals" className="hover:text-flyBlue transition-colors">Deals</Link>
        <Link href="/support" className="hover:text-flyBlue transition-colors">Support</Link>
      </div>

      {/* Desktop Action Buttons */}
      <div className="hidden md:flex gap-4 items-center">
        <button className="relative p-2 text-gray-600 hover:text-flyBlue transition-colors">
          <ShoppingCart size={24} />
          <span className="absolute top-0 right-0 bg-flyOrange text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
        </button>
        <Link href="/login" className="text-flyBlue font-semibold hover:text-flyBlue/80 transition-colors">Login</Link>
        <Link href="/register" className="bg-flyBlue text-white px-6 py-2.5 rounded-full hover:bg-blue-950 transition-all shadow-sm">Sign Up</Link>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl p-6 flex flex-col gap-6 md:hidden z-[9998]">
          <Link href="/" className="text-lg font-bold text-gray-700" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/flights" className="text-lg font-bold text-gray-700" onClick={() => setIsOpen(false)}>Flights</Link>
          <Link href="/deals" className="text-lg font-bold text-gray-700" onClick={() => setIsOpen(false)}>Deals</Link>
          <Link href="/support" className="text-lg font-bold text-gray-700" onClick={() => setIsOpen(false)}>Support</Link>
          
          <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
            <Link href="/login" className="text-flyBlue font-bold text-lg" onClick={() => setIsOpen(false)}>Login</Link>
            <Link href="/register" className="bg-flyBlue text-white text-center py-3 rounded-full font-bold" onClick={() => setIsOpen(false)}>Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}