// src/pages/News.jsx
import React, { useEffect, useState } from "react";
import Card from "../components/Card";

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try CoinGecko events first (no key). If empty, use fallback mocks.
    fetch("https://api.coingecko.com/api/v3/events")
      .then(r=>r.json())
      .then(json=>{
        if (json && json.data && Array.isArray(json.data) && json.data.length) {
          // map to common shape
          const items = json.data.slice(0,6).map((e, idx) => ({
            id: "evt"+idx,
            title: e.title || e.description || "Crypto event",
            source: e.site || "coingecko",
            url: e.link || "#",
            publishedAt: e.start_date || ""
          }));
          setNews(items);
        } else {
          throw new Error("no events");
        }
      })
      .catch(() => {
        // fallback dummy news (safe)
        setNews([
          { id:1, title: "BTC holds strong above ₹40k", source:"Local", url:"#", publishedAt:"2025-11-20" },
          { id:2, title: "Ethereum upgrade shows positive signs", source:"Local", url:"#", publishedAt:"2025-11-19" },
          { id:3, title: "Solana performance improves after update", source:"Local", url:"#", publishedAt:"2025-11-18" },
        ]);
      })
      .finally(()=>setLoading(false));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#0b021f] via-[#180b3a] to-[#020617] text-white">
      <h1 className="text-3xl font-bold mb-4">News & Insights</h1>
      <p className="text-gray-400 mb-6">Latest crypto news for the market.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? <div className="text-gray-400">Loading news...</div> :
          news.map(n => (
            <Card key={n.id}>
              <div className="flex justify-between items-start">
                <div>
                  <a href={n.url} target="_blank" rel="noreferrer" className="text-lg font-semibold hover:underline">{n.title}</a>
                  <div className="text-sm text-gray-400 mt-1">{n.source} • {n.publishedAt}</div>
                </div>
                <div className="text-sm text-purple-300">Read</div>
              </div>
            </Card>
          ))
        }
      </div>
    </div>
  );
}
