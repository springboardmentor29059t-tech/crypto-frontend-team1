import React, { useState } from 'react';

export default function Dashboard({ userId }) {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [label, setLabel] = useState('My Binance');
  const [status, setStatus] = useState('');

  const handleLink = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/exchanges/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          exchangeId: 1,
          apiKey: apiKey,
          apiSecret: apiSecret,
          label: label
        }),
      });
      const text = await response.text();
      setStatus(text);
    } catch (error) {
      setStatus("Error: Connection failed");
    }
  };

  return (
    <div className="max-w-3xl ">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 backdrop-blur-sm ">
        <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Exchange Connections</h2>
            <p className="text-slate-400 text-sm">Manage your API keys securely. We use AES-256 encryption.</p>
        </div>

        <form onSubmit={handleLink} className="space-y-5 max-w-lg">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Exchange</label>
            <select className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-1 focus:ring-accent outline-none">
              <option>Binance</option>
              <option disabled>Coinbase (Coming Soon)</option>
            </select>
          </div>
          
          <div>
             <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">API Key</label>
             <input 
                placeholder="Paste your API Key" 
                value={apiKey} 
                onChange={e => setApiKey(e.target.value)} 
                className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>

          <div>
             <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">API Secret</label>
             <input 
                type="password" 
                placeholder="Paste your API Secret" 
                value={apiSecret} 
                onChange={e => setApiSecret(e.target.value)} 
                className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-1 focus:ring-accent outline-none transition-all"
             />
          </div>

          <div>
             <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Account Label</label>
             <input 
                placeholder="e.g. Main Trading Account" 
                value={label} 
                onChange={e => setLabel(e.target.value)} 
                className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:ring-1 focus:ring-accent outline-none transition-all"
             />
          </div>

          <button type="submit" className="w-full bg-accent hover:bg-sky-400 text-brand font-bold py-3 rounded-lg transition-colors shadow-lg shadow-sky-900/20">
            Securely Link Exchange
          </button>
        </form>

        {status && (
          <div className={`mt-6 p-4 rounded-lg text-sm border ${status.includes('Error') ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}