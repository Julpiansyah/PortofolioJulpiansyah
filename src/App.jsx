import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Atmosphere from './components/layout/Atmosphere';
import PageTransition from './components/layout/PageTransition';
import Home from './pages/Home';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
              <Footer />
            </PageTransition>
          }
        />
        {/* Tautan lama diarahkan ke section di halaman utama */}
        <Route path="/certificates" element={<Navigate to="/#certificates" replace />} />
        <Route path="/projects" element={<Navigate to="/#work" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <Atmosphere />
        <Navbar />
        <AnimatedRoutes />
      </Router>
    </MotionConfig>
  );
}
