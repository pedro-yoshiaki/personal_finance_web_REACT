import React from 'react';
import './List.css';

function List({ transacoes, iniciarEdicao, removerTransacao }) {
  return (
    <section className="list-section">
          <h2>Movimentações</h2>
          {transacoes.length === 0 ? (
              <p>Nenhuma transação cadastrada.</p>
          ) : (
              <ul className="transaction-list">
                {transacoes.map((transacao) => (
                    <li key={transacao.id} className={`transaction-item ${transacao.tipo}`}>
                      <div className="transaction-info">
                        <strong>{transacao.descricao}</strong>
                        <span className="categoria-badge">{transacao.categoria}</span>
                      </div>
                      <div className="transaction-actions">
                  <span className="valor">
                    R$ {transacao.valor.toFixed(2)}
                  </span>
                        <button onClick={() => iniciarEdicao(transacao)} className="btn-editar">
                          Editar
                        </button>
                        <button onClick={() => removerTransacao(transacao.id)} className="btn-excluir">
                          Excluir
                        </button>
                      </div>
                    </li>
                ))}
              </ul>
          )}
        </section>
  )
};

export default List;