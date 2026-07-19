'use client';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-xl font-bold mb-10">Fly247 Admin</h2>
        <nav className="space-y-4">
          <Link href="/admin/dashboard" className="block p-2 hover:bg-slate-800 rounded">Dashboard</Link>
          <Link href="/admin/bookings" className="block p-2 hover:bg-slate-800 rounded">Bookings</Link>
          <Link href="/admin/users" className="block p-2 hover:bg-slate-800 rounded">Users</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}