import { useEffect, useState } from "react";
import Card from "../components/Card";
import { fetchRiskAlerts } from "../api/riskAlertsApi";

export default function RiskAlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const data = await fetchRiskAlerts();
      setAlerts(data);
    } catch {
      console.log("Failed to load risk alerts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Risk Alerts</h1>
        <p className="text-sm text-gray-400 mt-1">
          Security & reputation checks for your transactions
        </p>
      </div>

      {/* Alerts */}
      <Card>
        {loading ? (
          <p className="text-gray-400">Loading risk alerts...</p>
        ) : alerts.length === 0 ? (
          <p className="text-gray-400">No risk alerts found</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((a) => (
              <div
                key={a.id}
                className={`p-4 rounded-xl border ${
                  a.riskLevel === "WARNING"
                    ? "border-red-500 bg-red-500/10"
                    : "border-emerald-500 bg-emerald-500/10"
                }`}
              >
                <p className="font-semibold">
                  {a.asset} — {a.riskLevel}
                </p>

                <p className="text-sm text-gray-300 mt-1">
                  {a.message}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
