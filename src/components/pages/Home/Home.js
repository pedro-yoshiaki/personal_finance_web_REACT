import React, { useState, useEffect } from 'react';
import './Home.css';
import Resumo from './Resumo/Resumo.js';
import Graficos from './Graficos/Graficos.js';

const URL = "http://localhost:3001/transacoes";

function Home() {
  const [transacoes, setTransacoes] = useState([]);
  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    tipo: "despesa",
    categoria: ""
  });
  const [editandoId, setEditandoId] = useState(null);

  async function carregarTransacoes() {
    try {
      const resposta = await fetch(URL);
      const dados = await resposta.json();
      setTransacoes(dados);
    } catch (erro) {
      console.error("Erro ao buscar dados:", erro);
    }
  }

  useEffect(() => {
    carregarTransacoes();
  }, []);

  // ==========================================
  // OPERAÇÃO POST (Cadastrar Dados)
  // OPERAÇÃO PUT (Atualizar Dados)
  // ==========================================
  async function salvarTransacao(e) {
    e.preventDefault();
    const dados = { ...form, valor: parseFloat(form.valor) };

    try {
      if (editandoId !== null) {
        // Se há um ID em edição, atualiza o registro existente
        await fetch(`${URL}/${editandoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editandoId, ...dados })
        });
        setEditandoId(null);
      } else {
        // Caso contrário, cadastra uma nova transação
        await fetch(URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados)
        });
      }

      // Limpa o formulário após salvar
      setForm({ descricao: "", valor: "", tipo: "despesa", categoria: "" });

      // Recarrega a lista para refletir as mudanças
      carregarTransacoes();
    } catch (erro) {
      console.error("Erro ao salvar:", erro);
    }
  }

  // Preenche o formulário com os dados da transação selecionada para edição
  function iniciarEdicao(transacao) {
    setEditandoId(transacao.id);
    setForm({
      descricao: transacao.descricao,
      valor: transacao.valor,
      tipo: transacao.tipo,
      categoria: transacao.categoria
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Cancela a edição e restaura o formulário ao estado inicial
  function cancelarEdicao() {
    setEditandoId(null);
    setForm({ descricao: "", valor: "", tipo: "despesa", categoria: "" });
  }

  async function removerTransacao(id) {
    try {
      await fetch(`${URL}/${id}`, { method: "DELETE" });
      carregarTransacoes();
    } catch (erro) {
      console.error("Erro ao deletar:", erro);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
      <main className="home-container">
        <section className="form-section">
          <h2>{editandoId !== null ? "Editar Transação" : "Nova Transação"}</h2>
          <form onSubmit={salvarTransacao} className="transaction-form">
            <input
                type="text"
                name="descricao"
                placeholder="Descrição"
                value={form.descricao}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="valor"
                placeholder="Valor (R$)"
                step="0.01"
                value={form.valor}
                onChange={handleChange}
                required
            />
            <select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="despesa">Despesa</option>
              <option value="receita">Receita</option>
            </select>
            <input
                type="text"
                name="categoria"
                placeholder="Categoria"
                value={form.categoria}
                onChange={handleChange}
                required
            />
            <button type="submit" className="btn-salvar">
              {editandoId !== null ? "Atualizar Transação" : "Salvar Transação"}
            </button>
            {editandoId !== null && (
                <button type="button" className="btn-cancelar" onClick={cancelarEdicao}>
                  Cancelar
                </button>
            )}
          </form>
        </section>

        {/* Resumo financeiro: receitas, despesas e saldo */}
        <Resumo transacoes={transacoes} />

        {/* Gráficos de barras e pizza */}
        <Graficos transacoes={transacoes} />

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
      </main>
  );
}

export default Home;