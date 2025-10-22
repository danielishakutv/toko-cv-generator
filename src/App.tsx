import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toaster } from './components/ui/toaster';
import { Landing } from './pages/Landing';
import { Templates } from './pages/Templates';
import { Builder } from './pages/Builder';
import { Result } from './pages/Result';
import { Profile } from './pages/Profile';
import { Dashboard } from './pages/Dashboard';
import { useAuthStore } from './stores/auth';
import { getAccessToken } from './lib/api';

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    // Initialize auth on app load if token exists
    const token = getAccessToken();
    if (token) {
      initializeAuth().catch((error) => {
        console.error('Failed to initialize auth:', error);
      });
    }
  }, [initializeAuth]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/builder/:templateId" element={<Builder />} />
            <Route path="/result/:docId" element={<Result />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
