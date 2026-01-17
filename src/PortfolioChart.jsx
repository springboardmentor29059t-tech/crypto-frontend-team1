import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function PortfolioChart({ assetId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (assetId) fetchHistory();
  }, [assetId]);

  const fetchHistory = async () => {
    try {
      // Fetch 30-day history for the given coin (e.g., "bitcoin")
      const res = await fetch(`http://localhost:8080/api/markets/history/${assetId}`);
      const json = await res.json();
      
      // Transform CoinGecko format [[timestamp, price], ...] into our graph format
      if (json.prices) {
        const formattedData = json.prices.map(item => ({
          date: new Date(item[0]).toLocaleDateString().slice(0, 5), // "Jan 1"
          price: item[1]
        }));
        setData(formattedData);
      }
    } catch (err) {
      console.error("Graph error:", err);
    }
  };

  if (!data.length) return <div className="h-64 flex items-center justify-center text-slate-500">Loading Chart...</div>;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
      <h3 className="text-slate-400 text-sm font-medium mb-4">Performance (Last 30 Days)</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis domain={['auto', 'auto']} hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
              itemStyle={{ color: '#60a5fa' }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}