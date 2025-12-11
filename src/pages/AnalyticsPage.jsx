// src/pages/Analytics.jsx
import React from "react";
import Card from "../components/Card";
import ChartPlaceholder from "../components/ChartPlaceholder";

export default function Analytics() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0b021f] via-[#180b3a] to-[#020617] text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="text-sm text-gray-400">Last 7 days</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card><ChartPlaceholder title="Portfolio trend" height={120} /></Card>
        <Card><ChartPlaceholder title="Profit / Loss" height={120} /></Card>
        <Card>
          <div className="text-sm text-gray-400 mb-2">Quick Insights</div>
          <div className="space-y-2">
            <div>• Top asset: ETH (+8.9% today)</div>
            <div>• Average daily change: +1.2%</div>
            <div>• Diversification: 7 assets</div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Detailed metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-400">Allocation</div>
            <div className="mt-3">BTC 38% • ETH 28% • Others 34%</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Risk score</div>
            <div className="mt-3 font-semibold">Moderate</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
