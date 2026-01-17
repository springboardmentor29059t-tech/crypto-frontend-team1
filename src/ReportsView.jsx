import React, { useEffect, useState } from 'react';

export default function ReportsView({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the P&L Data
    fetch(`http://localhost:8080/api/reports/pnl/${userId}`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [userId]);

  const downloadCSV = () => {
    // Trigger the file download
    window.location.href = `http://localhost:8080/api/reports/export/${userId}`;
  };

  if (loading) return <div className="p-10 text-white">Generating Financial Report...</div>;

  const isProfit = data.netProfit >= 0;

  return (
    <div className="space-y-8 animate-fade-in text-white">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">Profit & Loss Statement</h2>
        <p className="text-slate-400">Financial performance and tax estimation.</p>
      </div>

      {/* 1. P&L SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm font-bold uppercase">Total Invested (Cost Basis)</p>
          <h3 className="text-2xl font-bold mt-2">${data.totalInvested.toFixed(2)}</h3>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <p className="text-slate-400 text-sm font-bold uppercase">Current Portfolio Value</p>
          <h3 className="text-2xl font-bold mt-2 text-blue-400">${data.currentValue.toFixed(2)}</h3>
        </div>

        <div className={`p-6 rounded-xl border ${isProfit ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`${isProfit ? 'text-green-400' : 'text-red-400'} text-sm font-bold uppercase`}>
            Net Profit / Loss
          </p>
          <h3 className={`text-2xl font-bold mt-2 ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
            {isProfit ? '+' : ''}{data.netProfit.toFixed(2)} 
            <span className="text-sm ml-2">({data.roiPercentage.toFixed(2)}%)</span>
          </h3>
        </div>
      </div>

      {/* 2. TAX HINTS & EXPORT SECTION */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h3 className="font-bold text-lg">Tax Year 2026 Export</h3>
          <span className="bg-blue-600 text-xs px-2 py-1 rounded text-white">Ready to File</span>
        </div>
        
        <div className="p-6 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <h4 className="font-bold text-slate-300 mb-2">Tax Hints (USA/General)</h4>
            <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
              <li>Your Holdings are currently marked as <strong>Unrealized</strong> (Not yet taxed).</li>
              <li>Calculated Cost Basis: <strong>FIFO (First-In, First-Out)</strong>.</li>
              <li>Short-Term Gains (Held &lt; 1yr) are taxed as regular income.</li>
              <li>Long-Term Gains (Held &gt; 1yr) receive preferential rates (0%, 15%, or 20%).</li>
            </ul>
          </div>

          <div className="w-full md:w-auto bg-slate-900 p-4 rounded-lg text-center">
            <p className="text-slate-400 text-sm mb-4">Download .CSV for TurboTax / Accountant</p>
            <button 
              onClick={downloadCSV}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg w-full transition flex items-center justify-center gap-2"
            >
              <span>📄</span> Download Tax Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}