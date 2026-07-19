// app/admin/page.tsx
export default function AdminDashboard() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-flyBlue mb-8">Admin Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-flyOrange">$45,231</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Active Bookings</h3>
          <p className="text-2xl font-bold text-flyBlue">128</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Platform Commission</h3>
          <p className="text-2xl font-bold text-green-600">$4,523</p>
        </div>
      </div>

      {/* Placeholder for Management Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="pb-3">User</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4">John Doe</td>
              <td className="py-4">$450</td>
              <td className="py-4 text-green-500">Paid</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}