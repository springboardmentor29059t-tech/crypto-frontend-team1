// src/components/Card.jsx
import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={
      "bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-[0_0_25px_rgba(0,0,0,0.6)] " + className
    }>
      {children}
    </div>
  );
}
