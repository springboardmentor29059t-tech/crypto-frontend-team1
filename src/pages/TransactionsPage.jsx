import { useEffect, useState } from "react";
import Card from "../components/Card";
import {
  getTransactions,
  addTransactionApi,
  deleteTransactionApi,
} from "../api/transactionsApi";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [form, setForm] = useState({
    asset: "BTC",
    type: "BUY",
    quantity: "",
    price: "",
    date: new Date().toISOString().slice(0, 10),
  });

  // 🔹 Load transactions from backend
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

  // 🔹 Add transaction
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

      // reset form
      setForm({
        asset: "BTC",
        type: "BUY",
        quantity: "",
        price: "",
        date: new Date().toISOString().slice(0, 10),
      });
    } catch {
      console.log("Failed to add transaction");
    }
  };

  // 🔹 Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await deleteTransactionApi(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch {
      console.log("Failed to delete transaction");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-sm text-gray-400 mt-1">
            Buy & sell history synced from backend
          </p>
        </div>
      </div>

      {/* Add Transaction Form */}
      <Card className="mb-6">
        <div className="grid grid-cols-5 gap-4">
          {/* Asset */}
          <select
            value={form.asset}
            onChange={(e) => setForm({ ...form, asset: e.target.value })}
            className="bg-white/5 text-white rounded px-3 py-2 
                       focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          >
            <option className="bg-[#0b021f] text-white">BTC</option>
            <option className="bg-[#0b021f] text-white">ETH</option>
            <option className="bg-[#0b021f] text-white">SOL</option>
          </select>

          {/* Type */}
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="bg-white/5 text-white rounded px-3 py-2 
                       focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          >
            <option value="BUY" className="bg-[#0b021f] text-white">
              BUY
            </option>
            <option value="SELL" className="bg-[#0b021f] text-white">
              SELL
            </option>
          </select>

          {/* Quantity */}
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="bg-white/5 rounded px-3 py-2 text-white 
                       placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-purple-500/40"
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="bg-white/5 rounded px-3 py-2 text-white 
                       placeholder-gray-400 focus:outline-none 
                       focus:ring-2 focus:ring-purple-500/40"
          />

          {/* Add Button */}
          <button
            onClick={addTransaction}
            className="bg-purple-600 hover:bg-purple-700 
                       rounded px-4 py-2 font-semibold transition"
          >
            Add
          </button>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card>
        {loading ? (
          <p className="text-center py-6 text-gray-400">
            Loading transactions...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-gray-400 border-b border-white/10">
                <tr>
                  <th className="py-3">Date</th>
                  <th>Asset</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Value</th>
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
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="py-3">{tx.date}</td>
                      <td className="font-medium">{tx.asset}</td>

                      <td>
                        <span
                          className={
                            "text-xs px-2 py-1 rounded-full font-semibold " +
                            (isBuy
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-red-500/15 text-red-400")
                          }
                        >
                          {tx.type}
                        </span>
                      </td>

                      <td>{tx.quantity}</td>
                      <td>${tx.price}</td>
                      <td>${value.toLocaleString()}</td>

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
                    <td colSpan="7" className="text-center py-6 text-gray-400">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
