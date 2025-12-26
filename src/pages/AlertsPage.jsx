// src/pages/Alerts.jsx
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import {
  fetchAlerts,
  addAlertApi,
  deleteAlertApi,
} from "../api/alertsApi";

const COINS = [
  { id: "bitcoin", name: "Bitcoin (BTC)" },
  { id: "ethereum", name: "Ethereum (ETH)" },
  { id: "solana", name: "Solana (SOL)" },
  { id: "cardano", name: "Cardano (ADA)" },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [form, setForm] = useState({
    coinId: "bitcoin",
    price: "",
    type: "ABOVE",
  });

  const [popup, setPopup] = useState(null);

  // 🔹 Load alerts from backend
  const loadAlerts = async () => {
    const data = await fetchAlerts();
    setAlerts(data);
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  // 🔔 Show popup when alert is triggered
  useEffect(() => {
    const triggeredAlert = alerts.find(
      (a) => a.triggered === true && !a.notified
    );

    if (triggeredAlert) {
      setPopup({
        title: "🎉 Price Alert Triggered!",
        message: `${triggeredAlert.coinId.toUpperCase()} has reached your target price of ₹${triggeredAlert.targetPriceInr}`,
      });
    }
  }, [alerts]);

  // ➕ Add alert
  const addAlert = async () => {
    if (!form.price) return;

    await addAlertApi({
      coinId: form.coinId,
      price: Number(form.price),
      type: form.type,
    });

    setForm({ ...form, price: "" });
    loadAlerts();
  };

  // ❌ Delete alert
  const deleteAlert = async (id) => {
    await deleteAlertApi(id);
    loadAlerts();
  };

  return (
    <div className="p-8 text-white relative">
      {/* 🔔 POPUP */}
      {popup && (
        <div className="fixed top-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50">
          <h3 className="font-bold text-lg">{popup.title}</h3>
          <p className="mt-1 text-sm">{popup.message}</p>
          <button
            className="mt-3 text-sm underline"
            onClick={() => setPopup(null)}
          >
            Close
          </button>
        </div>
      )}

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">Price Alerts</h1>

      {/* CREATE ALERT */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create Alert</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
  value={form.coinId}
  onChange={(e) =>
    setForm({ ...form, coinId: e.target.value })
  }
  className="
    w-full mt-1 px-3 py-2 rounded-lg
    bg-[#120726] text-white
    border border-white/10
    focus:outline-none focus:ring-2 focus:ring-purple-500
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


     <select
  value={form.type}
  onChange={(e) =>
    setForm({ ...form, type: e.target.value })
  }
  className="
    w-full mt-1 px-3 py-2 rounded-lg
    bg-[#120726] text-white
    border border-white/10
    focus:outline-none focus:ring-2 focus:ring-purple-500
    appearance-none cursor-pointer
  "
>
  <option
    value="ABOVE"
    className="bg-[#120726] text-white"
  >
    Above
  </option>

  <option
    value="BELOW"
    className="bg-[#120726] text-white"
  >
    Below
  </option>
</select>


          <input
            type="number"
            placeholder="Target Price (INR)"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            className="bg-white/5 p-2 rounded-lg"
          />

          <button
            onClick={addAlert}
            className="bg-emerald-500 rounded-lg font-semibold"
          >
            Add Alert
          </button>
        </div>
      </Card>

      {/* ALERT LIST */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Your Alerts</h2>

        {alerts.length === 0 && (
          <p className="text-gray-400">No alerts yet.</p>
        )}

        <div className="space-y-4">
          {alerts.map((a) => (
            <div
              key={a.id}
              className={`flex justify-between p-4 rounded-xl border
                ${
                  a.triggered
                    ? "bg-emerald-500/10 border-emerald-400"
                    : "bg-white/5 border-white/10"
                }`}
            >
              <div>
                <p className="font-semibold">
                  {a.coinId.toUpperCase()} — ₹{a.targetPriceInr}
                </p>
                <p className="text-sm text-gray-400">
                  Status:{" "}
                  {a.triggered ? "Triggered ✅" : "Waiting ⏳"}
                </p>
              </div>

              <button
                onClick={() => deleteAlert(a.id)}
                className="text-red-400 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
