/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function AppLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isStandalonePage = location.pathname === '/admin' || location.pathname === '/admin/dashboard';

  // Log admin out if they navigate away from admin pages
  useEffect(() => {
    if (user && !location.pathname.startsWith('/admin')) {
      logout();
    }
  }, [location.pathname, user, logout]);

  return (
    <div className="min-h-screen flex flex-col bg-luxury-black text-white selection:bg-luxury-gold selection:text-luxury-black">
      {!isStandalonePage && <Navbar />}
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:id" element={<CollectionDetail />} />
          <Route path="/atelier" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/admin" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </main>
      {!isStandalonePage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}
