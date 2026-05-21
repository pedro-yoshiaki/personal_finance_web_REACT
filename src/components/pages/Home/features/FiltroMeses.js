import React from 'react';

function FiltroMeses({ mesesFiltro, handleFiltroChange, limparFiltros }) {
  
  // Array auxiliar para gerar os checkboxes sem precisar copiar e colar 12 vezes
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <p style={{ margin: 0 }}><strong>Filtrar por Meses:</strong></p>
        <button 
          onClick={limparFiltros} 
          style={{ 
            padding: '5px 10px', backgroundColor: 'transparent', 
            border: '1px solid #7f8c8d', borderRadius: '4px', cursor: 'pointer',
            fontSize: '12px', color: '#7f8c8d'
          }}
        >
          Limpar Filtros ❌
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {mesesDoAno.map((mes) => (
          <label key={mes.num}>
            <input 
              type="checkbox" 
              checked={mesesFiltro.includes(mes.num)} 
              onChange={() => handleFiltroChange(mes.num)} 
            /> {mes.nome}
          </label>
        ))}
      </div>
    </div>
  );
}

export default FiltroMeses;