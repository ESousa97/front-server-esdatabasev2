// src/components/Layout/Footer.jsx
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Projmanage</p>
    </footer>
  );
}

export default Footer;
