import React from "react";

const MOCK_PORTFOLIO = [
  { symbol: "BTC", name: "Bitcoin",   holdings: 0.05, price: 68000, change24h: 2.3 },
  { symbol: "ETH", name: "Ethereum",  holdings: 0.8,  price: 3500,  change24h: 4.1 },
  { symbol: "SOL", name: "Solana",    holdings: 10,   price: 180,   change24h: -1.2 },
  { symbol: "MATIC", name: "Polygon", holdings: 150,  price: 0.95,  change24h: 0.8 },
];

export default function PortfolioSection() {
  const totalValue = MOCK_PORTFOLIO.reduce(
    (sum, c) => sum + c.holdings * c.price,
    0
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-2xl shadow-[0_0_25px_rgba(15,23,42,0.9)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Your Crypto Assets</h2>
          <p className="text-xs text-gray-400 mt-1">
            Demo data – later we’ll replace this with real API.
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-200">
          Total ≈ ${totalValue.toLocaleString()}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase text-gray-400 border-b border-white/10">
            <tr>
              <th className="py-2">Coin</th>
              <th className="py-2">Holdings</th>
              <th className="py-2">Price</th>
              <th className="py-2">24h</th>
              <th className="py-2 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_PORTFOLIO.map((coin) => {
              const value = coin.holdings * coin.price;
              const isUp = coin.change24h >= 0;
              return (
                <tr key={coin.symbol} className="border-b border-white/5 last:border-0">
                  <td className="py-2">
                    <span className="font-semibold">{coin.symbol}</span>{" "}
                    <span className="text-gray-400 text-xs ml-1">
                      {coin.name}
                    </span>
                  </td>
                  <td className="py-2">{coin.holdings}</td>
                  <td className="py-2">${coin.price.toLocaleString()}</td>
                  <td className="py-2">
                    <span
                      className={
                        "text-xs font-medium " +
                        (isUp ? "text-emerald-400" : "text-red-400")
                      }
                    >
                      {isUp ? "▲ " : "▼ "}
                      {coin.change24h}%
                    </span>
                  </td>
                  <td className="py-2 text-right">
                    ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
