import axios from "axios";

// Fetch prices from CoinGecko (INR)
export const fetchPrices = async (symbols) => {
  if (!symbols || symbols.length === 0) return {};

  const idsMap = {
    BTC: "bitcoin",
    ETH: "ethereum",
    SOL: "solana",
    ADA: "cardano",
    XRP: "ripple",
    BNB: "binancecoin",
  };

  const ids = symbols
    .map((s) => idsMap[s])
    .filter(Boolean)
    .join(",");

  if (!ids) return {};

  const res = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids,
        vs_currencies: "inr",
      },
    }
  );

  return res.data; // { bitcoin: { inr: 7900000 }, ... }
};
