// src/components/AuthLayout.jsx
import React from "react";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030014]">

      {/* background effects... keep same */}

      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-2xl rounded-3xl 
                      border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">

        <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-2">
          {title}
          <span className="text-yellow-300 animate-bounce">✨</span>
        </h1>
        <p className="mt-2 text-gray-300">{subtitle}</p>

        {/* ⭐ Make children appear exactly where needed */}
        <div className="mt-8">
          {children}
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-black/60 to-transparent"></div>

      {/* animation keyframes */}
    </div>
  );
}

