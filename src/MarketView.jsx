import React, { useEffect, useState } from 'react';

export default function MarketView() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/markets');
      const data = await res.json();
      setCoins(data);
    } catch (err) {
      console.error("Error fetching markets:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading Live Prices...</div>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white">Live Markets</h2>
          <p className="text-slate-400">Top 50 Cryptocurrencies by Market Cap</p>
        </div>
        <button 
          onClick={fetchMarkets} 
          className="bg-slate-800 hover:bg-slate-700 text-sm text-white px-4 py-2 rounded-lg border border-slate-700 transition"
        >
          ↻ Refresh
        </button>
      </div>

      {/* MARKET TABLE */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">24h Change</th>
                <th className="px-6 py-4">Market Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 text-gray-300">
              {coins.map((coin) => (
                <tr key={coin.id} className="hover:bg-slate-700/50 transition-colors">
                  
                  {/* COIN NAME & IMAGE */}
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-bold text-white">{coin.name}</p>
                      <p className="text-xs text-slate-400 uppercase">{coin.symbol}</p>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="px-6 py-4 font-mono font-medium text-white">
                    ${coin.current_price?.toLocaleString()}
                  </td>

                  {/* 24H CHANGE (Green/Red Logic) */}
                  <td className={`px-6 py-4 font-medium ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.price_change_percentage_24h >= 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </td>

                  {/* MARKET CAP */}
                  <td className="px-6 py-4 text-slate-400">
                    ${coin.market_cap?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}