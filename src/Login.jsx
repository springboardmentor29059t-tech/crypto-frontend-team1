import React, { useState } from 'react';

export default function Login({ setUserId, toggleView }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        // Login Success! Set the ID to enter the dashboard
        setUserId(user.id);
      } else {
        setMessage("Invalid Email or Password");
      }
    } catch (error) {
      setMessage("Error: Backend is offline");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-brand">
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 border border-slate-700">
        <h2 className="text-2xl font-bold text-accent mb-6 text-center">DigiWealth Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            name="email" placeholder="Email" onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-600 focus:border-accent text-white outline-none"
          />
          <input 
            name="password" type="password" placeholder="Password" onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 border border-slate-600 focus:border-accent text-white outline-none"
          />
          
          <button type="submit" className="w-full bg-accent text-brand font-bold py-3 rounded hover:bg-sky-400 transition">
            Log In
          </button>
        </form>
        
        {message && <p className="mt-4 text-center text-sm text-red-400">{message}</p>}

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">Don't have an account?</p>
          <button onClick={toggleView} className="text-accent text-sm font-bold hover:underline">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}