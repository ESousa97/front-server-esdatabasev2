import React from 'react';

function Header({ onLogout }) {
  return (
    <header style={{ background: '#282c34', color: '#fff', padding: '1rem' }}>
      <h1>Projmanage</h1>
      <nav>
        <button onClick={onLogout} style={{ marginLeft: '1rem' }}>Logout</button>
      </nav>
    </header>
  );
}

export default Header;
