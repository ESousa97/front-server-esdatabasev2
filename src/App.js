// src/App.js
import React from 'react';
import Projects from './Projects';
import CardList from './CardList';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Minha Aplicação CRUD</h1>
      <Projects />
      <CardList />
    </div>
  );
}

export default App;
