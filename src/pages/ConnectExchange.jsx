import { useState } from "react";
import { connectExchange } from "../services/exchangeService";

export default function ConnectExchange() {
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await connectExchange({
        exchangeName: "BINANCE",
        apiKey,
        secretKey,
      });
      setMessage("Exchange connected successfully");
    } catch (err) {
      setMessage("Failed to connect exchange");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Connect Binance</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="API Key"
          className="w-full p-2 rounded bg-gray-800"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Secret Key"
          className="w-full p-2 rounded bg-gray-800"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 py-2 rounded font-semibold">
          Connect Exchange
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
