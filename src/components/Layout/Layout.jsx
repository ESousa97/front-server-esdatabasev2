import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="layout">
      {/* Header fixo no topo, em largura total */}
      <Header onLogout={onLogout} toggleSidebar={toggleSidebar} />

      {/* Sidebar que fica logo abaixo do Header (sobrepondo a área de conteúdo) */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Overlay para escurecer o conteúdo quando a sidebar está aberta */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar} />}

      {/* Área principal de conteúdo, deslocada para baixo do Header */}
      <div className={`content-wrapper ${isSidebarOpen ? 'blur' : ''}`}>
        <main className="layout-main">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
