// src/pages/LearningHub.jsx
import React, { useState } from "react";
import Card from "../components/Card";

const MODULES = [
  { id:1, title:"Crypto Basics", lessons:["What is crypto","How exchanges work","Wallets"] },
  { id:2, title:"Trading Basics", lessons:["Order types","Reading charts","Risk management"] },
  { id:3, title:"Security", lessons:["2FA and backups","API key safety","Encryption basics"] },
];

export default function LearningHub() {
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("learningCompleted")) || {}; } catch { return {}; }
  });

  const toggle = (m, l) => {
    const key = `${m}-${l}`;
    const next = {...completed, [key]: !completed[key]};
    setCompleted(next);
    localStorage.setItem("learningCompleted", JSON.stringify(next));
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0b021f] via-[#180b3a] to-[#020617] text-white">
      <h1 className="text-3xl font-bold mb-4">Learning Hub</h1>
      <p className="text-gray-400 mb-6">Short modules to help you understand crypto & security.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODULES.map(m => (
          <Card key={m.id}>
            <h3 className="text-xl font-semibold mb-3">{m.title}</h3>
            <div className="space-y-2">
              {m.lessons.map((l, idx) => {
                const key = `${m.id}-${idx}`;
                return (
                  <div key={key} className="flex items-center justify-between">
                    <div>{l}</div>
                    <button onClick={() => toggle(m.id, idx)} className={"text-sm px-3 py-1 rounded " + (completed[key] ? "bg-emerald-600" : "bg-white/5")}>
                      {completed[key] ? "Done" : "Mark"}
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
