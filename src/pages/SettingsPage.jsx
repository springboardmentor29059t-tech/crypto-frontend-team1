import React, { useState } from "react";


export default function SettingsPage() {
  

  const [profile, setProfile] = useState({
    name: "Sneha",
    email: "sneha@gmail.com",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  return (
    <div className="min-h-screen px-6 py-10 text-white bg-gradient-to-br from-[#0b021f] via-[#1b0c33] to-[#090113]">


      <h1 className="text-4xl font-bold mb-6 tracking-tight">
        Settings ⚙️
      </h1>

      <p className="text-gray-400 mb-10">
        Manage your account, preferences, and security.
      </p>

      {/* Profile Section */}
      <div className="mb-10 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>

        <div className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="text-gray-300 text-sm">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({ ...profile, name: e.target.value })
              }
              className="w-full px-4 py-3 mt-1 rounded-xl bg-white/10 border border-white/20
              text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="text-gray-300 text-sm">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="w-full px-4 py-3 mt-1 rounded-xl bg-white/10 border border-white/20
              text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <button
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Password Section */}
      <div className="mb-10 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>

        <div className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm">Old Password</label>
            <input
              type="password"
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
              className="w-full px-4 py-3 mt-1 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">New Password</label>
            <input
              type="password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              className="w-full px-4 py-3 mt-1 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <button
            className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition text-white font-semibold"
          >
            Update Password
          </button>
        </div>
      </div>

    </div>
  );
}
