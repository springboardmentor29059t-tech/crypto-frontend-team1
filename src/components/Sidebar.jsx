// src/components/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ userName }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    "block px-4 py-3 rounded-lg transition " +
    (isActive
      ? "bg-white/10 shadow-[0_0_20px_rgba(168,85,247,0.18)] text-purple-100"
      : "text-gray-200 hover:bg-white/5");

  return (
    <aside className="flex-shrink-0 w-64 bg-gradient-to-b from-[#24152b] to-[#1a0f24] px-6 py-8 flex flex-col">
      
      {/* Logo */}
      <div className="text-2xl font-bold text-purple-200 mb-8">
        CryptoTracker
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
        <NavLink to="/portfolio" className={linkClass}>Portfolio</NavLink>
        <NavLink to="/markets" className={linkClass}>Markets</NavLink>
        <NavLink to="/watchlist" className={linkClass}>Watchlist</NavLink>
        <NavLink to="/transactions" className={linkClass}>Transactions</NavLink>
        <NavLink to="/analytics" className={linkClass}>Analytics</NavLink>
        <NavLink to="/news" className={linkClass}>News & Insights</NavLink>

        {/* 🔔 Price Alerts */}
        <NavLink to="/alerts" className={linkClass}>Price Alerts</NavLink>

        {/* ⚠️ Risk Alerts (NEW) */}
        <NavLink to="/risk-alerts" className={linkClass}>Risk Alerts</NavLink>

        <NavLink to="/learning" className={linkClass}>Learning Hub</NavLink>
        <NavLink to="/settings" className={linkClass}>Settings</NavLink>
      </nav>

      {/* User Info */}
      <div className="mt-6 text-xs text-gray-400">Logged in as</div>
      <div className="text-white font-semibold mb-3">
        {userName || "User"}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-auto px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium"
      >
        Logout
      </button>
    </aside>
  );
}
