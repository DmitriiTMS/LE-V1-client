import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useProfile } from "../../queryApi/users/UseProfile";

export const PrivateAuthRoute = ({ children }: { children: ReactNode }) => {
  const { auth } = useProfile();

  if (auth) {
    return <Navigate to="/" replace />;
  }
  return children;
};
