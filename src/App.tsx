import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
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
