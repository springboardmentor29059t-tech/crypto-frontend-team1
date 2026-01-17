import React, { useState } from 'react';

export default function TransactionsView() {
  // 1. REALISTIC DUMMY DATA
  const [transactions] = useState([
    { id: 101, type: 'BUY', asset: 'Bitcoin', symbol: 'BTC', amount: 0.05, price: 42000, date: '2025-12-20', status: 'Completed' },
    { id: 102, type: 'SELL', asset: 'Ethereum', symbol: 'ETH', amount: 1.2, price: 2800, date: '2025-12-18', status: 'Completed' },
    { id: 103, type: 'BUY', asset: 'Solana', symbol: 'SOL', amount: 15.0, price: 145, date: '2025-12-15', status: 'Pending' },
    { id: 104, type: 'BUY', asset: 'Polkadot', symbol: 'DOT', amount: 100, price: 7.5, date: '2025-12-10', status: 'Completed' },
    { id: 105, type: 'SELL', asset: 'Bitcoin', symbol: 'BTC', amount: 0.01, price: 45000, date: '2025-12-05', status: 'Failed' },
  ]);

  // Helper for Status Colors
  const getStatusColor = (status) => {
    if (status === 'Completed') return 'bg-green-500/10 text-green-400 border-green-500/50';
    if (status === 'Pending') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/50';
    return 'bg-red-500/10 text-red-400 border-red-500/50';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Transaction History</h2>
          <p className="text-slate-400 text-sm">Monitor your deposits, withdrawals, and trades.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-700 transition text-sm">
            Export CSV
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold shadow-lg shadow-blue-900/20 transition">
            + New Transaction
          </button>
        </div>
      </div>

      {/* IMPACTFUL SUMMARY CARDS (Dummy Stats) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Total Volume</p>
          <p className="text-2xl font-bold text-white mt-1">$124,500.00</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Total Trades</p>
          <p className="text-2xl font-bold text-white mt-1">1,248</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Best Win</p>
          <p className="text-2xl font-bold text-green-400 mt-1">+ $12,400</p>
          <p className="text-xs text-slate-500">BTC / USD</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Avg. Profit</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">18.5%</p>
        </div>
      </div>

      {/* PROFESSIONAL TABLE */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
        {/* Table Filters (Visual Only) */}
        <div className="p-4 border-b border-slate-700 flex gap-3">
          <input type="text" placeholder="Search coin..." className="bg-slate-900 border border-slate-700 text-sm text-white px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500" />
          <select className="bg-slate-900 border border-slate-700 text-sm text-slate-300 px-4 py-2 rounded-lg focus:outline-none">
            <option>All Types</option>
            <option>Buy</option>
            <option>Sell</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Total Value</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 text-gray-300">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-700/30 transition-colors cursor-pointer">
                  {/* TYPE ICON */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 font-bold text-xs px-2 py-1 rounded border ${tx.type === 'BUY' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      {tx.type === 'BUY' ? '↓ BUY' : '↑ SELL'}
                    </span>
                  </td>

                  {/* ASSET */}
                  <td className="px-6 py-4 font-medium text-white">
                    {tx.asset} <span className="text-slate-500 text-xs ml-1">({tx.symbol})</span>
                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 py-4 font-mono">{tx.amount} {tx.symbol}</td>

                  {/* PRICE */}
                  <td className="px-6 py-4 text-slate-400">${tx.price.toLocaleString()}</td>

                  {/* TOTAL VALUE */}
                  <td className="px-6 py-4 font-bold text-white">
                    ${(tx.amount * tx.price).toLocaleString()}
                  </td>

                  {/* DATE */}
                  <td className="px-6 py-4 text-sm text-slate-400">{tx.date}</td>

                  {/* STATUS BADGE */}
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-700 flex justify-between items-center text-xs text-slate-500">
          <p>Showing 5 of 128 transactions</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-slate-700 rounded hover:bg-slate-600 text-white">Previous</button>
            <button className="px-3 py-1 bg-slate-700 rounded hover:bg-slate-600 text-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}