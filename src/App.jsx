import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import StreamPage from './pages/StreamPage'
import ContactPage from './pages/ContactPage'
import LandingPage from './pages/LandingPage'
import { MusicProvider } from './context/MusicContext'
import { FaHome, FaSearch, FaStream, FaEnvelope, FaArrowLeft } from 'react-icons/fa'
import './App.css'

function MobileBackButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(26, 27, 31, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease'
      }}
    >
      <FaArrowLeft size={18} />
    </button>
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  useEffect(() => {
    document.title = 'BeatProbe - Music Experience'
  }, [])


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

          <Route path="/" element={<LandingPage />} />


          <Route path="/app/*" element={
            <div className="app-container">
              {isMobile && <MobileBackButton />}
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

                  <Route path="/" element={<Navigate to="/app/home" replace />} />
                </Routes>
              </div>
              <Player />
            </div>
          } />


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
