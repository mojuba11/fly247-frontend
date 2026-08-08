import Link from 'next/link';
import { LayoutDashboard, CalendarCheck, CreditCard, ArrowLeft } from 'lucide-react';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-black text-flyBlue">Fly247 Admin</h1>
          <p className="text-xs text-gray-400">Management Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-orange-50 hover:text-flyOrange rounded-xl transition">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-orange-50 hover:text-flyOrange rounded-xl transition">
            <CalendarCheck size={18} /> Bookings
          </Link>
          <Link href="/admin/payments" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-orange-50 hover:text-flyOrange rounded-xl transition">
            <CreditCard size={18} /> Payments
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 px-4 py-2">
            <ArrowLeft size={14} /> Back to Website
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
