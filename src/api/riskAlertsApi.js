import api from "./apiClient";

// Fetch all risk alerts for logged-in user
export const fetchRiskAlerts = async () => {
  const res = await api.get("/risk-alerts");
  return res.data;
};
