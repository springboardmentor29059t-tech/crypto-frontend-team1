// src/components/ChartPlaceholder.jsx
import React from "react";

export default function ChartPlaceholder({ title = "Chart", height = 120 }) {
  // Simple sparkline-like SVG placeholder (no external libs)
  const points = [10, 50, 30, 70, 40, 80, 60];
  const w = 300;
  const h = height;
  const step = w / (points.length - 1);
  const max = Math.max(...points);
  const path = points.map((p, i) => {
    const x = i * step;
    const y = h - (p / max) * (h - 10);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");

  return (
    <div>
      <div className="text-sm text-gray-400 mb-2">{title}</div>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <path d={path} stroke="#a855f7" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="0" y="0" width={w} height={h} fill="transparent"/>
      </svg>
    </div>
  );
}
