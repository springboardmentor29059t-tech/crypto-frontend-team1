export default function HoldingsTable({ holdings, prices }) {
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
          {holdings.map((h) => {
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

            const currentPrice = priceId
              ? prices?.[priceId]?.usd || 0
              : 0;

            const invested = h.quantity * h.avgBuyPrice;
            const currentValue = h.quantity * currentPrice;
            const pnl = currentValue - invested;
            const pnlPct =
              invested === 0 ? 0 : (pnl / invested) * 100;

            return (
              <tr key={h.asset} className="border-b border-white/5">
                <td className="py-3 font-medium">{h.asset}</td>
                <td>{h.quantity}</td>
                <td>${h.avgBuyPrice.toFixed(2)}</td>
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
