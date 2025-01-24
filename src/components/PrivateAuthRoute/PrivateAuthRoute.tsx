import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

export const PrivateAuthRoute = ({ children }: { children: ReactNode }) => {
  const token = ApiService.getToken();

  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};
