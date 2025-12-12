import React, { useEffect, useState } from "react";
import { getUserKeys, deleteKey, testBinanceConnection } from "../api/apiKeyService";
import toast from "react-hot-toast";

export default function ApiKeysListPage() {
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    try {
      const data = await getUserKeys();
      setKeys(data);
    } catch (err) {
      toast.error("Failed to load keys");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteKey(id);
      toast.success("Deleted successfully");
      loadKeys();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleTest = async (id) => {
    try {
      toast.loading("Testing Binance key...", { id: "test" });

      const result = await testBinanceConnection(id);

      if (result === true) {
        toast.success("Connection successful! ✔️", { id: "test" });
      } else {
        toast.error("Invalid API key ❌", { id: "test" });
      }

    } catch (err) {
      toast.error("Connection test failed ❌", { id: "test" });
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Your API Keys</h1>

      <div className="space-y-4">
        {keys.map((k) => (
          <div key={k.id} className="bg-white/10 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">{k.label || "Unnamed Key"}</p>
              <p className="text-sm text-gray-300">{k.exchange?.name}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleTest(k.id)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
              >
                Test Connection
              </button>

              <button
                onClick={() => handleDelete(k.id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
