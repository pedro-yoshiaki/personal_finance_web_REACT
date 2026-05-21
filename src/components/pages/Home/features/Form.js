import React from 'react';
import './Form.css'

function Form({ form, editandoId, handleChange, salvarTransacao, cancelarEdicao }) {
  return (
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
            <input
                type="date"
                name="data"
                value={form.data}
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
  );
}

export default Form;