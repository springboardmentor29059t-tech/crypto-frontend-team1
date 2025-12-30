import { useEffect, useState } from "react";
import Card from "../components/Card";
import {
  getTransactions,
  addTransactionApi,
  deleteTransactionApi,
} from "../api/transactionsApi";
import { fetchRiskAlerts } from "../api/riskAlertsApi";
import RiskPopup from "../components/RiskPopup";

/* 🔹 Supported coins */
const COINS = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "SOL", name: "Solana" },
  { symbol: "BNB", name: "Binance Coin" },
  { symbol: "ADA", name: "Cardano" },
  { symbol: "XRP", name: "Ripple" },
  { symbol: "DOT", name: "Polkadot" },
  { symbol: "AVAX", name: "Avalanche" },

  // ⚠️ Risk-test assets
  { symbol: "LUNA", name: "Terra Luna (High Risk)" },
  { symbol: "SQUID", name: "Squid Token (Scam)" },
];


export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [riskPopup, setRiskPopup] = useState(null);

  const [form, setForm] = useState({
    asset: "BTC",
    type: "BUY",
    quantity: "",
    price: "",
  });

  /* 🔹 Load transactions */
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch {
      console.log("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 Add transaction + risk check */
  const addTransaction = async () => {
    if (!form.quantity || !form.price) {
      alert("Quantity and Price must be greater than 0");
      return;
    }

    try {
      const saved = await addTransactionApi({
        ...form,
        quantity: Number(form.quantity),
        price: Number(form.price),
      });

      setTransactions((prev) => [saved, ...prev]);

      // 🔔 Fetch latest risk alert
      const riskAlerts = await fetchRiskAlerts();
      if (riskAlerts.length > 0) {
        setRiskPopup(riskAlerts[0]);
      }

      setForm({
        asset: "BTC",
        type: "BUY",
        quantity: "",
        price: "",
      });
    } catch {
      console.log("Failed to add transaction");
    }
  };

  /* 🔹 Delete transaction */
  const deleteTransaction = async (id) => {
    try {
      await deleteTransactionApi(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch {
      console.log("Failed to delete transaction");
    }
  };

  return (
    <div className="space-y-10 text-white">
      {/* 🔔 Risk Popup */}
      <RiskPopup
        alert={riskPopup}
        onClose={() => setRiskPopup(null)}
      />

      {/* 🔹 Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage and track all your buy & sell activity
        </p>
      </div>

      {/* 🔹 Add Transaction */}
      <Card>
        <h2 className="text-lg font-semibold mb-6">
          Add New Transaction
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Asset */}
          <select
            value={form.asset}
            onChange={(e) =>
              setForm({ ...form, asset: e.target.value })
            }
            className="bg-white/5 text-white rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          >
            {COINS.map((coin) => (
              <option
                key={coin.symbol}
                value={coin.symbol}
                className="bg-[#0b021f]"
              >
                {coin.symbol} – {coin.name}
              </option>
            ))}
          </select>

          {/* Type */}
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="bg-white/5 text-white rounded-lg px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          >
            <option value="BUY" className="bg-[#0b021f]">
              BUY
            </option>
            <option value="SELL" className="bg-[#0b021f]">
              SELL
            </option>
          </select>

          {/* Quantity */}
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
            className="bg-white/5 rounded-lg px-4 py-2 text-white
                       placeholder-gray-400 focus:outline-none
                       focus:ring-2 focus:ring-purple-500/40"
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price (₹)"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            className="bg-white/5 rounded-lg px-4 py-2 text-white
                       placeholder-gray-400 focus:outline-none
                       focus:ring-2 focus:ring-purple-500/40"
          />

          {/* Button */}
          <button
            onClick={addTransaction}
            className="bg-purple-600 hover:bg-purple-700
                       rounded-lg px-4 py-2 font-semibold transition"
          >
            Add Transaction
          </button>
        </div>
      </Card>

      {/* 🔹 Transactions Table */}
      <Card>
        <h2 className="text-lg font-semibold mb-6">
          Transaction History
        </h2>

        {loading ? (
          <p className="text-center py-10 text-gray-400">
            Loading transactions...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="text-left py-3">Asset</th>
                  <th className="text-center">Type</th>
                  <th className="text-right">Qty</th>
                  <th className="text-right">Price (₹)</th>
                  <th className="text-right">Value (₹)</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((tx) => {
                  const value = tx.quantity * tx.price;
                  const isBuy = tx.type === "BUY";

                  return (
                    <tr
                      key={tx.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-4 font-medium">
                        {tx.asset}
                      </td>

                      <td className="text-center">
                        <span
                          className={
                            "text-xs px-3 py-1 rounded-full font-semibold " +
                            (isBuy
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-red-500/15 text-red-400")
                          }
                        >
                          {tx.type}
                        </span>
                      </td>

                      <td className="text-right">
                        {tx.quantity}
                      </td>

                      <td className="text-right">
                        ₹{tx.price.toLocaleString()}
                      </td>

                      <td className="text-right font-medium">
                        ₹{value.toLocaleString()}
                      </td>

                      <td className="text-right">
                        <button
                          onClick={() => deleteTransaction(tx.id)}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {transactions.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-10 text-gray-400"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
