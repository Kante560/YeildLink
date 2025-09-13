import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import { useEffect, useState } from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage immediately
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        if (userData.token) {
          // User has valid token, allow access
          setIsCheckingAuth(false);
          return;
        }
      } catch (error) {
        // Invalid JSON, clear it
        localStorage.removeItem("authUser");
      }
    }
    // No valid user data found
    setIsCheckingAuth(false);
  }, []);

  // Show loading while checking auth
  if (isCheckingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user after checking, redirect to login
  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return children;
}
