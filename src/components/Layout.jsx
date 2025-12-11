// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen app-bg text-white">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <Topbar />
          <main className="mt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
