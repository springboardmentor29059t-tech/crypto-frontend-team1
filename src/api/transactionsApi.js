import api from "./apiClient";

// 🔹 Get all transactions
export const getTransactions = async () => {
  const res = await api.get("/transactions");
  return res.data;
};

// 🔹 Add new transaction
export const addTransactionApi = async (payload) => {
  const res = await api.post("/transactions", payload);
  return res.data;
};

// 🔹 Delete transaction
export const deleteTransactionApi = async (id) => {
  await api.delete(`/transactions/${id}`);
};
