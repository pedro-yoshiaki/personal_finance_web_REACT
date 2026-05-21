import React, { useEffect, useState } from 'react';
import './Header.css';

function Header() {
  const [dataAtual, setDataAtual] = useState('');

  useEffect(() => {
    const d = new Date();
    const opts = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const formatted = d.toLocaleDateString('pt-BR', opts);
    setDataAtual(formatted.charAt(0).toUpperCase() + formatted.slice(1));
  }, []);

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="header-logo">
          <span className="header-logo-icon">$</span>
        </div>
        <div className="header-brand">
          <span className="header-brand-name">Personal Finance</span>
          <span className="header-brand-title">Controle Financeiro</span>
        </div>
      </div>
      <div className="header-date">
        <span className="header-date-label">📅</span>
        <span className="header-date-text">{dataAtual}</span>
      </div>
    </header>
  );
}

export default Header;