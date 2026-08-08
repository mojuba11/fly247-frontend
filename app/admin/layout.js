'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Ticket, Users, CreditCard, LogOut, Plane } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Bookings', href: '/admin/bookings', icon: Ticket },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-zinc-900 overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between hidden md:flex border-r border-slate-800">
        <div>
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="bg-flyOrange p-2.5 rounded-2xl text-white shadow-sm">
              <Plane size={20} />
            </div>
            <div>
              <h2 className="text-base font-black tracking-wide">Fly247</h2>
              <p className="text-xs text-slate-400 font-medium">Admin Control Panel</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition ${
                    isActive 
                      ? 'bg-flyOrange text-white shadow-lg' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            Return to Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition cursor-pointer"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
