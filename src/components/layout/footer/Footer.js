import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <p className="footer-project">Projeto Dinâmica para Web &mdash; Feito em Dupla</p>
      <p className="footer-copy">&copy; {new Date().getFullYear()} Matheus Nascimento &amp; Pedro Nohara</p>
    </footer>
  );
}

export default Footer;