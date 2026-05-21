import React from 'react';
import './List.css';

function List({ transacoes, iniciarEdicao, removerTransacao }) {
  
  // Criamos uma cópia da lista e ordenamos pela data (da mais recente para a mais antiga)
  const transacoesOrdenadas = [...transacoes].sort((a, b) => {
    // Proteção: se alguma transação antiga não tiver data, jogamos ela para o final da lista
    if (!a.data) return 1;
    if (!b.data) return -1;
    
    // Subtrair a data 'a' da data 'b' cria uma ordem decrescente (mais novas no topo)
    return new Date(b.data) - new Date(a.data);
  });

  return (
    <section className="list-section">
      <h2>Movimentações</h2>
      {transacoesOrdenadas.length === 0 ? (
          <p>Nenhuma transação cadastrada.</p>
      ) : (
          <ul className="transaction-list">
          
            {transacoesOrdenadas.map((transacao) => (
                <li key={transacao.id} className={`transaction-item ${transacao.tipo}`}>
                  <div className="transaction-info">
                    <strong>{transacao.descricao}</strong>
                    <span className="categoria-badge">{transacao.categoria}</span>
                    
                    {/* Exibindo a data formatada no padrão DD/MM/YYYY */}
                    {transacao.data && (
                      <span style={{ fontSize: '12px', color: '#7f8c8d', display: 'block', marginTop: '5px' }}>
                       {transacao.data.split('-').reverse().join('/')}
                      </span>
                    )}
                    
                  </div>
                  <div className="transaction-actions">
                    <span className="valor">
                      {/* Garantindo que o valor seja tratado como número antes de usar toFixed */}
                      R$ {Number(transacao.valor).toFixed(2)}
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
  );
}

export default List;