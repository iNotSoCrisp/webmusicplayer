import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import StreamPage from './pages/StreamPage'
import { MusicProvider } from './context/MusicContext'
import './App.css'

function App() {
  // Set document title
  useEffect(() => {
    document.title = 'Musicify - Web Player'
  }, [])

  return (
    <Router>
      <MusicProvider>
        <div className="app-container">
          <Sidebar />
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
