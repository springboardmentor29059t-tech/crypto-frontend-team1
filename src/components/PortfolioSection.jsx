import React from "react";

export default function PortfolioSection({ holdings = [], loading }) {
  const totalValue = holdings.reduce(
    (sum, c) => sum + c.quantity * c.currentPrice,
    0
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-2xl shadow-[0_0_25px_rgba(15,23,42,0.9)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Your Crypto Assets</h2>
          <p className="text-xs text-gray-400 mt-1">
            {loading
              ? "Fetching portfolio from exchange..."
              : "Synced from connected exchange"}
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-200">
          Total ≈ ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
            {!loading && holdings.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No assets found. Connect an exchange to begin.
                </td>
              </tr>
            )}

            {holdings.map((coin) => {
              const value = coin.quantity * coin.currentPrice;
              const isUp = coin.change24h >= 0;

              return (
                <tr
                  key={coin.symbol}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="py-2">
                    <span className="font-semibold">{coin.symbol}</span>{" "}
                    <span className="text-gray-400 text-xs ml-1">
                      {coin.name}
                    </span>
                  </td>

                  <td className="py-2">{coin.quantity}</td>

                  <td className="py-2">
                    ${coin.currentPrice.toLocaleString()}
                  </td>

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
                    ${value.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {loading && (
          <p className="text-center text-gray-400 py-6">
            Loading assets...
          </p>
        )}
      </div>
    </div>
  );
}
