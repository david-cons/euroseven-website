import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: any;
  roleName: string; 
}

export const ProtectedRoute: React.FC<PrivateRouteProps> = ({
  children,
  roleName
}) => {

  const role = useSelector((state: any) => state.authentication.role);


  if (role !== roleName) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

