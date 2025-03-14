import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location=useLocation()
  if (loading) {
    return  <span className="loading loading-ring loading-xl"></span>
  }

  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={location?.pathname}></Navigate>
};

export default PrivateRoute;
