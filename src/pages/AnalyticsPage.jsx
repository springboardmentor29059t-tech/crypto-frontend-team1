import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { fetchPortfolioHoldings } from "../api/portfolioApi";
import { fetchPrices } from "../api/priceApi";
import Card from "../components/Card";

const COLORS = ["#a855f7", "#22c55e", "#f97316", "#38bdf8"];

export default function AnalyticsPage() {
  const [holdings, setHoldings] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPnL, setShowPnL] = useState(false);

  useEffect(() => {
    fetchPortfolioHoldings()
      .then(async (data) => {
        setHoldings(data);

        const symbols = data.map((h) => h.asset);
        const priceData = await fetchPrices(symbols);
        setPrices(priceData);
      })
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Map asset → coingecko id
  const getPriceId = (asset) => {
    switch (asset) {
      case "BTC":
        return "bitcoin";
      case "ETH":
        return "ethereum";
      case "SOL":
        return "solana";
      case "ADA":
        return "cardano";
      default:
        return null;
    }
  };

  // 🔹 Chart data
  const chartData = holdings.map((h) => {
    const id = getPriceId(h.asset);
    const price = id ? prices?.[id]?.inr || 0 : 0;

    return {
      name: h.asset,
      value: Number(h.quantity) * price,
    };
  });

  const totalValue = chartData.reduce((s, d) => s + d.value, 0);

  const topAsset =
    chartData.length > 0
      ? chartData.reduce((a, b) => (b.value > a.value ? b : a))
      : null;

  // 🔹 Profit & Loss calculations
  const totalInvested = holdings.reduce(
    (sum, h) => sum + Number(h.quantity) * Number(h.avgBuyPrice || 0),
    0
  );

  const currentValue = holdings.reduce((sum, h) => {
    const id = getPriceId(h.asset);
    const price = id ? prices?.[id]?.inr || 0 : 0;
    return sum + Number(h.quantity) * price;
  }, 0);

  const netPnl = currentValue - totalInvested;
  const pnlPct =
    totalInvested === 0 ? 0 : (netPnl / totalInvested) * 100;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>

      {/* 🔹 Overview Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>
          <p className="text-gray-400 text-sm">Total Assets</p>
          <p className="text-2xl font-bold">{holdings.length}</p>
        </Card>

        <Card>
          <p className="text-gray-400 text-sm">Portfolio Value</p>
          <p className="text-2xl font-bold">
            ₹{totalValue.toLocaleString()}
          </p>
        </Card>

        <Card>
          <p className="text-gray-400 text-sm">Top Asset</p>
          <p className="text-2xl font-bold">
            {topAsset ? topAsset.name : "--"}
          </p>
        </Card>
      </div>

      {/* 🔹 Profit & Loss Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowPnL(!showPnL)}
          className="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold"
        >
          {showPnL ? "Hide Profit & Loss" : "Check Profit & Loss"}
        </button>
      </div>

      {/* 🔹 Profit & Loss Section */}
      {showPnL && (
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card>
            <p className="text-gray-400 text-sm">Total Invested</p>
            <p className="text-2xl font-bold">
              ₹{totalInvested.toFixed(2)}
            </p>
          </Card>

          <Card>
            <p className="text-gray-400 text-sm">Current Value</p>
            <p className="text-2xl font-bold">
              ₹{currentValue.toFixed(2)}
            </p>
          </Card>

          <Card>
            <p className="text-gray-400 text-sm">Net Profit / Loss</p>
            <p
              className={
                "text-2xl font-bold " +
                (netPnl >= 0
                  ? "text-emerald-400"
                  : "text-red-400")
              }
            >
              {netPnl >= 0 ? "+" : ""}
              ₹{netPnl.toFixed(2)} ({pnlPct.toFixed(2)}%)
            </p>
          </Card>
        </div>
      )}

      {/* 🔹 Chart + Breakdown */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">
            Asset Distribution
          </h2>

          {loading ? (
            <p className="text-gray-400">Loading chart...</p>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        {/* Breakdown Table */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">
            Asset Breakdown
          </h2>

          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-white/10">
              <tr>
                <th className="py-2 text-left">Asset</th>
                <th className="text-right">Value</th>
                <th className="text-right">Allocation</th>
              </tr>
            </thead>

            <tbody>
              {chartData.map((d) => {
                const percent =
                  totalValue === 0
                    ? 0
                    : (d.value / totalValue) * 100;

                return (
                  <tr
                    key={d.name}
                    className="border-b border-white/5"
                  >
                    <td className="py-2 font-medium">{d.name}</td>
                    <td className="text-right">
                      ₹{d.value.toLocaleString()}
                    </td>
                    <td className="text-right">
                      {percent.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}
