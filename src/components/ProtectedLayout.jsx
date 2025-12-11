import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function ProtectedLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8080/api/user/me", {
      headers: { Authorization: "Bearer " + token }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });

  }, [navigate]); // FIXED WARNING

  if (loading) {
    return (
      <div className="text-white p-10">Loading dashboard...</div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0b021f] text-white">
      <Sidebar userName={user?.name} />
      <div className="flex-1 overflow-y-auto p-6 text-white">
        <Outlet />
      </div>
    </div>
  );
}
