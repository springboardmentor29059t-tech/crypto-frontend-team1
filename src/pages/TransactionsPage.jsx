// src/pages/Transactions.jsx
import React, { useState } from "react";
import Card from "../components/Card";

const SAMPLE = [
  { id:1, date:"2025-11-01", coin:"BTC", type:"Buy", amount:0.02, price:45000 },
  { id:2, date:"2025-11-10", coin:"ETH", type:"Buy", amount:0.3, price:3000 },
  { id:3, date:"2025-11-18", coin:"SOL", type:"Sell", amount:5, price:40 },
];

export default function Transactions() {
  const [rows, setRows] = useState(() => {
    try { return JSON.parse(localStorage.getItem("txs")) || SAMPLE; } catch { return SAMPLE; }
  });

  const save = (newRows) => {
    setRows(newRows);
    localStorage.setItem("txs", JSON.stringify(newRows));
  };

  const addRow = () => {
    const id = Date.now();
    const r = { id, date: new Date().toISOString().slice(0,10), coin:"BTC", type:"Buy", amount:0, price:0 };
    save([r, ...rows]);
  };

  return (
    <div className="min-h-screen p-8 text-white bg-gradient-to-br from-[#0b021f] via-[#180b3a] to-[#020617]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <button onClick={addRow} className="px-4 py-2 rounded-lg bg-purple-600">Add Transaction</button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-300 text-sm">
              <tr>
                <th className="py-3">Date</th>
                <th>Coin</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Price (USD)</th>
                <th>Value (USD)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-t border-white/5">
                  <td className="py-3 text-sm">{r.date}</td>
                  <td>{r.coin}</td>
                  <td>{r.type}</td>
                  <td>{r.amount}</td>
                  <td>${r.price?.toLocaleString()}</td>
                  <td>${(r.amount*r.price).toLocaleString()}</td>
                  <td className="text-right">
                    <button onClick={() => {
                      const next = rows.filter(x=>x.id!==r.id);
                      save(next);
                    }} className="text-sm text-red-400">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
