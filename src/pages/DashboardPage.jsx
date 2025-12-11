// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch logged-in user
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/user/me", {
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log("User fetch error:", err));
  }, []);

  return (
    <div className="text-white">

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold">Welcome Back ✨</h1>
          <p className="text-gray-300 mt-2">
            Here's a quick overview of your crypto portfolio today.
          </p>
        </div>

        {/* Profile Icon */}
        <div
          onClick={() => navigate("/settings")}
          className="
            w-12 h-12 flex items-center justify-center 
            bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-400
            rounded-full cursor-pointer shadow-[0_0_25px_rgba(168,85,247,0.6)]
            text-xl font-bold hover:scale-105 transition"
        >
          {user ? user.name.charAt(0).toUpperCase() : "?"}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Portfolio Value
          </p>
          <div className="text-3xl font-bold mt-3">$12,480.32</div>
          <div className="text-green-400 mt-2">+ 4.2% today</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Best Performer
          </p>
          <div className="text-3xl font-bold mt-3">ETH</div>
          <div className="text-green-400 mt-2">+ 8.9% today</div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            24h P/L
          </p>
          <div className="text-3xl font-bold mt-3 text-green-400">+$340.12</div>
          <p className="text-gray-300 mt-2">Across 7 assets</p>
        </div>
      </div>

      {/* Assets Section */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-10 backdrop-blur-xl">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl font-semibold">Your Crypto Assets</div>
            <p className="text-gray-300 mt-1">
              Soon this section will show your coins with prices and P/L.
            </p>
          </div>

          <div className="px-4 py-2 rounded-full bg-white/10 text-gray-200 text-sm border border-white/10">
            Live data coming soon ✨
          </div>
        </div>
      </div>
    </div>
  );
}
