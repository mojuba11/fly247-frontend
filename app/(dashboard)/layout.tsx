// app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-flyBlue text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-10 text-flyOrange">Fly247 Portal</h2>
        <nav className="space-y-4">
          <a href="/admin" className="block p-2 hover:bg-blue-900 rounded transition">Admin Overview</a>
          <a href="/admin/payments" className="block p-2 hover:bg-blue-900 rounded transition">Payments & Commissions</a>
          <a href="/user" className="block p-2 hover:bg-blue-900 rounded transition">My Bookings</a>
          <hr className="border-blue-900 my-4" />
          <a href="/" className="block p-2 text-gray-300 hover:text-white transition">Back to Home</a>
        </nav>
      </aside>
      
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}