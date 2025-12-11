import { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Signup Data:", form);

    // Later connect with backend
    alert("Account created successfully!");

    // Redirect to Login
    navigate("/login");
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join CryptoTracker and start your journey"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* Name */}
        <div>
          <label className="text-gray-300 text-sm">Full Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-3 rounded-xl
              bg-white/10 border border-white/20 text-white
              placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-gray-300 text-sm">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-3 rounded-xl
              bg-white/10 border border-white/20 text-white
              placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-gray-300 text-sm">Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="Create a password"
            value={form.password}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-3 rounded-xl
              bg-white/10 border border-white/20 text-white
              placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full py-3 mt-2 rounded-xl font-semibold text-white text-lg
          bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-400 
          shadow-[0_0_20px_rgba(124,58,237,0.6)]
          hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Create Account
        </button>

        {/* Bottom Link */}
        <p className="text-gray-300 text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>

      </form>
    </AuthLayout>
  );
}
