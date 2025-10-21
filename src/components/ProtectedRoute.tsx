import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, setRedirectTo } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      // Store the intended path for after authentication
      setRedirectTo(location.pathname);
    }
  }, [user, location.pathname, setRedirectTo]);

  if (!user) {
    // Redirect to home page
    return <Navigate to="/" state={{ from: location, requireAuth: true }} replace />;
  }

  return <>{children}</>;
}
