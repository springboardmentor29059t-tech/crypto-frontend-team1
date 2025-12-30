import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchPortfolioHoldings } from "../api/portfolioApi";
import { fetchPrices } from "../api/priceApi";

const COIN_ID_MAP = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  ADA: "cardano",
  XRP: "ripple",
  BNB: "binancecoin",
};

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/user/me", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then(setUser)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const loadDashboard = async () => {
      const data = await fetchPortfolioHoldings();
      setHoldings(data);

      const symbols = data.map((h) => h.asset);
      const priceData = await fetchPrices(symbols);
      setPrices(priceData);

      setLoading(false);
    };

    loadDashboard();
  }, []);

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

  return (
    <div className="text-white">
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
          className="w-12 h-12 flex items-center justify-center bg-purple-600 rounded-full cursor-pointer text-xl font-bold"
        >
          {user ? user.name.charAt(0).toUpperCase() : "?"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-2xl">
          <p className="text-xs text-gray-400">Portfolio Value</p>
          <p className="text-3xl font-bold mt-3">
            ₹{totalValue.toLocaleString()}
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl">
          <p className="text-xs text-gray-400">Best Performer</p>
          <p className="text-3xl font-bold mt-3">{bestAsset || "--"}</p>
          <p className="text-green-400">
            {bestAsset ? `+${bestAssetPct.toFixed(1)}%` : "--"}
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl">
          <p className="text-xs text-gray-400">Overall P/L</p>
          <p
            className={`text-3xl font-bold ${
              totalPL >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {totalPL >= 0 ? "+" : "-"}₹{Math.abs(totalPL).toLocaleString()}
          </p>
        </div>
      </div>

      {loading && (
        <p className="text-gray-400 mt-6">Loading dashboard...</p>
      )}
    </div>
  );
}
