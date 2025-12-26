// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const success = login(email, password);

//     if (!success) {
//       alert("Invalid credentials. Please signup first.");
//     } else {
//       navigate("/dashboard");
//     }
//     localStorage.setItem("isLoggedIn", "true");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white/10 backdrop-blur-lg p-8 rounded-xl w-96 shadow-xl"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-3 mb-4 rounded bg-black/40 outline-none"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-3 mb-6 rounded bg-black/40 outline-none"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700 transition">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(email, password);

    if (!success) {
      alert("Invalid credentials. Please signup first.");
    } else {
      // ✅ SET LOGIN FLAG ONLY ON SUCCESS
      localStorage.setItem("isLoggedIn", "true");

      // ✅ REDIRECT TO DASHBOARD
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-xl w-96 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-black/40 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-black/40 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700 transition">
          Login
        </button>
      </form>
    </div>
  );
}

