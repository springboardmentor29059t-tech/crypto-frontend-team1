import React, { useEffect, useState } from "react";
import axios from "axios";

const USD_TO_INR = 83;

const Coins = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 5,
          page: 1,
        },
      })
      .then((res) => setCoins(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]">
      <h1 className="text-3xl font-bold mb-8 text-cyan-400 drop-shadow-[0_0_12px_#22d3ee]">
        Live Crypto Prices
      </h1>

      <div className="overflow-hidden rounded-xl border border-cyan-500/30 shadow-[0_0_25px_rgba(34,211,238,0.25)]">
        <table className="w-full backdrop-blur-xl bg-white/5 text-gray-200">
          <thead className="bg-cyan-500/10">
            <tr>
              <th className="p-4 text-left text-cyan-300">Coin</th>
              <th className="p-4 text-center text-cyan-300">Price (USD)</th>
              <th className="p-4 text-center text-cyan-300">Price (INR)</th>
              <th className="p-4 text-center text-cyan-300">24H Change</th>
            </tr>
          </thead>

          <tbody>
            {coins.map((coin) => (
              <tr
                key={coin.id}
                className="border-t border-white/10 hover:bg-cyan-400/10 transition duration-300"
              >
                {/* Coin */}
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-7 h-7 drop-shadow-[0_0_8px_#22d3ee]"
                  />
                  <span className="font-medium">{coin.name}</span>
                </td>

                {/* USD Price */}
                <td className="p-4 text-center font-semibold">
                  ${coin.current_price.toLocaleString()}
                </td>

                {/* INR Price */}
                <td className="p-4 text-center font-semibold">
                  ₹
                  {(coin.current_price * USD_TO_INR).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </td>

                {}
                <td
                  className={`p-4 text-center font-semibold ${
                    coin.price_change_percentage_24h > 0
                      ? "text-green-400 drop-shadow-[0_0_6px_#22c55e]"
                      : "text-red-400 drop-shadow-[0_0_6px_#ef4444]"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coins;