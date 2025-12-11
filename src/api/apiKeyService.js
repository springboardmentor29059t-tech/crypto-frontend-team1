// Get all API keys for logged-in user
export const getUserKeys = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8080/api/exchange/keys/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch API keys");

  return res.json();
};

// Save new API key
export const saveApiKey = async (payload) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8080/api/exchange/keys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to save API key");

  return res.json();
};

// Delete API key
export const deleteKey = async (keyId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:8080/api/exchange/keys/${keyId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to delete key");

  return true;
};

// Test Binance Connection
export const testBinanceConnection = async (keyId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:8080/api/binance/test/${keyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Binance connection failed");

  return res.json(); // should be { success: true/false }
};
