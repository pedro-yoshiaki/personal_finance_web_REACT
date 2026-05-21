import React from 'react';
import './FiltroMeses.css';

function FiltroMeses({ mesesFiltro, handleFiltroChange, limparFiltros }) {
  const mesesDoAno = [
    { num: "01", nome: "Janeiro" }, { num: "02", nome: "Fevereiro" },
    { num: "03", nome: "Março" }, { num: "04", nome: "Abril" },
    { num: "05", nome: "Maio" }, { num: "06", nome: "Junho" },
    { num: "07", nome: "Julho" }, { num: "08", nome: "Agosto" },
    { num: "09", nome: "Setembro" }, { num: "10", nome: "Outubro" },
    { num: "11", nome: "Novembro" }, { num: "12", nome: "Dezembro" }
  ];

  return (
    <div className="filtro-meses">
      <div className="filtro-meses-header">
        <span className="filtro-meses-label">Filtrar por Meses</span>
        <button className="filtro-meses-limpar" onClick={limparFiltros}>
          Limpar Filtros ✕
        </button>
      </div>

      <div className="filtro-meses-grid">
        {mesesDoAno.map((mes) => (
          <label
            key={mes.num}
            className={`filtro-mes-item ${mesesFiltro.includes(mes.num) ? 'ativo' : ''}`}
          >
            <input
              type="checkbox"
              checked={mesesFiltro.includes(mes.num)}
              onChange={() => handleFiltroChange(mes.num)}
            />
            {mes.nome}
          </label>
        ))}
      </div>
    </div>
  );
}

export default FiltroMeses;