import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { loginUser as loginApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const navigate = useNavigate();

  useEffect(() => {
    // On initial load, check for a token in local storage
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser({
            name: decodedUser.name,
            role: decodedUser.role,
            userId: decodedUser.userId
        });
      } catch (error) {
        // If token is invalid, clear it
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await loginApi(credentials);
      if (response.data.success) {
        const { accessToken } = response.data;
        localStorage.setItem('token', accessToken);
        setToken(accessToken);
        
        const decodedUser = jwtDecode(accessToken);
        setUser({
            name: decodedUser.name,
            role: decodedUser.role,
            userId: decodedUser.userId
        });

        // Redirect based on role
        if (decodedUser.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      }
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const authContextValue = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
