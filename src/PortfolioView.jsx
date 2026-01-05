import React, { useEffect, useState } from 'react';

export default function PortfolioView({ userId, setActivePage }) {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  // 1. Fetch data from Database on load
  useEffect(() => {
    fetchPortfolio();
  }, [userId]);

  const fetchPortfolio = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/portfolio/${userId}`);
      const data = await res.json();
      setHoldings(data);
      calculateTotal(data);
    } catch (err) {
      console.error("Failed to load portfolio", err);
    }
  };

  // 2. Sync with Binance (The Magic Button)
  const handleRefresh = async () => {
    setLoading(true);
    try {
      await fetch(`http://localhost:8080/api/portfolio/refresh/${userId}`, { method: 'POST' });
      await fetchPortfolio(); // Reload data after refresh
    } catch (err) {
      alert("Sync failed. Did you link an exchange?");
    }
    setLoading(false);
  };

  // Simple estimation (We will get REAL live prices in Milestone 3)
  const calculateTotal = (data) => {
    let total = 0;
    data.forEach(coin => {
      // Temporary static prices for demo
      const price = coin.assetSymbol === 'BTC' ? 95000 : coin.assetSymbol === 'ETH' ? 2800 : 1; 
      total += (coin.quantity * price);
    });
    setTotalValue(total);
  };

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl p-8 shadow-lg text-white flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-blue-100 opacity-90">Your financial overview is ready.</p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={loading}
          className={`bg-white text-blue-900 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? 'Syncing...' : '↻ Sync Binance'}
        </button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Total Net Worth</h3>
          <div className="text-3xl font-bold text-white">
            ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
        </div>
        
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
           <h3 className="text-slate-400 text-sm font-medium mb-1">Assets Tracked</h3>
           <div className="text-3xl font-bold text-accent">{holdings.length}</div>
        </div>
      </div>

      {/* ASSETS TABLE */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white">Your Assets</h3>
        </div>
        
        {holdings.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No assets found. Click "Sync Binance" to fetch data.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4">Balance</th>
                <th className="px-6 py-4">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 text-gray-300">
              {holdings.map((h) => (
                <tr key={h.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4 font-bold text-white">{h.assetSymbol}</td>
                  <td className="px-6 py-4">{h.quantity}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs border border-blue-500/20">
                      {h.exchange?.name || 'Exchange'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}