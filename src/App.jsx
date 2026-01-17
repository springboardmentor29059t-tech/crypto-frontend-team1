import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login'; // <-- Import Login
import Dashboard from './Dashboard';
import Layout from './Layout';
import PortfolioView from './PortfolioView';
import MarketView from './MarketView';
import TransactionsView from './TransactionsView';
import RiskAnalysisView from './RiskAnalysisView';
import NotificationBell from './NotificationBell';
import ExchangesView from './ExchangesView';
import ReportsView from './ReportsView';

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
      userId={userId}

      
      

    >
    
      {/* 1. Dashboard */}
      {activePage === 'Portfolio' && (
        <PortfolioView userId={userId} setActivePage={setActivePage} />
      )}

      {/* 2. Settings */}
      {activePage === 'Settings' && <Dashboard userId={userId} />}
      
      {/* 3. Live Markets */}
      {activePage === 'Markets' && <MarketView />}

      {/* 4. Transactions */}
      {activePage === 'Transactions' && <TransactionsView />}

      {/* 5. NEW: Risk Analysis (Replaced the placeholder) */}
      {activePage === 'Risk Analysis' && <RiskAnalysisView userId={userId} />}

      {/* 6. Exchanges Module */}
      {activePage === 'Exchanges' && <ExchangesView userId={userId} />}

      {/* 7. Reports Module */}
      {activePage === 'Reports' && <ReportsView userId={userId} />}

      

    </Layout>
    
  );
}

export default App;