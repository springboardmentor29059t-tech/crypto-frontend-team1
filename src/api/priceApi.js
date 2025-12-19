import axios from "axios";

// Fetch prices from CoinGecko
export const fetchPrices = async (symbols) => {
  if (symbols.length === 0) return {};

  const idsMap = {
    BTC: "bitcoin",
    ETH: "ethereum",
    SOL: "solana",
    MATIC: "polygon",
  };

  const ids = symbols
    .map((s) => idsMap[s])
    .filter(Boolean)
    .join(",");

  const res = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids,
        vs_currencies: "inr",
      },
    }
  );

  return res.data;
};
