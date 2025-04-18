import { useState } from 'react';
import { FaHome, FaSearch, FaStream, FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <div className="logo" onClick={toggleSidebar}>
        <FaStream size={24} />
        <span>Musicify</span>
        <div className="mobile-toggle">
          {isExpanded ? <FaTimes size={20} /> : <FaBars size={20} />}
        </div>
      </div>

      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => setIsExpanded(false)}
        >
          <FaHome size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => setIsExpanded(false)}
        >
          <FaSearch size={20} />
          <span>Search</span>
        </NavLink>

        <NavLink
          to="/stream"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          onClick={() => setIsExpanded(false)}
        >
          <FaStream size={20} />
          <span>Stream</span>
        </NavLink>
      </nav>

      <style jsx="true">{`
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