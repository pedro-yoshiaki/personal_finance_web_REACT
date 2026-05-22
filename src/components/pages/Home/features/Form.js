import React from 'react';
import './Form.css';

function Form({ form, editandoId, handleChange, salvarTransacao, cancelarEdicao }) {
  return (
    <section className="form-section">
      <h2 className="form-titulo">
        {editandoId !== null ? "✏️ Editar Transação" : "Nova Transação"}
      </h2>

      <form onSubmit={salvarTransacao} className="transaction-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Descrição</label>
            <input
              type="text"
              name="descricao"
              placeholder="Ex: Aluguel, Salário..."
              value={form.descricao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group form-group--sm">
            <label className="form-label">Valor (R$)</label>
            <input
              type="number"
              name="valor"
              placeholder="0,00"
              step="0.01"
              min="0"
              value={form.valor}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group form-group--sm">
            <label className="form-label">Data</label>
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group form-group--sm">
            <label className="form-label">Tipo</label>
            <select name="tipo" value={form.tipo} onChange={handleChange} className={form.tipo === 'receita' ? 'tipo-receita' : 'tipo-despesa'}>
              <option value="despesa">Despesa</option>
              <option value="receita">Receita</option>
            </select>
          </div>
        </div>

        <div className="form-row form-row--bottom">
          <div className="form-group form-group--grow">
            <label className="form-label">Categoria</label>
            <input
              type="text"
              name="categoria"
              placeholder="Ex: Alimentação, Moradia, Trabalho..."
              value={form.categoria}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            {editandoId !== null && (
              <button type="button" className="btn-cancelar" onClick={cancelarEdicao}>
                Cancelar
              </button>
            )}
            <button type="submit" className="btn-salvar">
              {editandoId !== null ? "Atualizar" : "Salvar Transação"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Form;