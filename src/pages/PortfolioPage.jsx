export default function PortfolioPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Portfolio</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-xl">Holdings Summary</div>
        <div className="bg-white/5 p-6 rounded-xl">Profit / Loss</div>
        <div className="bg-white/5 p-6 rounded-xl">Asset Allocation</div>
      </div>
    </>
  );
}
