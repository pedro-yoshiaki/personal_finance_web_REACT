import React from 'react';
import './Resumo.css';

function Resumo({ transacoes }) {

  // ==========================================
  // CÁLCULOS DE RESUMO FINANCEIRO
  // ==========================================

  const totalReceitas = transacoes
    .filter(t => t.tipo === "receita")
    .reduce((acc, t) => acc + t.valor, 0);

  const totalDespesas = transacoes
    .filter(t => t.tipo === "despesa")
    .reduce((acc, t) => acc + t.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  return (
    <section className="resumo-section">
      <h2>Resumo</h2>
      <div className="resumo-cards">
        <div className="resumo-card receita">
          <span className="resumo-label">Receitas</span>
          <span className="resumo-valor">R$ {totalReceitas.toFixed(2)}</span>
        </div>
        <div className="resumo-card despesa">
          <span className="resumo-label">Despesas</span>
          <span className="resumo-valor">R$ {totalDespesas.toFixed(2)}</span>
        </div>
        <div className={`resumo-card saldo ${saldo >= 0 ? "positivo" : "negativo"}`}>
          <span className="resumo-label">Saldo</span>
          <span className="resumo-valor">R$ {saldo.toFixed(2)}</span>
        </div>
      </div>
    </section>
  );
}

export default Resumo;
