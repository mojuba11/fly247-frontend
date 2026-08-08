"use client";

import { useEffect, useState } from 'react';
import { CreditCard, Search, ShieldCheck, AlertCircle, ArrowUpRight } from 'lucide-react';
import { fetchAdminTransactions } from '@/lib/api';

export default function AdminPaymentsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function getTransactions() {
      try {
        setLoading(true);
        const res = await fetchAdminTransactions();
        if (res && res.success) {
          setTransactions(res.data || res.transactions || []);
        } else {
          setTransactions([]);
          setError('Failed to retrieve payment transactions.');
        }
      } catch (err: any) {
        console.error("Admin transactions fetch error:", err);
        setError(err.response?.data?.message || 'Server error while fetching payment logs.');
      } finally {
        setLoading(false);
      }
    }

    getTransactions();
  }, []);

  const filteredTransactions = transactions.filter((t) => 
    t.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-flyBlue">Payment Transactions</h1>
          <p className="text-sm text-gray-500">Track gateway logs, Paystack settlements, and financial references.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search Reference, Email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:border-flyBlue text-sm text-zinc-900 shadow-sm"
          />
        </div>
      </div>

      {loading && (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center space-y-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-flyOrange mx-auto"></div>
          <p className="text-gray-600 font-medium text-sm">Loading transaction logs...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center text-red-600 flex items-center justify-center gap-2">
          <AlertCircle size={20} />
          <p className="font-semibold text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && filteredTransactions.length === 0 && (
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center text-gray-500">
          <p className="text-base font-semibold">No payment transactions found.</p>
        </div>
      )}

      {!loading && filteredTransactions.length > 0 && (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-wider">
                  <th className="p-4">Reference ID</th>
                  <th className="p-4">Customer Email</th>
                  <th className="p-4">Gateway</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredTransactions.map((tx, idx) => (
                  <tr key={tx.id || idx} className="hover:bg-gray-50/50 transition">
                    <td className="p-4 font-bold text-flyBlue flex items-center gap-1.5">
                      <CreditCard size={15} className="text-gray-400" />
                      {tx.reference || tx.transaction_id || 'REF-N/A'}
                    </td>
                    <td className="p-4 text-gray-700">{tx.email || 'customer@domain.com'}</td>
                    <td className="p-4 font-medium text-gray-600">Paystack NGN</td>
                    <td className="p-4 font-extrabold text-gray-900">
                      ₦{typeof tx.amount === 'number' ? tx.amount.toLocaleString() : (tx.amount || '0')}
                    </td>
                    <td className="p-4">
                      <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                        Successful
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}