import api from "./apiClient";

export const fetchPortfolioHoldings = async () => {
  const res = await api.get("/portfolio/holdings");
  return res.data;
};
