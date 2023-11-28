import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-content";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const navigateToForm = () => {
    if (isAuthenticated) {
      logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <header>
      Voltz
      <button onClick={navigateToForm} className="sign-in-btn">
        {isAuthenticated ? "Sign Out" : "Sign In"}
      </button>
    </header>
  );
}
