import React, { useState } from 'react';

export default function Signup({ setUserId }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // 1. Get the REAL user data from Backend
        const user = await response.json(); 
        
        setMessage("User registered successfully!");
        
        // 2. Use the REAL ID (user.id) instead of hardcoding "1"
        setTimeout(() => setUserId(user.id), 1500); 
      } else {
        // Handle error text (like "Email taken")
        const text = await response.text();
        setMessage(text);
      }
    } catch (error) {
      setMessage("Error: Is Backend running?");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-surface p-8 rounded-lg shadow-lg w-96 border border-slate-700">
        <h2 className="text-2xl font-bold text-accent mb-6 text-center">DigiWealth Join</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            name="name" placeholder="Full Name" onChange={handleChange}
            className="w-full p-2 rounded bg-slate-900 border border-slate-600 focus:border-accent text-white"
          />
          <input 
            name="email" placeholder="Email" onChange={handleChange}
            className="w-full p-2 rounded bg-slate-900 border border-slate-600 focus:border-accent text-white"
          />
          <input 
            name="password" type="password" placeholder="Password" onChange={handleChange}
            className="w-full p-2 rounded bg-slate-900 border border-slate-600 focus:border-accent text-white"
          />
          
          <button type="submit" className="w-full bg-accent text-brand font-bold py-2 rounded hover:bg-sky-400 transition">
            Create Account
          </button>
        </form>
        
        {message && <p className="mt-4 text-center text-sm text-yellow-400">{message}</p>}


        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">Already have an account?</p>
          <button onClick={toggleView} className="text-accent text-sm font-bold hover:underline">
            Log In
          </button>
        </div>


      </div>
    </div>
  );
}