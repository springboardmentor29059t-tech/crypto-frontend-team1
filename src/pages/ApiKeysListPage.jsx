import { useEffect, useState } from "react";
import {
  getUserKeys,
  deleteKey,
  testBinanceConnection,
} from "../api/apiKeyService";
import toast from "react-hot-toast";

export default function ApiKeysListPage() {
  const [keys, setKeys] = useState([]);

  const loadKeys = async () => {
    const res = await getUserKeys();
    setKeys(res.data);
  };

  useEffect(() => {
    loadKeys();
  }, []);

  const handleDelete = async (id) => {
    await deleteKey(id);
    toast.success("Key deleted");
    loadKeys();
  };

  const handleTest = async (id) => {
    try {
      const res = await testBinanceConnection(id);
      toast.success(res.data);
    } catch {
      toast.error("Connection failed");
    }
  };

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-purple-700 text-center">
        Saved API Keys
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {keys.map((key) => (
          <div
            key={key.id}
            className="p-6 bg-white border rounded-2xl shadow-md flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-bold text-gray-800">
                {key.label || "Unnamed Key"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                API Key: <span className="font-medium">{key.apiKeyValue}</span>
              </p>
              <p className="text-sm text-gray-500">
                Secret:{" "}
                <span className="font-medium">{key.apiSecretValue}</span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleTest(key.id)}
                className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Test
              </button>

              <button
                onClick={() => handleDelete(key.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {keys.length === 0 && (
          <p className="text-center text-gray-500">No API Keys added yet.</p>
        )}
      </div>
    </div>
  );
}
