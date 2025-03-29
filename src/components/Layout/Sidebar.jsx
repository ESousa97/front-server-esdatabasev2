// Exemplo de Sidebar aprimorada
import React from 'react';
import { FaTachometerAlt, FaDatabase } from 'react-icons/fa';

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '1rem' }}>
          <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>
            <FaTachometerAlt /> Dashboard
          </a>
        </li>
        <li>
          <a href="/db" style={{ color: '#fff', textDecoration: 'none' }}>
            <FaDatabase /> Editor de DB
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
