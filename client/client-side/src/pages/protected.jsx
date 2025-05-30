import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect, useRef } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated, loading, silentCheckAuth } = useAuthStore();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
