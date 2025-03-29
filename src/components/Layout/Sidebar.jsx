import React from 'react';

function Sidebar() {
  return (
    <aside style={{ width: '200px', background: '#f4f4f4', padding: '1rem' }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><a href="/">Dashboard</a></li>
        {/* Adicione links conforme necessário */}
      </ul>
    </aside>
  );
}

export default Sidebar;
