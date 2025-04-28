import { useState, useEffect } from 'react';
import { FaHome, FaSearch, FaStream, FaBars, FaTimes, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const isMobile = window.innerWidth <= 768;

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
    }
  }, [location, isMobile]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar && !sidebar.contains(event.target) && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded, isMobile]);

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <div className="logo" onClick={toggleSidebar}>
        <FaStream size={24} />
        <span>BeatProbe</span>
        <div className="mobile-toggle">
          {isExpanded ? <FaTimes size={20} /> : <FaBars size={20} />}
        </div>
      </div>

      <NavLink
        to="/"
        className="landing-link"
        onClick={() => setIsExpanded(false)}
      >
        <FaArrowLeft size={18} />
        <span>Back to Landing</span>
      </NavLink>

      <nav className="main-nav">
        <NavLink
          to="/app/home"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => setIsExpanded(false)}
        >
          <FaHome size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/app/search"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => setIsExpanded(false)}
        >
          <FaSearch size={20} />
          <span>Search</span>
        </NavLink>

        <NavLink
          to="/app/stream"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => setIsExpanded(false)}
        >
          <FaStream size={20} />
          <span>Stream</span>
        </NavLink>

        <NavLink
          to="/app/contact"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => setIsExpanded(false)}
        >
          <FaEnvelope size={20} />
          <span>Contact</span>
        </NavLink>
      </nav>

      <style jsx="true">{`
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .logo {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
        }

        .landing-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.75rem 1.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
        }

        .landing-link:hover {
          color: var(--primary);
          background: rgba(230, 30, 37, 0.1);
          border-left-color: var(--primary);
        }

        .main-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.1);
          border-left-color: var(--primary);
        }

        .mobile-toggle {
          display: none;
          margin-left: auto;
        }

        @media screen and (max-width: 768px) {
          .mobile-toggle {
            display: block;
          }

          .logo {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}

export default Sidebar;