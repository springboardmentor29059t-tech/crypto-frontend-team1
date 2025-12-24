// src/pages/Alerts.jsx
import React, { useEffect, useState } from "react";
import Card from "../components/Card";

const COINS = [
  { id: "bitcoin", name: "Bitcoin (BTC)" },
  { id: "ethereum", name: "Ethereum (ETH)" },
  { id: "solana", name: "Solana (SOL)" },
  { id: "cardano", name: "Cardano (ADA)" },
  { id: "ripple", name: "Ripple (XRP)" },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("alerts")) || [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState({
    coin: "bitcoin",
    price: "",
  });

  useEffect(() => {
    localStorage.setItem("alerts", JSON.stringify(alerts));
  }, [alerts]);

  const addAlert = () => {
    if (!form.price || Number(form.price) <= 0) return;

    const newAlert = {
      id: Date.now(),
      coin: form.coin,
      price: Number(form.price),
      createdAt: new Date().toISOString(),
    };

    setAlerts([newAlert, ...alerts]);
    setForm({ ...form, price: "" });
  };

  const removeAlert = (id) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <div className="p-8 text-white">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Price Alerts</h1>
        <p className="text-gray-400 mt-1">
          Get notified when your target price is reached.
        </p>
      </div>

      {/* Create Alert */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Create New Alert
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Asset Dropdown */}
          <div>
            <label className="text-sm text-gray-400">Asset</label>
            <select
              value={form.coin}
              onChange={(e) =>
                setForm({ ...form, coin: e.target.value })
              }
              className="
                w-full mt-1 px-3 py-2 rounded-lg
                bg-[#120726] text-white
                border border-white/10
                focus:outline-none focus:ring-2 focus:ring-purple-500
                appearance-none cursor-pointer
              "
            >
              {COINS.map((c) => (
                <option
                  key={c.id}
                  value={c.id}
                  className="bg-[#120726] text-white"
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Input */}
          <div>
            <label className="text-sm text-gray-400">
              Target Price (INR)
            </label>
            <input
              type="number"
              placeholder="Enter price"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              className="
                w-full mt-1 px-3 py-2 rounded-lg
                bg-white/5 text-white
                border border-white/10
                focus:outline-none focus:ring-2 focus:ring-purple-500
              "
            />
          </div>

          {/* Button */}
          <div className="flex items-end">
            <button
              onClick={addAlert}
              className="
                w-full px-4 py-2 rounded-lg font-semibold
                bg-gradient-to-r from-emerald-500 to-green-600
                hover:scale-[1.02] transition
              "
            >
              Add Alert
            </button>
          </div>
        </div>
      </Card>

      {/* Alerts List */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">
          Your Alerts
        </h2>

        {alerts.length === 0 ? (
          <p className="text-gray-400">
            No alerts created yet.
          </p>
        ) : (
          <div className="space-y-4">
            {alerts.map((a) => (
              <div
                key={a.id}
                className="
                  flex items-center justify-between
                  p-4 rounded-xl
                  bg-white/5 border border-white/10
                "
              >
                <div>
                  <p className="font-semibold text-lg">
                    {a.coin.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-400">
                    Target: ₹{a.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Created on{" "}
                    {new Date(a.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => removeAlert(a.id)}
                  className="
                    text-red-400 text-sm
                    hover:text-red-300 transition
                  "
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
