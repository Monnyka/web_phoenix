import { Navigate } from "react-router-dom";
import { hasAccessToken } from "../services/auth";

function ProtectedRoute({ children }) {
  return hasAccessToken() ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
