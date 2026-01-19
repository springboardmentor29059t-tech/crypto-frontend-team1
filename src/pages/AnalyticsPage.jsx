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

  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [history, setHistory] = useState([]);
  const [showPnL, setShowPnL] = useState(false);

  /* ================= Fetch Portfolio & Prices ================= */
  useEffect(() => {
    fetchPortfolioHoldings()
      .then(async (data) => {
        setHoldings(data);
        const symbols = data.map((h) => h.asset);
        const priceData = await fetchPrices(symbols);
        setPrices(priceData);
      });
  }, []);

  /* ================= Asset → CoinGecko ID ================= */
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

  /* ================= Fetch Price History ================= */
  useEffect(() => {
    if (!selectedAsset) return;
    fetchPriceHistory(selectedAsset)
      .then(setHistory)
      .catch(() => setHistory([]));
  }, [selectedAsset]);

  /* ================= Calculations ================= */
  const chartData = holdings
    .filter((h) => h.quantity > 0)
    .map((h) => {
      const price = prices?.[getPriceId(h.asset)]?.inr || 0;
      return { name: h.asset, value: h.quantity * price };
    });

  const totalValue = chartData.reduce((s, d) => s + d.value, 0);

  const totalInvested = holdings.reduce(
    (s, h) => s + h.quantity * h.avgBuyPrice,
    0
  );

  const currentValue = holdings.reduce((s, h) => {
    const price = prices?.[getPriceId(h.asset)]?.inr || 0;
    return s + h.quantity * price;
  }, 0);

  const netPnl = currentValue - totalInvested;
  const pnlPct = totalInvested ? (netPnl / totalInvested) * 100 : 0;

  const topAsset =
    chartData.length > 0
      ? chartData.reduce((a, b) => (b.value > a.value ? b : a)).name
      : "--";

  /* ================= CSV Export ================= */
  const exportCSV = () => {
    const rows = holdings.map((h) => {
      const price = prices?.[getPriceId(h.asset)]?.inr || 0;
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

    const csv =
      Object.keys(rows[0]).join(",") +
      "\n" +
      rows.map((r) => Object.values(r).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio_analytics.csv";
    a.click();
  };

  /* ================= UI ================= */
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={exportCSV}
          className="bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded-lg font-semibold"
        >
          Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card>
          <p className="text-gray-400 text-sm">Total Assets</p>
          <p className="text-2xl font-bold">{holdings.length}</p>
        </Card>
        <Card>
          <p className="text-gray-400 text-sm">Portfolio Value</p>
          <p className="text-2xl font-bold">₹{totalValue.toLocaleString()}</p>
        </Card>
        <Card>
          <p className="text-gray-400 text-sm">Top Asset</p>
          <p className="text-2xl font-bold">{topAsset}</p>
        </Card>
      </div>

      {/* 🔹 Check Profit & Loss Button */}
      <div className="flex justify-center my-8">
        <button
          onClick={() => setShowPnL(!showPnL)}
          className="bg-purple-600 hover:bg-purple-700 px-8 py-2 rounded-lg font-semibold transition"
        >
          {showPnL ? "Hide Profit & Loss" : "Check Profit & Loss"}
        </button>
      </div>

      {/* 🔹 Profit & Loss Section */}
      {showPnL && (
        <div className="grid grid-cols-3 gap-6 mb-10">
          <Card>
            <p className="text-gray-400 text-sm">Total Invested</p>
            <p className="text-2xl font-bold">₹{totalInvested.toFixed(2)}</p>
          </Card>

          <Card>
            <p className="text-gray-400 text-sm">Current Value</p>
            <p className="text-2xl font-bold">₹{currentValue.toFixed(2)}</p>
          </Card>

          <Card>
            <p className="text-gray-400 text-sm">Net Profit / Loss</p>
            <p
              className={
                "text-2xl font-bold " +
                (netPnl >= 0 ? "text-emerald-400" : "text-red-400")
              }
            >
              {netPnl >= 0 ? "+" : ""}
              ₹{netPnl.toFixed(2)} ({pnlPct.toFixed(2)}%)
            </p>
          </Card>
        </div>
      )}

      {/* Pie + Breakdown */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Asset Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={chartData} dataKey="value" innerRadius={60} outerRadius={90}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Asset Breakdown</h2>
          <table className="w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="text-left">Asset</th>
                <th className="text-right">Value</th>
                <th className="text-right">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((d) => (
                <tr key={d.name}>
                  <td>{d.name}</td>
                  <td className="text-right">₹{d.value.toLocaleString()}</td>
                  <td className="text-right">
                    {((d.value / totalValue) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Line Chart */}
      <div className="mt-10">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Price Trend</h2>
          <select
            value={selectedAsset}
            onChange={(e) => setSelectedAsset(e.target.value)}
            className="mb-4 px-4 py-2 bg-purple-600 rounded-lg"
          >
            {chartData.map((d) => (
              <option key={d.name}>{d.name}</option>
            ))}
          </select>

          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={history}>
                <XAxis dataKey="capturedAt" />
                <YAxis />
                <Tooltip />
                <Line dataKey="priceInr" stroke="#a855f7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* ================= Milestone 4 – Reports & Tax Readiness ================= */}
      <div className="mt-16 space-y-8">
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold mb-2">P&L Insights</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your portfolio is currently{" "}
              <span className={netPnl >= 0 ? "text-emerald-400" : "text-red-400"}>
                {netPnl >= 0 ? "in profit" : "in loss"}
              </span>
              . The net unrealized change is ₹{netPnl.toFixed(2)} (
              {pnlPct.toFixed(2)}%).
            </p>
          </Card>

          <Card>
            <h3 className="font-semibold mb-2">Tax Hints</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Unrealized gains are not taxable</li>
              <li>• Tax applies only after SELL transactions</li>
              <li>• CSV export can be used for tax filing</li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-semibold mb-2">Report Readiness</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Portfolio analytics, P&L summaries, historical pricing and
              exportable CSV reports are ready for auditing and reporting.
            </p>
          </Card>
        </div>

        <Card>
          <p className="text-xs text-gray-400 text-center">
            * All calculations are based on latest market prices and user
            transaction history. This dashboard is designed for analysis and
            reporting purposes.
          </p>
        </Card>
      </div>
    </>
  );
}
