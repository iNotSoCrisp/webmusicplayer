import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaStream, FaEnvelope } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="home-grid">
        <Link to="/search" className="home-card">
          <FaSearch className="icon" />
          <h2>Search</h2>
          <p>Discover your next favorite lofi track</p>
        </Link>

        <Link to="/stream" className="home-card">
          <FaStream className="icon" />
          <h2>Stream</h2>
          <p>Listen to the latest lofi releases</p>
        </Link>

        <Link to="/contact" className="home-card">
          <FaEnvelope className="icon" />
          <h2>Contact</h2>
          <p>Get in touch with us</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;