import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const signup = (email, password) => {
    localStorage.setItem("credentials", JSON.stringify({ email, password }));
    return true;
  };

  const login = (email, password) => {
    const stored = JSON.parse(localStorage.getItem("credentials"));

    if (!stored) return false;
    if (stored.email === email && stored.password === password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);