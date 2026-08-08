'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { CreditCard, TrendingUp, DollarSign, Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface PaymentItem {
  _id: string;
  bookingId?: string;
  partner?: string;
  totalSale: number;
  commission: number;
  status: 'Paid' | 'Pending' | string;
}

interface FinancialStats {
  grossRevenue: number;
  totalCommissions: number;
  pendingPayouts: number;
  netProfit: number;
}

export default function PaymentsPage() {
  const [stats, setStats] = useState<FinancialStats>({
    grossRevenue: 0,
    totalCommissions: 0,
    pendingPayouts: 0,
    netProfit: 0,
  });
  const [transactions, setTransactions] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/api/admin/payments');
      const data = res.data;
      
      if (data) {
        setStats({
          grossRevenue: data.grossRevenue || 0,
          totalCommissions: data.totalCommissions || 0,
          pendingPayouts: data.pendingPayouts || 0,
          netProfit: data.netProfit || 0,
        });
        setTransactions(data.transactions || data.ledger || []);
      }
    } catch (err: any) {
      console.error("Failed to fetch payments data", err);
      setError(err.response?.data?.message || "Failed to load financial records. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-flyOrange"></div>
        <p className="text-gray-500 font-medium">Loading financial overview...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Financial Overview</h1>
          <p className="text-sm text-gray-500">Monitor gross revenue, commissions, and ledger transactions.</p>
        </div>
        <button 
          onClick={fetchFinancialData}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-red-600 flex items-center gap-2 text-sm">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-blue-50 text-flyBlue p-4 rounded-2xl">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Gross Revenue</p>
            <p className="text-xl font-black text-zinc-900 mt-1">₦{stats.grossRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-orange-50 text-flyOrange p-4 rounded-2xl">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Commissions</p>
            <p className="text-xl font-black text-zinc-900 mt-1">₦{stats.totalCommissions.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Pending Payouts</p>
            <p className="text-xl font-black text-zinc-900 mt-1">₦{stats.pendingPayouts.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Net Profit</p>
            <p className="text-xl font-black text-zinc-900 mt-1">₦{stats.netProfit.toLocaleString()}</p>
          </div>
        </div>

      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-black text-gray-900">Commission Ledger</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="p-4 sm:p-6">Booking ID</th>
                <th className="p-4 sm:p-6">Agent/Partner</th>
                <th className="p-4 sm:p-6">Total Sale</th>
                <th className="p-4 sm:p-6">Commission</th>
                <th className="p-4 sm:p-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    <CreditCard className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                    <p className="font-semibold text-lg">No financial transactions recorded</p>
                    <p className="text-xs text-gray-400 mt-1">Transactions and commissions will appear here as bookings are paid.</p>
                  </td>
                </tr>
              ) : (
                transactions.map((tx, idx) => (
                  <tr key={tx._id || idx} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 sm:p-6 font-bold text-zinc-900">{tx.bookingId || `#FL-${idx + 1000}`}</td>
                    <td className="p-4 sm:p-6 text-gray-700 font-medium">{tx.partner || 'Direct Customer'}</td>
                    <td className="p-4 sm:p-6 font-bold text-zinc-900">₦{tx.totalSale.toLocaleString()}</td>
                    <td className="p-4 sm:p-6 font-bold text-flyOrange">₦{tx.commission.toLocaleString()}</td>
                    <td className="p-4 sm:p-6 capitalize">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        tx.status.toLowerCase() === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
