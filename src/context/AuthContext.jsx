import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider Component to wrap around the app and provide context values
export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Function to handle user login
  const login = (email, token) => {
    setUserEmail(email);
    setToken(token);
    localStorage.setItem("token", token);
  };

  // Function to handle user logout
  const logout = () => {
    setUserEmail(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // In a real app, you would verify the token here and get user data
      setUserEmail("example@example.com"); // Dummy email for demonstration
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userEmail, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
