import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login'; // <-- Import Login
import Dashboard from './Dashboard';
import Layout from './Layout';
import PortfolioView from './PortfolioView';

function App() {
  const [userId, setUserId] = useState(null);
  const [activePage, setActivePage] = useState('Portfolio');
  const [isLoginView, setIsLoginView] = useState(true); // Default to Login page

  const handleLogout = () => {
    setUserId(null);
    setActivePage('Portfolio');
    setIsLoginView(true); // Go back to login on logout
  };

  // 1. If NOT logged in, show Login OR Signup
  if (!userId) {
    return isLoginView ? (
      <Login setUserId={setUserId} toggleView={() => setIsLoginView(false)} />
    ) : (
      <Signup setUserId={setUserId} toggleView={() => setIsLoginView(true)} />
    );
  }

  // 2. If Logged in, show Layout... (Rest of code remains the same)
  return (
    <Layout 
      activePage={activePage} 
      setActivePage={setActivePage} 
      handleLogout={handleLogout}
    >
      {/* 1. Dashboard / Portfolio */}
      {activePage === 'Portfolio' && (
        <PortfolioView userId={userId} setActivePage={setActivePage} />
      )}

      {/* 2. Settings */}
      {activePage === 'Settings' && <Dashboard userId={userId} />}

      {/* 3. Placeholder for New/Future Pages */}
      {(activePage === 'Markets' || activePage === 'Risk Analysis' || activePage === 'Transactions' || activePage === 'Exchanges') && (
        <div className="flex flex-col items-center justify-center h-full text-slate-500 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50">
          <div className="text-4xl mb-4">🚧</div>
          <h2 className="text-xl font-bold text-slate-300">Module Coming Soon</h2>
          <p className="text-sm opacity-70">We are building the {activePage} feature.</p>
        </div>
      )}
    </Layout>
  );
}

export default App;