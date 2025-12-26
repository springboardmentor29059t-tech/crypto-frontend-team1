import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-700 to-blue-600 text-white">

      {/* LEFT SIDE */}
      <h1 className="text-xl font-bold">Crypto Tracker</h1>

      {/* CENTER */}
      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/coins">Coins</Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <Logout />   // ✅ TOP RIGHT
        ) : (
          <>
            <Link to="/login" className="px-4 py-1 border rounded">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-1 bg-purple-500 rounded">
              Sign Up
            </Link>
          </>
        )}
      </div>

    </div>
  );
};

export default Navbar;

