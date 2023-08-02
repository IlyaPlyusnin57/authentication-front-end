import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { userInfo } = useAuth();

  return userInfo.authed ? children : <Navigate to="/" />;
}

export default RequireAuth;
