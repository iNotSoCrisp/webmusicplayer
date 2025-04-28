import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import StreamPage from './pages/StreamPage'
import ContactPage from './pages/ContactPage'
import LandingPage from './pages/LandingPage'
import { MusicProvider } from './context/MusicContext'
import { FaHome, FaSearch, FaStream, FaEnvelope } from 'react-icons/fa'
import './App.css'

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Set document title
  useEffect(() => {
    document.title = 'BeatProbe - Music Experience'
  }, [])

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <MusicProvider>
        <Routes>
          {/* Make landing page the default route */}
          <Route path="/" element={<LandingPage />} />

          {/* Nested routes for the app's main layout */}
          <Route path="/app/*" element={
            <div className="app-container">
              <Sidebar />

              {isMobile && (
                <div className="mobile-nav">
                  <NavLink to="/app/home" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
                    <FaHome size={22} />
                  </NavLink>
                  <NavLink to="/app/search" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
                    <FaSearch size={22} />
                  </NavLink>
                  <NavLink to="/app/stream" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
                    <FaStream size={22} />
                  </NavLink>
                  <NavLink to="/app/contact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
                    <FaEnvelope size={22} />
                  </NavLink>
                </div>
              )}

              <div className="main-content">
                <Routes>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/stream" element={<StreamPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  {/* Redirect /app to /app/home */}
                  <Route path="/" element={<Navigate to="/app/home" replace />} />
                </Routes>
              </div>
              <Player />
            </div>
          } />

          {/* Redirect old routes to new structure */}
          <Route path="/landing" element={<Navigate to="/" replace />} />
          <Route path="/home" element={<Navigate to="/app/home" replace />} />
          <Route path="/search" element={<Navigate to="/app/search" replace />} />
          <Route path="/stream" element={<Navigate to="/app/stream" replace />} />
          <Route path="/contact" element={<Navigate to="/app/contact" replace />} />
        </Routes>
      </MusicProvider>
    </Router>
  )
}

export default App
