import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { useNavigate } from "react-router-dom";
console.log("🔥 MOCK LOGIN PAGE LOADED");

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ MOCK LOGIN (NO BACKEND)
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // simulate API delay
    setTimeout(() => {
      // mock credentials
      if (
        form.email === "test@gmail.com" &&
        form.password === "123456"
      ) {
        // fake JWT token
        const fakeToken = "mock-jwt-token-123";

        localStorage.setItem("token", fakeToken);

        console.log("Mock login success");
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Access your secure crypto dashboard"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* email */}
        <div>
          <label className="text-gray-300 text-sm">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 
              border border-white/20 text-white placeholder-gray-400 
              focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* password */}
        <div className="relative">
          <label className="text-gray-300 text-sm">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-3 pr-12 rounded-xl bg-white/10 
              border border-white/20 text-white placeholder-gray-400 
              focus:ring-2 focus:ring-purple-500 outline-none"
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-11 text-gray-300 cursor-pointer"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* error */}
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        {/* submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-2 rounded-xl font-semibold text-white text-lg
            bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-400
            shadow-[0_0_20px_rgba(124,58,237,0.6)]
            hover:scale-[1.02] active:scale-[0.98] transition-all 
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* signup link */}
        <p className="text-gray-300 text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Create one
          </span>
        </p>
      </form>
    </AuthLayout>
  );
}
