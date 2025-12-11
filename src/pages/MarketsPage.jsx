import React, { useEffect, useState } from "react";
import {
  addToWatchlist,
  removeFromWatchlist,
  isInWatchlist,
} from "../utils/watchlist";

export default function MarketsPage() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc"
    )
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch(() => console.log("API Error"));
  }, []);

  const toggleWatchlist = (coin) => {
    if (isInWatchlist(coin.id)) {
      removeFromWatchlist(coin.id);
    } else {
      addToWatchlist({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image,
        price: coin.current_price,
      });
    }
    setCoins([...coins]); // re-render UI
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Markets</h1>

      <div className="card p-6 overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="text-gray-300 bg-white/5">
            <tr>
              <th className="p-3">Coin</th>
              <th className="p-3">Price</th>
              <th className="p-3">24h %</th>
              <th className="p-3">Watchlist</th>
            </tr>
          </thead>

          <tbody>
            {coins.map((coin) => {
              const added = isInWatchlist(coin.id);

              return (
                <tr
                  key={coin.id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-3 flex items-center gap-2">
                    <img src={coin.image} alt="" className="w-6 h-6" />
                    {coin.name}
                  </td>

                  <td className="p-3">${coin.current_price}</td>

                  <td
                    className={`p-3 ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => toggleWatchlist(coin)}
                      className={`px-3 py-1 rounded-lg text-sm transition ${
                        added
                          ? "bg-purple-600 text-white"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      {added ? "★ Added" : "☆ Add"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
