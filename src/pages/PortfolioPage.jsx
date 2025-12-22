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
  }).format(value || 0);

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = await fetchPortfolioHoldings();
        setHoldings(data);

        const symbols = data.map((h) => h.asset);
        const priceData = await fetchPrices(symbols);
        setPrices(priceData);
      } catch (err) {
        console.log("Failed to load portfolio");
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  /* 🔹 Total Portfolio Value (INR) */
  const totalValue = holdings.reduce((sum, h) => {
    const price = Number(prices[h.asset] || 0);
    return sum + Number(h.quantity || 0) * price;
  }, 0);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Portfolio</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-xl">
          <p className="text-gray-400">Assets</p>
          <p className="text-2xl font-bold">{holdings.length}</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <p className="text-gray-400">Current Value</p>
          <p className="text-2xl font-bold">{formatINR(totalValue)}</p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <p className="text-gray-400">Price Source</p>
          <p className="text-sm text-gray-300">
            Backend Snapshots (INR)
          </p>
        </div>
      </div>

      {/* Holdings Table */}
      {loading ? (
        <p className="mt-6 text-gray-400">Loading portfolio…</p>
      ) : (
        <HoldingsTable holdings={holdings} prices={prices} />
      )}
    </>
  );
}
