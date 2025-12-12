// src/api/apiKeyService.js

const API_BASE = "http://localhost:8080";

// Get token
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("token"),
});

// -----------------------------
// 🔹 Fetch all exchanges
// -----------------------------
export const getExchanges = async () => {
  const res = await fetch("http://localhost:8080/api/exchange/list");
  if (!res.ok) throw new Error("Failed to load exchanges");
  return res.json();
};


// -----------------------------
// 🔹 Save user API key
// -----------------------------
export const saveApiKey = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8080/api/exchange/keys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Failed to save API key");
  }

  return await res.json();
};


// -----------------------------
// 🔹 Get user's saved API keys
// -----------------------------
export const getUserKeys = async () => {
  const res = await fetch(`${API_BASE}/api/exchange/keys`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch keys");
  return res.json();
};

// -----------------------------
// 🔹 Delete a key
// -----------------------------
export const deleteKey = async (keyId) => {
  const res = await fetch(`${API_BASE}/api/exchange/keys/${keyId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete API key");
  return res.text();
};

// -----------------------------
// 🔹 Test Binance Connection
// -----------------------------

export const testBinanceConnection = async (keyId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8080/api/binance/test/${keyId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to test Binance key");

  return res.json(); // response is boolean
};


