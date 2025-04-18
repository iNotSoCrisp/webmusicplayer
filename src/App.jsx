import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import StreamPage from './pages/StreamPage'
import { MusicProvider } from './context/MusicContext'
import { FaHome, FaSearch, FaStream } from 'react-icons/fa'
import './App.css'

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Set document title
  useEffect(() => {
    document.title = 'Musicify - Web Player'
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
        <div className="app-container">
          <Sidebar />

          {isMobile && (
            <div className="mobile-nav">
              <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
                <FaHome size={22} />
              </NavLink>
              <NavLink to="/search" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
                <FaSearch size={22} />
              </NavLink>
              <NavLink to="/stream" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>
                <FaStream size={22} />
              </NavLink>
            </div>
          )}

          <div className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/stream" element={<StreamPage />} />
            </Routes>
          </div>
          <Player />
        </div>
      </MusicProvider>
    </Router>
  )
}

export default App
