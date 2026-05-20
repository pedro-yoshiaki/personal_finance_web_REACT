import React from 'react';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import Home from './components/pages/Home/Home';

import './App.css';

function App() {
  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Cabeçalho */}
      <Header />
      
      {/* 2. Conteúdo Principal (A página inteira do CRUD) */}
      <div style={{ flex: 1 }}>
        <Home />
      </div>
      
      {/* 3. Rodapé */}
      <Footer />
      
    </div>
  );
}

export default App;