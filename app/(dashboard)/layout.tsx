"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, CreditCard, Ticket, Home, Menu, X } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Admin Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Payments & Commissions', href: '/admin/payments', icon: CreditCard },
    { name: 'My Bookings', href: '/user', icon: Ticket },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-flyBlue text-white p-4 flex justify-between items-center shadow-md">
        <h2 className="text-xl font-bold text-flyOrange">Fly247 Portal</h2>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 text-white cursor-pointer"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-flyBlue text-white p-6 space-y-2 border-b border-blue-900 shadow-xl">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition font-medium ${
                    isActive ? 'bg-flyOrange text-white' : 'hover:bg-blue-900 text-gray-200'
                  }`}
                >
                  <Icon size={18} /> {item.name}
                </Link>
              );
            })}
            <hr className="border-blue-900 my-4" />
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 text-gray-300 hover:text-white transition rounded-xl hover:bg-blue-900 font-medium"
            >
              <Home size={18} /> Back to Home
            </Link>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="w-64 bg-flyBlue text-white p-6 hidden md:flex flex-col justify-between shrink-0 shadow-lg">
        <div>
          <h2 className="text-2xl font-black mb-10 text-flyOrange tracking-wide">Fly247 Portal</h2>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-xl transition font-medium ${
                    isActive ? 'bg-flyOrange text-white shadow-md' : 'hover:bg-blue-900 text-gray-200'
                  }`}
                >
                  <Icon size={18} /> {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <hr className="border-blue-900 my-4" />
          <Link
            href="/"
            className="flex items-center gap-3 p-3 text-gray-300 hover:text-white transition rounded-xl hover:bg-blue-900 font-medium"
          >
            <Home size={18} /> Back to Home
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">{children}</main>
    </div>
  );
}
