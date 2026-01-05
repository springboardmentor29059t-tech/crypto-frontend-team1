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
      {activePage === 'Settings' && <Dashboard userId={userId} />}
      
      {activePage === 'Portfolio' && (
        <PortfolioView userId={userId} setActivePage={setActivePage} />
      )}

      {(activePage === 'Markets' || activePage === 'Risk Analysis') && (
        <div className="flex items-center justify-center h-full text-slate-500 border-2 border-dashed border-slate-700 rounded-xl">
          Module Coming Soon (Milestone 3)
        </div>
      )}
    </Layout>
  );
}

export default App;