export default function HoldingsTable({ holdings = [], prices = {} }) {
  return (
    <div className="bg-white/5 rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Holdings</h2>

      <table className="w-full text-left text-sm">
        <thead className="text-gray-400 border-b border-white/10">
          <tr>
            <th>Asset</th>
            <th>Qty</th>
            <th>Avg Buy</th>
            <th>Current</th>
            <th className="text-right">P/L</th>
          </tr>
        </thead>

        <tbody>
          {holdings.length > 0 &&
            holdings.map((h) => {
              // 🔹 Asset → CoinGecko mapping
              const priceId =
                h.asset === "BTC"
                  ? "bitcoin"
                  : h.asset === "ETH"
                  ? "ethereum"
                  : h.asset === "SOL"
                  ? "solana"
                  : h.asset === "MATIC"
                  ? "polygon"
                  : null;

              // 🔹 Force everything to NUMBER
              const quantity = Number(h.quantity || 0);
              const avgBuy = Number(h.avgBuyPrice || 0);
              const currentPrice = Number(
                priceId ? prices?.[priceId]?.usd : 0
              );

              // 🔹 Calculations
              const invested = quantity * avgBuy;
              const currentValue = quantity * currentPrice;
              const pnl = currentValue - invested;
              const pnlPct = invested === 0 ? 0 : (pnl / invested) * 100;

              return (
                <tr
                  key={h.asset}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="py-3 font-medium">{h.asset}</td>

                  <td>{quantity}</td>

                  <td>${avgBuy.toFixed(2)}</td>

                  <td>${currentPrice.toFixed(2)}</td>

                  <td
                    className={
                      "text-right font-semibold " +
                      (pnl >= 0
                        ? "text-emerald-400"
                        : "text-red-400")
                    }
                  >
                    {pnl >= 0 ? "+" : ""}
                    {pnl.toFixed(2)} ({pnlPct.toFixed(1)}%)
                  </td>
                </tr>
              );
            })}

          {holdings.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="text-center py-6 text-gray-400"
              >
                No holdings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
