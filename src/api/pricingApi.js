import api from "./apiClient";

export const fetchLatestPrices = async () => {
  const res = await api.get("/prices/latest");
  return res.data;
};

export const fetchPriceHistory = async (asset) => {
  const res = await api.get(`/prices/history/${asset}`);
  return res.data;
};
