import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    // Redirect to home page with return URL
    return <Navigate to="/" state={{ from: location, requireAuth: true }} replace />;
  }

  return <>{children}</>;
}
