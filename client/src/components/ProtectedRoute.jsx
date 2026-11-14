
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

  return isAdminLoggedIn === "true"
    ? <Outlet />
    : <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;
