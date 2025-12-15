export default function TransactionsTable({ transactions, loading }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mt-6">
      <h2 className="text-xl font-semibold mb-4">Trade History</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase text-gray-400 border-b border-white/10">
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Asset</th>
              <th className="py-2">Type</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {!loading && transactions.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No transactions found.
                </td>
              </tr>
            )}

            {transactions.map((tx) => {
              const total = tx.quantity * tx.price;
              const isBuy = tx.type === "BUY";

              return (
                <tr
                  key={tx.id}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="py-2 text-gray-300">
                    {new Date(tx.timestamp).toLocaleDateString()}
                  </td>

                  <td className="py-2 font-medium">{tx.asset}</td>

                  <td className="py-2">
                    <span
                      className={
                        "text-xs font-semibold px-2 py-1 rounded-full " +
                        (isBuy
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-red-500/15 text-red-400")
                      }
                    >
                      {tx.type}
                    </span>
                  </td>

                  <td className="py-2">{tx.quantity}</td>

                  <td className="py-2">${tx.price}</td>

                  <td className="py-2 text-right">
                    ${total.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {loading && (
          <p className="text-center text-gray-400 py-6">
            Loading transactions...
          </p>
        )}
      </div>
    </div>
  );
}
