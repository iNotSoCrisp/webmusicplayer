import { FaSearch, FaStream } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page-container">
      <div className="page-header">
        <h1 className="page-title">Welcome to BeatProbe</h1>
        <p className="page-subtitle">Your modern music streaming platform</p>
      </div>

      <div className="feature-cards">
        <Link to="/search" style={{ textDecoration: 'none' }}>
          <div className="feature-card" style={{
            background: 'linear-gradient(135deg, var(--primary), #ff5f79)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            transition: 'all var(--transition-medium) ease',
            boxShadow: '0 8px 24px rgba(255, 0, 57, 0.2)'
          }}>
            <FaSearch size={50} className="feature-icon" />
            <h3 className="feature-title">Search</h3>
            <p className="feature-description">
              Find your favorite music on Spotify
            </p>
          </div>
        </Link>

        <Link to="/stream" style={{ textDecoration: 'none' }}>
          <div className="feature-card" style={{
            background: 'linear-gradient(135deg, #ff5f79, var(--accent))',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            transition: 'all var(--transition-medium) ease',
            boxShadow: '0 8px 24px rgba(255, 0, 57, 0.2)'
          }}>
            <FaStream size={50} className="feature-icon" />
            <h3 className="feature-title">Stream</h3>
            <p className="feature-description">
              Listen to our curated collection of music
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;