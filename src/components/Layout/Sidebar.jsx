import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaDatabase, FaBars } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <button 
          onClick={toggleSidebar} 
          className="sidebar-toggle" 
          aria-label="Alternar menu lateral"
        >
          <FaBars />
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
            >
              <FaTachometerAlt className="sidebar-icon" />
              {isOpen && <span className="sidebar-text">Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/db" 
              className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
            >
              <FaDatabase className="sidebar-icon" />
              {isOpen && <span className="sidebar-text">Editor de DB</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
