import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaStream, FaEnvelope } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <h1 className="home-title">Welcome to BeatProbe</h1>
          <p className="home-subtitle"></p>
        </div>

        <section className="featured-section">
          <h2 className="section-title">Quick Access</h2>
          <div className="featured-grid">
            <Link to="/app/search" className="featured-card">
              <div className="featured-content">
                <FaSearch size={30} style={{ marginBottom: '1rem', color: '#0066FF' }} />
                <h3 className="featured-title">Search</h3>
                <p className="featured-description">
                  Search for any song on spotify
                </p>
                <button className="featured-button">
                  Explore Now
                </button>
              </div>
            </Link>

            <Link to="/app/stream" className="featured-card">
              <div className="featured-content">
                <FaStream size={30} style={{ marginBottom: '1rem', color: '#9933FF' }} />
                <h3 className="featured-title">Stream</h3>
                <p className="featured-description">
                  Listen to my curated list
                </p>
                <button className="featured-button">
                  Start Listening
                </button>
              </div>
            </Link>

            <Link to="/app/contact" className="featured-card">
              <div className="featured-content">
                <FaEnvelope size={30} style={{ marginBottom: '1rem', color: '#FF3366' }} />
                <h3 className="featured-title">Contact</h3>
                <p className="featured-description">
                  Please check this page for more information
                </p>
                <button className="featured-button">
                  Reach Out
                </button>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;