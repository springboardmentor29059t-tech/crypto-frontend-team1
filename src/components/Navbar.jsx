import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black/40 backdrop-blur-md">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Crypto Tracker
      </h1>

      <div className="flex gap-6 items-center">
        {user && (
          <>
            <Link to="/dashboard" className="hover:text-blue-400">
              Dashboard
            </Link>
            <Link to="/coins" className="hover:text-blue-400">
              Coins
            </Link>
            <Link to="/watchlist" className="hover:text-blue-400">
              Watchlist
            </Link>
          </>
        )}

        {!user ? (
          <>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-300">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
