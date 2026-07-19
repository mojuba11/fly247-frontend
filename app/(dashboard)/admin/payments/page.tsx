// app/(dashboard)/admin/payments/page.tsx
export default function PaymentsPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-flyBlue mb-8">Financial Overview</h1>
      
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase">Gross Revenue</p>
          <p className="text-2xl font-bold text-flyBlue">$120,400</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase">Total Commissions</p>
          <p className="text-2xl font-bold text-flyOrange">$18,060</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase">Pending Payouts</p>
          <p className="text-2xl font-bold text-red-500">$4,200</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 uppercase">Net Profit</p>
          <p className="text-2xl font-bold text-green-600">$98,140</p>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6">Commission Ledger</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-400 text-sm uppercase">
              <tr className="border-b">
                <th className="pb-4">Booking ID</th>
                <th className="pb-4">Agent/Partner</th>
                <th className="pb-4">Total Sale</th>
                <th className="pb-4">Commission (15%)</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-700">
              <tr>
                <td className="py-4">#FL-9901</td>
                <td className="py-4">TravelEase Ltd</td>
                <td className="py-4">$1,200</td>
                <td className="py-4">$180</td>
                <td className="py-4 text-green-600 font-medium">Paid</td>
              </tr>
              <tr>
                <td className="py-4">#FL-9902</td>
                <td className="py-4">Global Voyages</td>
                <td className="py-4">$850</td>
                <td className="py-4">$127.50</td>
                <td className="py-4 text-yellow-600 font-medium">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}