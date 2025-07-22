import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

/**
 * Only allows navigation for admin@gmail.com.
 * Redirects everyone else to home (/).
 */
export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;                       // or a spinner component
  if (!user || user.email !== "admin@gmail.com")  // admin check
    return <Navigate to="/" replace />;

  return children;
}
