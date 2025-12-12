import { getExchanges, saveApiKey } from "../api/apiKeyService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddApiKeyPage() {
  const [exchanges, setExchanges] = useState([]);
  const [form, setForm] = useState({
    exchangeId: "",
    apiKey: "",
    apiSecret: "",
    label: ""
  });

  useEffect(() => {
    getExchanges()
      .then(setExchanges)
      .catch(() => toast.error("Failed to load exchanges"));
  }, []);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveApiKey(form);
      toast.success("API Key saved successfully!");

      setForm({
        exchangeId: "",
        apiKey: "",
        apiSecret: "",
        label: "",
      });
    } catch (err) {
      toast.error("Failed to save API key");
    }
  };

  return (
    <div className="flex justify-center px-6 py-12">
      <div className="w-full max-w-xl bg-[#12002b] shadow-lg rounded-2xl p-10 text-white border border-white/10">
        
        <h1 className="text-3xl font-bold text-purple-400 mb-8 flex items-center gap-2">
          Add API Key 🔐
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Exchange Dropdown */}
          <div>
            <label className="block text-sm mb-2">Exchange</label>
            <select
  name="exchangeId"
  value={form.exchangeId}
  onChange={handleChange}
  required
  className="w-full p-3 rounded-xl bg-[#2A2139] text-white border border-purple-500 
             focus:ring-2 focus:ring-purple-400 focus:outline-none"
>
  <option value="" className="text-gray-400 bg-[#2A2139]">
    Select Exchange
  </option>

  {exchanges.map((ex) => (
    <option
      key={ex.id}
      value={ex.id}
      className="bg-[#2A2139] text-white hover:bg-purple-600"
    >
      {ex.name}
    </option>
  ))}
</select>

          </div>

          {/* API Key */}
          <div>
            <label className="block text-sm mb-2">API Key</label>
            <input
              type="text"
              name="apiKey"
              value={form.apiKey}
              onChange={handleChange}
              required
              placeholder="Enter your API Key"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
            />
          </div>

          {/* API Secret */}
          <div>
            <label className="block text-sm mb-2">API Secret</label>
            <input
              type="password"
              name="apiSecret"
              value={form.apiSecret}
              onChange={handleChange}
              required
              placeholder="Enter your API Secret"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
            />
          </div>

          {/* Label */}
          <div>
            <label className="block text-sm mb-2">Label (optional)</label>
            <input
              type="text"
              name="label"
              value={form.label}
              onChange={handleChange}
              placeholder="Ex: Main Trading Key"
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-lg font-semibold 
            bg-purple-600 hover:bg-purple-700 transition-all shadow-lg"
          >
            Save API Key
          </button>

        </form>
      </div>
    </div>
  );
}
