export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030014]">
      
      {/* Animated gradient orbs */}
      <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-purple-600/40 rounded-full blur-[140px] animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] bg-cyan-400/40 rounded-full blur-[140px] animate-pulse"></div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Auth card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-2">
          {title}
          <span className="text-yellow-300 animate-bounce">✨</span>
        </h1>
        <p className="mt-2 text-gray-300">{subtitle}</p>

        <div className="mt-8">{children}</div>
      </div>

      {/* Extra bottom glow */}
      <div className="absolute bottom-0 w-full h-[200px] bg-gradient-to-t from-black/60 to-transparent"></div>

      {/* Add floating animation keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-20px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.6; }
        }
        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
