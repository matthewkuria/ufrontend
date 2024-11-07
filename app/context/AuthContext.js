// context/AuthContext.js
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // State to hold the user data
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const checkAuth = async () => {
    const token = Cookies.get("access_token");
    setIsAuthenticated(!!token);
    // Add user details if needed
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/api/accounts/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.access) {
        Cookies.set("access_token", data.access, { path: "/" });
        setIsAuthenticated(true);
        router.push("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Signup function
  const signup = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/accounts/register/', formData, {
        withCredentials: true, // Enable cookies for authentication
      });
      setUser(response.data.user); // Set user data after successful signup
      router.push('/login'); // Redirect to login after signup
    } catch (error) {
      throw new Error(error.response ? error.response.data : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("access_token", { path: "/" });
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
