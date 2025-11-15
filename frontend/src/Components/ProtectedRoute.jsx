import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useUser();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
