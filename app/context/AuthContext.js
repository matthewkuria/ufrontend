"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // State to hold the user data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || '/'; // Get the `next` query parameter for redirection


  
  const checkAuth = async () => {
    const token = Cookies.get("access_token");
    setIsAuthenticated(!!token);
    if (token) {
      // Optionally, retrieve user data (for example from a profile API endpoint)
      setUser({ accessToken: token });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

 // Login method
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:8000/api/accounts/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set('access_token', data.access, {
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        });
        Cookies.set('refresh_token', data.refresh, {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        });
        setUser({ accessToken: data.access });
        setSuccess('Login successful!');
        router.push(next); // Redirect to the `next` page after login
      } else {
        setError(data.detail || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  // Logout method
  const logout = () => {
    setUser(null);
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    router.push('/login'); // Redirect to login page after logout
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

 
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, signup, login, logout, error, success }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
