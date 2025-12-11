import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👁️ ADDED

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Access your secure crypto dashboard"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        
        {/* Email Input */}
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

        {/* Password Input with Eye Icon */}
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

          {/* Eye Button */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-11 text-gray-300 cursor-pointer"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        {/* Login Button */}
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

        {/* Bottom Link */}
        <p className="text-gray-300 text-center text-sm">
          Don’t have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Create one
          </span>
        </p>
      </form>
    </AuthLayout>
  );
  
}
