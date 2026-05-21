import React, { useState, useEffect } from 'react';
import './Home.css';
import Resumo from './resumo/Resumo.js';
import Graficos from './graficos/Graficos.js';
import FiltroAno from './features/FiltroAno.js';
import Form from './features/Form.js';
import FiltroMeses from './features/FiltroMeses.js';
import List from './features/List.js';

const URL = "http://localhost:3001/transacoes";

function Home() {
  
// ============================================ ESTADOS ============================================
  const [transacoes, setTransacoes] = useState([]);

  const [mesesFiltro, setMesesFiltro] = useState([]);
  // O estado do ano (vazio = mostra todos os anos)
  const [anoFiltro, setAnoFiltro] = useState("");

  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    tipo: "despesa",
    categoria: "",
    data: ""
  });

  const [editandoId, setEditandoId] = useState(null);

// ======================================== LÓGICA DE FILTROS ========================================
  // Função que lida com o clique no checkbox
  const handleFiltroChange = (mes) => {
    if (mesesFiltro.includes(mes)) {
      // Se o mês já está na lista (desmarcando), nós o removemos
      setMesesFiltro(mesesFiltro.filter((m) => m !== mes));
    } else {
      // Se não está na lista (marcando), nós o adicionamos
      setMesesFiltro([...mesesFiltro, mes]);
    }
  };

  // Lógica para filtrar as transações
  const transacoesFiltradas = transacoes.filter((transacao) => {
    // Extraímos o ano (posição 0) e o mês (posição 1) da data "YYYY-MM-DD"
    const anoDaTransacao = transacao.data.split('-')[0]; 
    const mesDaTransacao = transacao.data.split('-')[1]; 
  
    // 1. Verificação do Ano: Passa se o filtro estiver vazio OU se o ano for igual ao selecionado
    const passouNoAno = anoFiltro === "" || anoDaTransacao === anoFiltro;
  
    // 2. Verificação do Mês: Passa se nenhum mês estiver marcado OU se o mês estiver na lista
    const passouNoMes = mesesFiltro.length === 0 || mesesFiltro.includes(mesDaTransacao);
  
    // A transação SÓ aparece na tela se passar nos DOIS testes
    return passouNoAno && passouNoMes;
  });

    // Função para limpar todos os filtros com um clique
    const limparFiltros = () => {
      setAnoFiltro("");    // Volta o ano para a opção "Todos os Anos"
      setMesesFiltro([]);  // Desmarca todos os checkboxes de meses
    };

// ======================================= REQUISIÇÕES DA API =======================================
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

    // ==========================================
    // 1. VALIDAÇÕES DO FORMULÁRIO
    // ==========================================
    
    // Extrai apenas o ano da data (formato YYYY-MM-DD) e converte para número
    const anoDigitado = parseInt(form.data.split('-')[0]);

    // Validação da Data: Impede anos absurdos
    if (anoDigitado < 2020 || anoDigitado > 3500) {
      alert("Por favor, insira um ano coerente (A partir de 2021).");
      return; // Interrompe a função aqui, impedindo que o código abaixo seja executado
    }

    // Validação do Valor: Impede que o usuário salve gastos com valor zero ou negativo
    if (parseFloat(form.valor) <= 0) {
      alert("O valor da transação deve ser maior que zero.");
      return; 
    }

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
      setForm({ descricao: "", valor: "", data: "", tipo: "despesa", categoria: "" });

      // Recarrega a lista para refletir as mudanças
      carregarTransacoes();
    } catch (erro) {
      console.error("Erro ao salvar:", erro);
    }
  }

  async function removerTransacao(id) {
    try {
      await fetch(`${URL}/${id}`, { method: "DELETE" });
      carregarTransacoes();
    } catch (erro) {
      console.error("Erro ao deletar:", erro);
    }
  }
// ==================================== CONTROLE DO FORMULÁRIO ====================================
  // Preenche o formulário com os dados da transação selecionada para edição
  function iniciarEdicao(transacao) {
    setEditandoId(transacao.id);
    setForm({
      descricao: transacao.descricao,
      valor: transacao.valor,
      data: transacao.data,
      tipo: transacao.tipo,
      categoria: transacao.categoria
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Cancela a edição e restaura o formulário ao estado inicial
  function cancelarEdicao() {
    setEditandoId(null);
    setForm({ descricao: "", valor: "", data: "", tipo: "despesa", categoria: "" });
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =================================== RENDERIZAÇÃO DA TELA ===================================
  return (
      <main className="home-container">

        {/* Passando anoFiltro e a função setAnoFiltro como props */}
        <FiltroAno anoFiltro={anoFiltro} setAnoFiltro={setAnoFiltro} />

        <Form 
          form={form} 
          editandoId={editandoId} 
          handleChange={handleChange} 
          salvarTransacao={salvarTransacao} 
          cancelarEdicao={cancelarEdicao} 
        />
        
        <FiltroMeses 
          mesesFiltro={mesesFiltro} 
          handleFiltroChange={handleFiltroChange} 
          limparFiltros={limparFiltros} 
        />

        {/* Resumo financeiro: receitas, despesas e saldo */}
        <Resumo transacoes={transacoesFiltradas} />

        {/* Gráficos de barras e pizza */}
        <Graficos transacoes={transacoesFiltradas} />

        <List 
          transacoes={transacoesFiltradas} 
          iniciarEdicao={iniciarEdicao} 
          removerTransacao={removerTransacao} 
        />

      </main>
  );
}

export default Home;