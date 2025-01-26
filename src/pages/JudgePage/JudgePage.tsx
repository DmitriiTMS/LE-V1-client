import { Navigate } from "react-router-dom";
import { useProfile } from "../../queryApi/users/UseProfile";

export const JudgePage = () => {
  const { role, auth } = useProfile();

  if (role !== "JUDGE" && !auth) {
    return <Navigate to="/" replace />;
  }

  return <h1>JidgePage</h1>;
};
