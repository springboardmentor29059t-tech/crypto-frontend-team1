import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchPortfolioHoldings } from "../api/portfolioApi";
import { fetchPrices } from "../api/priceApi";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* 🔹 Fetch logged-in user */
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/user/me", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => console.log("User fetch error"));
  }, []);

  /* 🔹 Fetch portfolio + prices */
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await fetchPortfolioHoldings();
        setHoldings(data);

        const symbols = data.map((h) => h.asset);
        const priceData = await fetchPrices(symbols);
        setPrices(priceData);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  /* 🔹 Calculations */
  let totalValue = 0;
  let totalPL = 0;
  let bestAsset = null;
  let bestAssetPct = -Infinity;

  holdings.forEach((h) => {
    const qty = Number(h.quantity || 0);
    const avgBuy = Number(h.avgBuyPrice || 0);
    const currentPrice = Number(prices[h.asset] || 0);

    const invested = qty * avgBuy;
    const current = qty * currentPrice;
    const pnl = current - invested;

    totalValue += current;
    totalPL += pnl;

    const pct = invested === 0 ? 0 : (pnl / invested) * 100;
    if (pct > bestAssetPct) {
      bestAssetPct = pct;
      bestAsset = h.asset;
    }
  });

  return (
    <div className="text-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold">
            Welcome Back{user ? `, ${user.name}` : ""} ✨
          </h1>
          <p className="text-gray-300 mt-2">
            Here’s a live overview of your crypto portfolio.
          </p>
        </div>

        {/* Profile Icon */}
        <div
          onClick={() => navigate("/settings")}
          className="
            w-12 h-12 flex items-center justify-center
            bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-400
            rounded-full cursor-pointer
            shadow-[0_0_25px_rgba(168,85,247,0.6)]
            text-xl font-bold hover:scale-105 transition
          "
        >
          {user ? user.name.charAt(0).toUpperCase() : "?"}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Portfolio Value */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Portfolio Value
          </p>
          <div className="text-3xl font-bold mt-3">
            ₹{totalValue.toLocaleString()}
          </div>
          <p className="text-sm text-gray-300 mt-2">
            Across {holdings.length} assets
          </p>
        </div>

        {/* Best Performer */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Best Performer
          </p>
          <div className="text-3xl font-bold mt-3">
            {bestAsset || "--"}
          </div>
          <div className="text-green-400 mt-2">
            {bestAsset ? `+${bestAssetPct.toFixed(1)}%` : "--"}
          </div>
        </div>

        {/* Total P/L */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Overall P / L
          </p>
          <div
            className={
              "text-3xl font-bold mt-3 " +
              (totalPL >= 0 ? "text-green-400" : "text-red-400")
            }
          >
            {totalPL >= 0 ? "+" : "-"}₹
            {Math.abs(totalPL).toLocaleString()}
          </div>
          <p className="text-gray-300 mt-2">
            Based on avg buy vs current price
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-10 backdrop-blur-xl">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Quick Actions 🚀
        </h2>

        <div className="flex gap-4 flex-wrap">
          <Link
            to="/add-key"
            className="px-6 py-3 rounded-xl font-semibold
              bg-gradient-to-r from-purple-600 to-pink-500
              text-white shadow-lg hover:scale-105 transition"
          >
            Add API Key
          </Link>

          <Link
            to="/keys"
            className="px-6 py-3 rounded-xl font-semibold
              bg-gradient-to-r from-blue-500 to-purple-500
              text-white shadow-lg hover:scale-105 transition"
          >
            View API Keys
          </Link>
        </div>
      </div>

      {loading && (
        <p className="text-gray-400 mt-6">Loading dashboard data...</p>
      )}
    </div>
  );
}
