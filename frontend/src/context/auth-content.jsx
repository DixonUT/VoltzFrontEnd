// AuthContext.js

import { createContext, useContext, useState } from "react";
import { AuthService } from "../services/auth";
import { toast } from "react-toastify";
import React from "react";

const AuthContext = createContext();
const serverhost = import.meta.env.VITE_SERVERHOST;

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated()
  );

  const login = async (username, password) => {
    try {
      await AuthService.login(username, password);
      setIsAuthenticated(true);
      toast("Login success!", { type: "success" });
    } catch (error) {
      console.error("Error during login:", error);

      toast(error.toString(), { type: "error" });
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  const register = async (firstName, lastName, username, password) => {
    try {
      await AuthService.register(firstName, lastName, username, password);
      setIsAuthenticated(true);

      toast("Registration Success!", { type: "success" });
    } catch (error) {
      console.error("Error during registration:", error);

      toast(error.toString(), { type: "error" });
      throw error;
    }
  };
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${serverhost}/api/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const userProfile = await response.json();
        setUser(userProfile);
      } else {
        console.error("Failed to fetch user profile after authentication");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const authContextValue = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
