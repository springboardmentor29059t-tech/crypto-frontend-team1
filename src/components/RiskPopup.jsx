export default function RiskPopup({ alert, onClose }) {
  if (!alert) return null;

  const isWarning = alert.riskLevel === "WARNING";

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`
          px-6 py-4 rounded-xl shadow-2xl w-80
          border backdrop-blur-xl
          ${isWarning
            ? "bg-red-500/15 border-red-400 text-red-300"
            : "bg-emerald-500/15 border-emerald-400 text-emerald-300"}
        `}
      >
        <h3 className="font-bold text-lg">
          {isWarning ? "⚠️ Risk Alert" : "✅ Transaction Safe"}
        </h3>

        <p className="text-sm mt-2">
          {alert.message}
        </p>

        <button
          onClick={onClose}
          className="mt-3 text-xs underline opacity-80 hover:opacity-100"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
