import React, { useEffect, useState } from 'react';
import PortfolioChart from './PortfolioChart';

export default function PortfolioView({ userId, setActivePage }) {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [marketData, setMarketData] = useState({}); // Stores live prices

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      // 1. Fetch User's Holdings
      const portfolioRes = await fetch(`http://localhost:8080/api/portfolio/${userId}`);
      const portfolioData = await portfolioRes.json();

      // 2. Fetch Live Market Prices
      const marketRes = await fetch('http://localhost:8080/api/markets');
      const marketList = await marketRes.json();

      // 3. Convert Market List to a Map for easy lookup (Symbol -> Price)
      // Example: { "btc": 98000.50, "eth": 2750.20 }
      const priceMap = {};
      marketList.forEach(coin => {
        priceMap[coin.symbol.toLowerCase()] = coin.current_price;
      });
      setMarketData(priceMap);

      setHoldings(portfolioData);
      calculateTotal(portfolioData, priceMap);

    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await fetch(`http://localhost:8080/api/portfolio/refresh/${userId}`, { method: 'POST' });
      await fetchData(); // Reload everything
    } catch (err) {
      alert("Sync failed. Check backend.");
    }
    setLoading(false);
  };

  // REAL CALCULATION LOGIC
  const calculateTotal = (holdingsData, prices) => {
    let total = 0;
    holdingsData.forEach(h => {
      // Find price using the symbol (e.g., "btc")
      // If price not found, default to 0 to prevent crash
      const livePrice = prices[h.assetSymbol.toLowerCase()] || 0;
      total += (h.quantity * livePrice);
    });
    setTotalValue(total);
  };

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl p-8 shadow-lg text-white flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-blue-100 opacity-90">Real-time valuation active.</p>
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

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* ... (existing boxes) ... */}
      </div>

      {/* --- NEW CHART SECTION --- */}
      {/* We pass "bitcoin" to show the trend of the market leader */}
      <PortfolioChart assetId="bitcoin" />
      {/* ------------------------- */}

      {/* ASSETS TABLE */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden"></div>

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
                <th className="px-6 py-4">Live Price</th>
                <th className="px-6 py-4">Value (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 text-gray-300">
              {holdings.map((h) => {
                const livePrice = marketData[h.assetSymbol.toLowerCase()] || 0;
                const value = h.quantity * livePrice;

                return (
                  <tr key={h.id} className="hover:bg-slate-700/50">
                    <td className="px-6 py-4 font-bold text-white">{h.assetSymbol}</td>
                    <td className="px-6 py-4">{h.quantity}</td>
                    <td className="px-6 py-4 text-slate-400">
                      ${livePrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-green-400">
                      ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}