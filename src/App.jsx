import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Watchlist from "./pages/Watchlist";
import Coins from "./pages/Coins";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black text-white">
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}


// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";

// // TEMP: bring old pages back
// const Home = () => <div className="p-10 text-xl">Home Page</div>;
// const Dashboard = () => <div className="p-10 text-xl">Dashboard Page</div>;
// const Watchlist = () => <div className="p-10 text-xl">Watchlist Page</div>;
// const Coins = () => <div className="p-10 text-xl">Coins Page</div>;

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/watchlist" element={<Watchlist />} />
//         <Route path="/coins" element={<Coins />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


