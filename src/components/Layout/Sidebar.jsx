// src/components/Layout/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaDatabase } from 'react-icons/fa';

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '1rem' }}>
          <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/db" style={{ color: '#fff', textDecoration: 'none' }}>
            <FaDatabase /> Editor de DB
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
