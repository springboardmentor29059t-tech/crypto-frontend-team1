import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

import { fetchPortfolioHoldings } from "../api/portfolioApi";
import { fetchPrices } from "../api/priceApi";
import { fetchPriceHistory } from "../api/pricingApi";
import Card from "../components/Card";

const COLORS = ["#a855f7", "#22c55e", "#f97316", "#38bdf8"];

export default function AnalyticsPage() {
  const [holdings, setHoldings] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [showPnL, setShowPnL] = useState(false);

  // 🔹 NEW
  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [history, setHistory] = useState([]);

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

  // 🔹 Asset → CoinGecko ID (UNCHANGED)
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
      case "BNB":
        return "binancecoin";
      default:
        return null;
    }
  };

  // 🔹 NEW: Fetch price history
  useEffect(() => {
  if (!selectedAsset) {
    setHistory([]);
    return;
  }

  fetchPriceHistory(selectedAsset)   // ✅ BTC / ETH
    .then(setHistory)
    .catch(() => setHistory([]));
}, [selectedAsset]);


  // 🔹 Chart data (UNCHANGED)
  const chartData = holdings
    .filter((h) => Number(h.quantity) > 0)
    .map((h) => {
      const id = getPriceId(h.asset);
      const rawPrice = prices?.[id]?.inr;
      const price = typeof rawPrice === "number" ? rawPrice : 0;

      return {
        name: h.asset,
        value: Number(h.quantity || 0) * price,
      };
    })
    .filter((d) => d.value > 0);

  const totalValue = chartData.reduce((sum, d) => sum + d.value, 0);

  const topAsset =
    chartData.length > 0
      ? chartData.reduce((a, b) => (b.value > a.value ? b : a))
      : null;

  // 🔹 Profit & Loss calculations (UNCHANGED)
  const totalInvested = holdings
    .filter((h) => Number(h.quantity) > 0)
    .reduce((sum, h) => {
      const qty = Number(h.quantity || 0);
      const avg = Number(h.avgBuyPrice || 0);
      return sum + qty * avg;
    }, 0);

  const currentValue = holdings
    .filter((h) => Number(h.quantity) > 0)
    .reduce((sum, h) => {
      const id = getPriceId(h.asset);
      const price =
        typeof prices?.[id]?.inr === "number" ? prices[id].inr : 0;

      return sum + Number(h.quantity) * price;
    }, 0);

  const netPnl = currentValue - totalInvested;
  const pnlPct =
    totalInvested === 0 ? 0 : (netPnl / totalInvested) * 100;

  // 🔹 NEW: Export CSV
  const exportCSV = () => {
    if (!holdings.length) return;

    const rows = holdings.map((h) => {
      const id = getPriceId(h.asset);
      const price = prices?.[id]?.inr || 0;

      return {
        Asset: h.asset,
        Quantity: h.quantity,
        AvgBuyPrice: h.avgBuyPrice,
        CurrentPrice: price,
        Invested: h.quantity * h.avgBuyPrice,
        CurrentValue: h.quantity * price,
        PnL: h.quantity * price - h.quantity * h.avgBuyPrice,
      };
    });

    const headers = Object.keys(rows[0]).join(",");
    const data = rows.map((r) => Object.values(r).join(","));
    const csv = [headers, ...data].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio_analytics.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>

      {/* 🔹 Export CSV Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={exportCSV}
          className="bg-emerald-600 hover:bg-emerald-700
                     px-5 py-2 rounded-lg font-semibold"
        >
          Export CSV
        </button>
      </div>

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
          disabled={loading}
          onClick={() => setShowPnL(!showPnL)}
          className={`px-6 py-2 rounded-lg font-semibold transition
            ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }
          `}
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

      {/* 🔹 Pie Chart + Breakdown */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">
            Asset Distribution
          </h2>

          {loading ? (
            <p className="text-gray-400">Loading chart...</p>
          ) : chartData.length === 0 ? (
            <p className="text-gray-400 text-center">
              No data available
            </p>
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

      {/* 🔹 NEW: Line Chart */}
      <div className="mt-10">
        <Card>
          <h2 className="text-lg font-semibold mb-4">
            Price Trend
          </h2>
<select
  value={selectedAsset}
  onChange={(e) => setSelectedAsset(e.target.value)}
  className="
    mb-4
    px-4 py-2
    rounded-lg
    bg-purple-600
    text-white
    font-semibold
    cursor-pointer
    focus:outline-none
    focus:ring-2 focus:ring-purple-400
    appearance-none
  "
>

            {chartData.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          {history.length === 0 ? (
            <p className="text-gray-400">No historical data</p>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                  <XAxis
                    dataKey="capturedAt"
                    tickFormatter={(v) =>
                      new Date(v).toLocaleDateString()
                    }
                  />
                  <YAxis />
                  <Tooltip />
                  <Line
                    dataKey="priceInr"
                    stroke="#a855f7"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
