import { useEffect, useState } from "react";
import { fetchLatestPrices } from "../api/pricingApi";

export default function PricingPage() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestPrices()
      .then(setPrices)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400">Loading prices...</p>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Market Prices (INR)</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {prices.map((p) => (
          <div key={p.assetSymbol} className="bg-white/5 p-6 rounded-xl">
            <p className="text-gray-400">{p.assetSymbol}</p>
            <p className="text-2xl font-bold">₹{p.priceInr}</p>
            <p className="text-xs text-gray-400">
              Source: {p.source}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
