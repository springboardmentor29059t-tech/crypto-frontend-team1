import React, { useState } from 'react';

// FIX: Added 'toggleView' inside the curly braces below 👇
export default function Signup({ toggleView }) {
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Signup Successful! Please Login.");
        toggleView(); // This switches back to Login page
      } else {
        alert("Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Backend not connected?");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl w-96 border border-slate-700">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-accent">DigiWealth</h2>
          <p className="text-gray-400 text-sm tracking-widest mt-1">Track. Analyze. Secure.</p>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-center">Create Account</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          {/* This button calls the function passed from props */}
          <button onClick={toggleView} className="text-blue-400 hover:text-blue-300 font-bold">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}