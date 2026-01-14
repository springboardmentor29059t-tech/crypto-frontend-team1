import api from "./apiClient";

export const fetchPnLSummary = async () => {
  const res = await api.get("/pnl/summary");
  return res.data;
};
