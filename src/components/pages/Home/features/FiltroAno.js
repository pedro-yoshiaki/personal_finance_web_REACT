import React from 'react';

function FiltroAno({ anoFiltro, setAnoFiltro }) {
    return (
        
        <div className="filtro-ano" style={{ marginBottom: '15px' }}>
          <label><strong>Filtrar por Ano: </strong></label>
          <select value={anoFiltro} onChange={(e) => setAnoFiltro(e.target.value)} style={{ padding: '5px', borderRadius: '4px' }}>
            <option value="">Todos os Anos</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>
    );
}

export default FiltroAno;