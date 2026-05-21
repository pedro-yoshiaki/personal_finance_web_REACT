import React from 'react';
import './FiltroAno.css';

function FiltroAno({ anoFiltro, setAnoFiltro }) {
  return (
    <div className="filtro-ano">
      <label className="filtro-ano-label">Filtrar por Ano</label>
      <select
        className="filtro-ano-select"
        value={anoFiltro}
        onChange={(e) => setAnoFiltro(e.target.value)}
      >
        <option value="">Todos os Anos</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
      </select>
    </div>
  );
}

export default FiltroAno;