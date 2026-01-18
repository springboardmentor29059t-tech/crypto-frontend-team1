// src/pages/LandingPage.jsx
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#05010d] via-[#0b061f] to-[#05010d] text-white flex flex-col">

      {/* Glow Background Effects */}
      <div className="absolute top-[-120px] left-[-120px] w-[380px] h-[380px] bg-purple-600/20 blur-[180px] rounded-full" />
      <div className="absolute bottom-[-160px] right-[-160px] w-[420px] h-[420px] bg-indigo-500/20 blur-[200px] rounded-full" />

      {/* Navbar */}
      <header className="relative z-10 flex justify-between items-center px-10 py-6">
        <h2 className="text-xl font-bold tracking-wide">
          Crypto<span className="text-purple-400">Tracker</span>
        </h2>

        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 rounded-lg border border-white/15 bg-white/5 backdrop-blur-md text-gray-200 hover:bg-white/10 transition"
        >
          Login
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Smarter Way to
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Track Crypto
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          Manage your crypto portfolio with real-time analytics, intelligent
          insights, and enterprise-grade security — all in one powerful
          dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => navigate("/signup")}
            className="px-10 py-4 rounded-xl font-semibold text-white 
                       bg-gradient-to-r from-purple-500 to-indigo-500
                       hover:opacity-90 shadow-xl transition"
          >
            Get Started
          </button>

          
        </div>

        {/* Feature Pills */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5 text-sm text-gray-300">
          {[
            "Live Prices",
            "Portfolio Analytics",
            "Risk Alerts",
            "Secure Access",
          ].map((item) => (
            <div
              key={item}
              className="px-6 py-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
            >
              {item}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-sm text-gray-500 border-t border-white/10">
        © {new Date().getFullYear()} CryptoTracker. All rights reserved.
      </footer>
    </div>
  );
}
