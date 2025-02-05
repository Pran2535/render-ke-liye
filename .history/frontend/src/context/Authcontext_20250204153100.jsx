import React, { createContext, useState, useEffect } from "react";
import authService from "../services/Authservice";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Set up axios interceptor for authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (userData, token) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};