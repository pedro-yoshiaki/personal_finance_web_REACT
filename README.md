# Controle de Gastos e Orçamento 💰

**Projeto Web II** - Aplicação web desenvolvida em dupla, com o objetivo de gerenciar finanças pessoais através de operações CRUD.

## 📋 Sobre o Projeto

Este projeto é uma Single Page Application (SPA) para "Controle de Gastos e Orçamento". A aplicação permite o gerenciamento de movimentações financeiras, auxiliando no controle de despesas e receitas. O foco é a integração de um frontend em **React** com uma API simulada utilizando **json-server**.

## ✨ Funcionalidades (CRUD)

O sistema permite as quatro operações básicas:
* **Create (Cadastrar):** Inserir novos gastos ou receitas no sistema.
* **Read (Listar):** Visualizar todas as transações financeiras cadastradas.
* **Update (Atualizar):** Modificar informações de uma transação existente.
* **Delete (Excluir):** Remover registros de gastos ou receitas.

## 🚀 Tecnologias e Arquitetura

* **Frontend (Interface):** React.js
* **Backend (API Fake):** json-server 
* **Banco de Dados:** Arquivo `db.json`

## 🛠️ Como rodar o projeto localmente

**1. Clone o repositório e acesse a pasta:**
```bash
git clone <https://github.com/pedro-yoshiaki/personal_finance_web_REACT.git>
cd frontend_personal_finance
```

**2. Instale as dependências**
```bash
npm install
```

**3. Inicie o servidor (API Fake)**
Este comando iniciará o banco de dados na porta 3001. Mantenha este terminal aberto.
```bash
npx json-server --watch db.json --port 3001
```

**4. Inicie o Frontend (React):**
Abra um novo terminal na mesma pasta e inicie a interface:
```bash
npm start
```
A aplicação abrirá automaticamente no navegador em http://localhost:3000.

## 👥 Equipe

* **Matheus Soares Nascimento**
* **Pedro Yoshiaki Freitas Nohara**


