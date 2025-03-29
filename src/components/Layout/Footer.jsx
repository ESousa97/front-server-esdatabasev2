import React from 'react';

function Footer() {
  return (
    <footer style={{ background: '#282c34', color: '#fff', padding: '1rem', textAlign: 'center' }}>
      <p>&copy; {new Date().getFullYear()} Projmanage</p>
    </footer>
  );
}

export default Footer;
