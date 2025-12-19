// src/pages/Alerts.jsx
import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function Alerts() {
  const [alerts, setAlerts] = useState(() => {
    try { return JSON.parse(localStorage.getItem("alerts")) || []; } catch { return []; }
  });
  const [form, setForm] = useState({ coin: "bitcoin", price: "" });

  useEffect(() => {
    localStorage.setItem("alerts", JSON.stringify(alerts));
  }, [alerts]);

  const addAlert = () => {
    if (!form.price) return;
    const a = { id: Date.now(), coin: form.coin, price: Number(form.price), createdAt: new Date().toISOString() };
    setAlerts([a, ...alerts]);
    setForm({ coin: form.coin, price: "" });
  };

  const remove = (id) => setAlerts(alerts.filter(a => a.id !== id));

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0b021f] via-[#180b3a] to-[#020617] text-white">
      <h1 className="text-3xl font-bold mb-4">Alerts</h1>

      <Card className="mb-6">
        <div className="flex gap-3">
          <select value={form.coin} onChange={e=>setForm({...form, coin:e.target.value})} className="px-3 py-2 bg-white/5 rounded-lg">
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
            <option value="cardano">Cardano</option>
            <option value="ripple">XRP</option>
          </select>
          <input value={form.price} onChange={e=>setForm({...form, price:e.target.value})} placeholder="Price in INR"
                 className="px-3 py-2 bg-white/5 rounded-lg flex-1"/>
          <button onClick={addAlert} className="px-4 py-2 rounded-lg bg-emerald-500">Add Alert</button>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold mb-3">Your alerts</h3>
        {alerts.length === 0 && <div className="text-gray-400">No alerts yet.</div>}
        <div className="space-y-3">
          {alerts.map(a => (
            <div key={a.id} className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{a.coin.toUpperCase()}</div>
                <div className="text-sm text-gray-400">Target ₹{a.price} • created {new Date(a.createdAt).toLocaleString()}</div>
              </div>
              <div>
                <button onClick={() => remove(a.id)} className="text-red-400 text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
