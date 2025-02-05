import React, { createContext, useState, useEffect } from "react";
import authService from "../services/Authservice";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null; // ✅ Persist user on refresh
  });
  const [loading, setLoading] = useState(true); // ✅ Prevent UI flickering before auth check

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/profile", { withCredentials: true }) // ✅ Ensures cookies are sent
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .finally(() => {
        setLoading(false); // ✅ Stop loading after auth check
      });
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true }); // ✅ Ensure backend clears cookies
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setUser(null);
    localStorage.removeItem("user");
  };

  if (loading) {
    return <div>Loading...</div>; // ✅ Prevents showing incorrect UI before auth check completes
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
