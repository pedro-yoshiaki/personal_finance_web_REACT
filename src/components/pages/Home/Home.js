import React, { useState, useEffect } from 'react';
import './Home.css';

// URL da nossa API Fake baseada no db.json
const URL = "http://localhost:3001/transacoes";

function Home() {
  // Estado para armazenar a lista de transações vinda do banco
  const [transacoes, setTransacoes] = useState([]);
  
  // Estado para controlar os dados digitados no formulário
  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    tipo: "despesa",
    categoria: ""
  });

  // ==========================================
  // OPERAÇÃO GET (Listar Dados)
  // ==========================================
  async function carregarTransacoes() {
    try {
      const resposta = await fetch(URL);
      const dados = await resposta.json();
      setTransacoes(dados);
    } catch (erro) {
      console.error("Erro ao buscar dados:", erro);
    }
  }

  // Executa o GET automaticamente ao abrir a página
  useEffect(() => {
    carregarTransacoes();
  }, []);

  // ==========================================
  // OPERAÇÃO POST (Cadastrar Dados)
  // ==========================================
  async function adicionarTransacao(e) {
    e.preventDefault(); // Evita que a página recarregue ao enviar o formulário
    
    try {
      await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          valor: parseFloat(form.valor) // Garante que o valor seja salvo como número
        })
      });
      
      // Limpa o formulário após o cadastro
      setForm({ descricao: "", valor: "", tipo: "despesa", categoria: "" });
      
      // Recarrega a lista para mostrar o novo item
      carregarTransacoes();
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
    }
  }

  // ==========================================
  // OPERAÇÃO DELETE (Excluir Dados)
  // ==========================================
  async function removerTransacao(id) {
    try {
      await fetch(`${URL}/${id}`, {
        method: "DELETE"
      });
      // Recarrega a lista para remover o item da tela
      carregarTransacoes();
    } catch (erro) {
      console.error("Erro ao deletar:", erro);
    }
  }

  // Função para atualizar o estado do formulário conforme o usuário digita
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="home-container">
      <section className="form-section">
        <h2>Nova Transação</h2>
        <form onSubmit={adicionarTransacao} className="transaction-form">
          <input
            type="text"
            name="descricao"
            placeholder="Descrição (ex: Supermercado)"
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
            placeholder="Categoria (ex: Alimentação)"
            value={form.categoria}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-salvar">Salvar Transação</button>
        </form>
      </section>

      <section className="list-section">
        <h2>Minhas Movimentações</h2>
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
                  <button 
                    onClick={() => removerTransacao(transacao.id)} 
                    className="btn-excluir"
                  >
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