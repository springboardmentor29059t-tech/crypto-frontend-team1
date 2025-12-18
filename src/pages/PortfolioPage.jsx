import { useEffect, useState } from "react";
import { fetchPortfolioHoldings } from "../api/portfolioApi";
import { fetchPrices } from "../api/priceApi";
import HoldingsTable from "../components/portfolio/HoldingsTable";

/* 🔹 INR formatter */
const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioHoldings()
      .then(async (data) => {
        setHoldings(data);
        const symbols = data.map((h) => h.asset);
        const priceData = await fetchPrices(symbols);
        setPrices(priceData);
      })
      .catch(() => console.log("Failed to load portfolio"))
      .finally(() => setLoading(false));
  }, []);

  const totalValue = holdings.reduce((sum, h) => {
    const id =
      h.asset === "BTC"
        ? "bitcoin"
        : h.asset === "ETH"
        ? "ethereum"
        : h.asset === "SOL"
        ? "solana"
        : h.asset === "MATIC"
        ? "polygon"
        : null;

    const price = id ? Number(prices?.[id]?.inr || 0) : 0;
    return sum + Number(h.quantity || 0) * price;
  }, 0);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Portfolio</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-xl">
          <p className="text-gray-400">Assets</p>
          <p className="text-2xl font-bold">{holdings.length}</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <p className="text-gray-400">Current Value</p>
          <p className="text-2xl font-bold">
            {formatINR(totalValue)}
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <p className="text-gray-400">Source</p>
          <p className="text-sm text-gray-300">
            CoinGecko (Live)
          </p>
        </div>
      </div>

      {loading ? (
        <p className="mt-6 text-gray-400">Loading portfolio…</p>
      ) : (
        <HoldingsTable holdings={holdings} prices={prices} />
      )}
    </>
  );
}
