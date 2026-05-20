import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import './Graficos.css';

// Cores usadas nos gráficos
const COR_RECEITA = "#27ae60";
const COR_DESPESA = "#e74c3c";

// Estilo reutilizado no Tooltip de ambos os gráficos
const tooltipStyle = {
  contentStyle: {
    background: "#ffffff",
    border: "1px solid #ecf0f1",
    borderRadius: "6px",
    fontSize: "12px"
  },
  labelStyle: { color: "#2c3e50" },
  itemStyle: { color: "#34495e" }
};

function Graficos({ transacoes }) {

  // ==========================================
  // PREPARAÇÃO DOS DADOS PARA OS GRÁFICOS
  // ==========================================

  // Agrupa por categoria somando receitas e despesas de cada uma
  const dadosBarras = Object.values(
      transacoes.reduce((acc, t) => {
        if (!acc[t.categoria]) acc[t.categoria] = { categoria: t.categoria, receita: 0, despesa: 0 };
        acc[t.categoria][t.tipo] += t.valor;
        return acc;
      }, {})
  );

  // Totais para o gráfico de pizza
  const totalReceitas = transacoes
      .filter(t => t.tipo === "receita")
      .reduce((acc, t) => acc + t.valor, 0);

  const totalDespesas = transacoes
      .filter(t => t.tipo === "despesa")
      .reduce((acc, t) => acc + t.valor, 0);

  const dadosPizza = [
    { name: "Receita", value: totalReceitas },
    { name: "Despesa", value: totalDespesas }
  ];

  // Não renderiza nada se não houver transações
  if (transacoes.length === 0) return null;

  return (
      <section className="graficos-section">
        <h2>Gráficos</h2>
        <div className="graficos-grid">

          {/* Gráfico de Barras: receitas e despesas por categoria */}
          <div className="grafico-box">
            <h3>Por Categoria</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dadosBarras} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <XAxis dataKey="categoria" tick={{ fontSize: 12, fill: "#888" }} />
                <YAxis tick={{ fontSize: 12, fill: "#888" }} />
                <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} {...tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: "12px", color: "#888" }} />
                <Bar dataKey="receita" name="Receita" fill={COR_RECEITA} radius={[3, 3, 0, 0]} />
                <Bar dataKey="despesa" name="Despesa" fill={COR_DESPESA} radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Pizza: proporção receita vs despesa */}
          <div className="grafico-box">
            <h3>Proporção Geral</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                    data={dadosPizza}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                >
                  <Cell fill={COR_RECEITA} />
                  <Cell fill={COR_DESPESA} />
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} {...tooltipStyle} />
                <Legend
                    formatter={(value, entry) => {
                      const total = dadosPizza.reduce((acc, d) => acc + d.value, 0);
                      const percent = total > 0 ? ((entry.payload.value / total) * 100).toFixed(0) : 0;
                      return `${value} ${percent}%`;
                    }}
                    wrapperStyle={{ fontSize: "12px", color: "#7f8c8d" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>
      </section>
  );
}

export default Graficos;