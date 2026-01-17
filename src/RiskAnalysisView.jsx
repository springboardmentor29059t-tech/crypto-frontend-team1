import React, { useEffect, useState } from 'react';

export default function RiskAnalysisView({ userId }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRiskAnalysis();
  }, [userId]);

  const fetchRiskAnalysis = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/risk/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setReport(data);
      }
    } catch (err) {
      console.error("Failed to load risk report", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to choose color based on risk score (0-100)
  const getScoreColor = (score) => {
    if (score < 40) return 'text-green-400 border-green-500'; // Safe
    if (score < 70) return 'text-yellow-400 border-yellow-500'; // Medium
    return 'text-red-500 border-red-500'; // High Risk
  };

  if (loading) return <div className="text-center mt-20 text-slate-500">Running Risk Algorithms...</div>;

  if (!report) return <div className="text-center mt-20 text-slate-500">No data available. Add assets first.</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-white">Portfolio Risk Analysis</h2>
        <p className="text-slate-400 text-sm">AI-driven safety assessment of your current holdings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CARD 1: THE RISK SCORE GAUGE */}
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center shadow-lg">
          <h3 className="text-slate-400 uppercase text-xs font-bold tracking-widest mb-6">Safety Score</h3>
          
          {/* Circular Score Display */}
          <div className={`w-40 h-40 rounded-full border-8 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,0,0,0.3)] ${getScoreColor(report.riskScore)}`}>
            <div>
              <span className="text-5xl font-bold">{report.riskScore}</span>
              <span className="text-sm block text-slate-500">/ 100</span>
            </div>
          </div>

          <h4 className={`text-xl font-bold mb-2 ${getScoreColor(report.riskScore).split(' ')[0]}`}>
            {report.riskLevel}
          </h4>
          <p className="text-xs text-slate-500 max-w-xs">
            Lower score is better. 0 is safest, 100 is highly volatile.
          </p>
        </div>

        {/* CARD 2: DIVERSIFICATION STATS */}
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 flex flex-col justify-center">
          <h3 className="text-slate-400 uppercase text-xs font-bold tracking-widest mb-6">Diversification Health</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm text-white mb-2">
                <span>Asset Variety</span>
                <span className="font-bold">{report.diversificationScore}/10</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" 
                  style={{ width: `${report.diversificationScore * 10}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
              <p className="text-sm text-slate-300 italic">
                "A diversified portfolio mixes different asset types to minimize the impact of any single asset's decline."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WARNINGS SECTION */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-red-900/10">
          <h3 className="text-lg font-bold text-white flex items-center">
            <span className="mr-2">⚠️</span> Detected Vulnerabilities
          </h3>
        </div>
        
        <div className="p-6 space-y-3">
          {report.warnings.length === 0 ? (
            <p className="text-green-400 font-medium flex items-center">
              ✅ No significant risks detected. Good job!
            </p>
          ) : (
            report.warnings.map((warning, index) => (
              <div key={index} className="flex items-start bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                <span className="text-red-400 mr-3 mt-1">●</span>
                <p className="text-red-200 text-sm">{warning}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* --- NEW SECTION: SCAM DETECTOR --- */}
      <ScamDetectorTool />

    </div>
  );
}

function ScamDetectorTool() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!address) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`http://localhost:8080/api/scam-check/${address}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden mt-8 shadow-xl">
      <div className="p-6 border-b border-slate-700 bg-purple-900/20">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          🕵️ Scam Detector & Contract Auditor
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          Paste a wallet address or contract to check for known scams (Powered by DigiWealth Intelligence).
        </p>
      </div>

      <div className="p-6">
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Enter Address (e.g., 0x123...)" 
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 font-mono"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            onClick={handleCheck}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Scanning...' : 'Scan Now'}
          </button>
        </div>

        {/* RESULTS AREA */}
        {result && (
          <div className={`mt-6 p-4 rounded-lg border flex items-start gap-4 animate-fade-in ${
            result.status === 'DANGER' ? 'bg-red-500/10 border-red-500/30' : 
            result.status === 'WARNING' ? 'bg-yellow-500/10 border-yellow-500/30' : 
            'bg-green-500/10 border-green-500/30'
          }`}>
            <div className={`text-3xl ${
              result.status === 'DANGER' ? 'grayscale-0' : 'grayscale'
            }`}>
              {result.status === 'DANGER' ? '🚨' : result.status === 'WARNING' ? '⚠️' : '🛡️'}
            </div>
            <div>
              <h4 className={`font-bold ${
                result.status === 'DANGER' ? 'text-red-400' : 
                result.status === 'WARNING' ? 'text-yellow-400' : 
                'text-green-400'
              }`}>
                Verdict: {result.status}
              </h4>
              <p className="text-slate-300 text-sm mt-1">{result.message}</p>
              <p className="text-xs text-slate-500 mt-2 font-mono">Risk Score: {result.riskScore}/100</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}