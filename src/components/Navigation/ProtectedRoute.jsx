import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children, redirectTo = "/" }) => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to={redirectTo} /> : children;
};

export default ProtectedRoute;
