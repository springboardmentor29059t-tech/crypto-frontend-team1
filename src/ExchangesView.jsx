import React, { useEffect, useState } from 'react';

export default function ExchangesView({ userId }) {
  const [statuses, setStatuses] = useState({ Coinbase: false, Binance: false, Kraken: false });
  const [loading, setLoading] = useState(null); // Stores which card is loading

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/exchanges/status');
      const data = await res.json();
      setStatuses(data);
    } catch (err) {
      console.error(err);
    }
  };

  // const handleConnect = async (name) => {
  //   setLoading(name);
  //   // Simulate network delay for realism
  //   setTimeout(async () => {
  //     try {
  //       const res = await fetch(`http://localhost:8080/api/exchanges/connect/${userId}/${name}`, { method: 'POST' });
  //       const msg = await res.text();
  //       alert(msg); // Show "Imported 1.5 ETH!"
  //       fetchStatus(); // Refresh dots
  //     } catch (err) {
  //       alert("Connection Failed");
  //     } finally {
  //       setLoading(null);
  //     }
  //   }, 1500);
  // };

  // --- REPLACE YOUR OLD handleConnect WITH THIS ---
  const handleConnect = async (name) => {
    setLoading(name);
    
    // SHORTCUT: Fake the connection for the demo
    setTimeout(() => {
      // 1. Manually turn the card GREEN
      setStatuses(prev => ({ ...prev, [name]: true }));
      
      // 2. Show a success message
      alert(`Connected ${name} Successfully! (Demo Mode)`);
      
      setLoading(null);
    }, 1500);
  };

  const ExchangeCard = ({ name, logoColor, description }) => {
    const isConnected = statuses[name];
    const isLoading = loading === name;

    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col justify-between hover:border-blue-500 transition shadow-lg relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${logoColor}`}>
            {name[0]}
          </div>
          <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
            isConnected ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-slate-500'}`}></span>
            {isConnected ? 'Active' : 'Offline'}
          </div>
        </div>

        {/* Info */}
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-sm text-slate-400 mb-6">{description}</p>

        {/* Action Button */}
        <button
          onClick={() => !isConnected && handleConnect(name)}
          disabled={isConnected || isLoading}
          className={`w-full py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
            isConnected 
              ? 'bg-slate-700/50 text-slate-500 cursor-default'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          }`}
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Syncing...
            </>
          ) : isConnected ? (
            'Synced ✅'
          ) : (
            'Connect Wallet'
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-white">Connected Exchanges</h2>
        <p className="text-slate-400 text-sm">Manage API connections to auto-sync your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ExchangeCard 
          name="Coinbase" 
          logoColor="bg-blue-600" 
          description="Sync your BTC, ETH, and USDC holdings securely via OAuth."
        />
        <ExchangeCard 
          name="Binance" 
          logoColor="bg-yellow-500" 
          description="Import spot and margin balances from the world's largest exchange."
        />
        <ExchangeCard 
          name="Kraken" 
          logoColor="bg-purple-600" 
          description="Institutional grade security. Connect your API keys."
        />
      </div>

      {/* Info Section */}
      <div className="bg-blue-900/10 border border-blue-500/30 p-6 rounded-xl flex items-start gap-4">
        <div className="text-2xl">🔒</div>
        <div>
          <h4 className="font-bold text-blue-200">Security First</h4>
          <p className="text-sm text-slate-400 mt-1">
            DigiWealth uses read-only API access. We cannot move your funds. 
            All keys are encrypted using AES-256 before storage.
          </p>
        </div>
      </div>
    </div>
  );
}