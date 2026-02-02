import React from 'react';
import NotificationBell from './NotificationBell';

export default function Layout({ children, activePage, setActivePage, handleLogout ,userId}) {
  
  // Helper to make buttons look cleaner
  const NavItem = ({ name, label, icon }) => (
    <button 
      onClick={() => setActivePage(name)}
      className={`w-full text-left px-6 py-3 mb-1 flex items-center transition-colors ${
        activePage === name 
          ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-400' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );

  return (
    <div className="flex w-full h-screen bg-brand text-gray-100 font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Logo Area */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl mr-3 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-900/50">
  D
</div>
              DigiWealth
            </h1>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-4">
            <NavItem name="Portfolio" label="Portfolio" icon="💼" />
            <NavItem name="Markets" label="Markets" icon="📈" />
            {/* NEW ITEMS */}
            <NavItem name="Transactions" label="Transactions" icon="📝" />
            <NavItem name="Exchanges" label="Exchanges" icon="🔗" />
            <NavItem name="Reports" label="P&L Reports" icon="📊" />
            <NavItem name="Risk Analysis" label="Risk Analysis" icon="⚠️" />
            <NavItem name="Help" label="Help & Support" icon="❓" />
            <NavItem name="Settings" label="Settings" icon="⚙️" />
          </nav>
        </div>


        

        {/* Logout Button */}
        
        <div className="p-6">

          <button 
            onClick={handleLogout}

            className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition"
          >
            <span className="mr-3"></span> Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full bg-slate-900 relative">
        
        {/* NEW: Top Header with Profile Icon */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900">
          <h2 className="text-lg font-semibold text-white">{activePage}</h2>
          
          {/* Profile Icon */}
          <div className="flex items-center space-x-4">
            <NotificationBell userId={userId} />
             <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-white">User</p>
                
                
             </div>
             <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg border border-slate-700 cursor-pointer hover:opacity-90">
                U
             </div>
          </div>
        </div>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
}