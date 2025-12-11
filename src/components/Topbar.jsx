// src/components/Topbar.jsx
import React from "react";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between">
      <div>
        {/* optional breadcrumbs or small tagline */}
      </div>

      <div className="flex items-center gap-4">
        <button className="badge">Add Asset</button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-semibold">
          S
        </div>
      </div>
    </div>
  );
}
