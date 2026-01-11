import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPortfolioHoldings } from "../api/portfolioApi";
import { fetchPrices } from "../api/priceApi";

/* 🔹 Asset → CoinGecko ID mapping */
const COIN_ID_MAP = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  ADA: "cardano",
  XRP: "ripple",
  BNB: "binancecoin",
};

/* 🔹 INR formatter */
const formatINR = (value) =>
  "₹" +
  Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });

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
      .then(setUser)
      .catch(() => {});
  }, []);

  /* 🔹 Fetch holdings + live prices */
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

    const coinId = COIN_ID_MAP[h.asset];
    const currentPrice = coinId ? prices[coinId]?.inr || 0 : 0;

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

  const totalInvested = totalValue - totalPL;

  return (
    <div className="text-white">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold">
            Welcome Back{user ? `, ${user.name}` : ""} ✨
          </h1>
          <p className="text-gray-300 mt-2">
            Here’s a live overview of your crypto portfolio.
          </p>
        </div>

        <div
          onClick={() => navigate("/settings")}
          className="
            w-12 h-12 flex items-center justify-center
            bg-gradient-to-tr from-purple-500 to-pink-500
            rounded-full cursor-pointer
            text-xl font-bold shadow-lg
          "
        >
          {user ? user.name.charAt(0).toUpperCase() : "?"}
        </div>
      </div>

      {/* 🔹 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 p-6 rounded-2xl">
          <p className="text-xs text-gray-400">Portfolio Value</p>
          <p className="text-3xl font-bold mt-3">
            {formatINR(totalValue)}
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl">
          <p className="text-xs text-gray-400">Total Invested</p>
          <p className="text-2xl font-semibold mt-3">
            {formatINR(totalInvested)}
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl">
          <p className="text-xs text-gray-400">Overall P / L</p>
          <p
            className={`text-2xl font-bold mt-3 ${
              totalPL >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {totalPL >= 0 ? "+" : "-"}
            {formatINR(Math.abs(totalPL))}
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl">
          <p className="text-xs text-gray-400">Best Performer</p>
          <p className="text-2xl font-bold mt-3">
            {bestAsset || "--"}
          </p>
          <p className="text-green-400">
            {bestAsset ? `+${bestAssetPct.toFixed(1)}%` : "--"}
          </p>
        </div>
      </div>

      {/* 🔹 Milestone-4 Starter: P&L Overview */}
      <div className="mt-10 bg-white/5 p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">
          P&L Overview (Unrealized)
        </h2>

        <div className="space-y-3">
          {holdings.slice(0, 3).map((h) => {
            const qty = h.quantity;
            const avg = h.avgBuyPrice;
            const price =
              prices[COIN_ID_MAP[h.asset]]?.inr || 0;

            const invested = qty * avg;
            const current = qty * price;
            const pnl = current - invested;

            return (
              <div
                key={h.asset}
                className="flex justify-between items-center
                           bg-black/20 rounded-lg px-4 py-3"
              >
                <span className="font-medium">{h.asset}</span>

                <span
                  className={
                    pnl >= 0 ? "text-green-400" : "text-red-400"
                  }
                >
                  {pnl >= 0 ? "+" : "-"}
                  {formatINR(Math.abs(pnl))}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-gray-400 mt-4">
          * Unrealized P/L based on latest CoinGecko prices
        </p>
      </div>

      {loading && (
        <p className="text-gray-400 mt-6">
          Loading dashboard data...
        </p>
      )}
    </div>
  );
}
