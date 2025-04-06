import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar-drawer ${isOpen ? 'open' : ''}`}>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
            >
              <FaTachometerAlt className="sidebar-icon" />
              <span className="sidebar-text">Dashboard</span>
            </NavLink>
          </li>
          {/* Outras rotas */}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
