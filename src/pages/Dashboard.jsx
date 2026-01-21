export default function Dashboard() {
  return (
    <div className="min-h-screen pt-28 px-10 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <h1 className="text-4xl font-semibold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <p className="text-gray-300">Total Portfolio Value</p>
          <h2 className="text-3xl font-bold mt-2">$56,332</h2>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <p className="text-gray-300">24H Change</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">+2.4%</h2>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <p className="text-gray-300">Risk Level</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-400">Medium</h2>
        </div>
      </div>
    </div>
  );
}