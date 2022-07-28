import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./useUser";

export const RouteAuth = () => {
  const user = useUser();

  return !user ? <Navigate to="/login" /> : <Outlet />;
};
