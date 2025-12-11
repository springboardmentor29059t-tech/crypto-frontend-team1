import { useState } from "react";
import { saveApiKey } from "../api/apiKeyService";
import toast from "react-hot-toast";

export default function AddApiKeyPage() {
  const [form, setForm] = useState({
    exchangeId: "",
    apiKey: "",
    apiSecret: "",
    label: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId"); // ⭐ IMPORTANT

    if (!userId) {
      toast.error("User not logged in");
      return;
    }

    const payload = {
      userId: Number(userId),
      exchangeId: Number(form.exchangeId),
      apiKey: form.apiKey,
      apiSecret: form.apiSecret,
      label: form.label || "My API Key",
    };

    try {
      await saveApiKey(payload);
      toast.success("API Key saved successfully!");

      setForm({
        exchangeId: "",
        apiKey: "",
        apiSecret: "",
        label: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Error saving API key");
    }
  };

  return (
    <div className="px-6 py-10 flex justify-center">
      <div className="w-full max-w-xl p-8 bg-white shadow-lg rounded-2xl border border-gray-200">

        <h1 className="text-3xl font-bold text-purple-700 text-center mb-8">
          Add API Key
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Exchange */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Exchange
            </label>
            <select
              name="exchangeId"
              value={form.exchangeId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Exchange</option>
              <option value="1">Binance</option>
            </select>
          </div>

          {/* API Key */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              API Key
            </label>
            <input
              type="text"
              name="apiKey"
              value={form.apiKey}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your API Key"
            />
          </div>

          {/* API Secret */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              API Secret
            </label>
            <input
              type="password"
              name="apiSecret"
              value={form.apiSecret}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your API Secret"
            />
          </div>

          {/* Label */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Label (optional)
            </label>
            <input
              type="text"
              name="label"
              value={form.label}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-purple-500"
              placeholder="Ex: Main Trading Key"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-xl text-lg font-semibold
            hover:bg-purple-700 transition-all"
          >
            Save API Key
          </button>
        </form>
      </div>
    </div>
  );
}
