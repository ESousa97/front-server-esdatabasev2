// src/components/Layout/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaDatabase, FaBars } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </button>
      <ul>
        <li>
          <Link to="/dashboard">
            <FaTachometerAlt /><span> Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/db">
            <FaDatabase /><span> Editor de DB</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
