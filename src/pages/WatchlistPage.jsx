import React, { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "../utils/watchlist";

export default function WatchlistPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getWatchlist());
  }, []);

  const removeCoin = (id) => {
    removeFromWatchlist(id);
    setList(getWatchlist());
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Watchlist</h1>

      {list.length === 0 ? (
        <div className="card p-6 text-white-300">
          No coins added yet. Go to Markets and click ⭐ Add.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map((coin) => (
            <div key={coin.id} className="card p-6 flex items-center gap-4">
              <img src={coin.image} alt="" className="w-10 h-10" />

              <div className="flex-1">
                <p className="text-lg font-semibold">{coin.name}</p>
                <p className="text-gray-400 uppercase text-sm">{coin.symbol}</p>
                <p className="text-purple-300 mt-1">₹{coin.price}</p>
              </div>

              <button
                onClick={() => removeCoin(coin.id)}
                className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
