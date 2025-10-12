# 🛍️ Sistema CRUD de Gerenciamento de Produtos

Sistema completo de gerenciamento de produtos desenvolvido com **Node.js + Express + Supabase** no backend e **Angular + Angular Material** no frontend.

---

## 📋 Índice

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Screenshots](#-screenshots)
- [Dependências](#-dependências)

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js**
- **Express** 
- **Supabase**
- **dotenv**
- **CORS**

### Frontend
- **Angular**
- **Angular Material** 
- **TypeScript**
- **RxJS**

---

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (vem com o Node.js)
- [Angular CLI](https://angular.io/cli) - `npm install -g @angular/cli`
- Conta no [Supabase](https://supabase.com/) (gratuita)

---

## 🔧 Instalação e Configuração

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/ThiagoFPires/FullStack
cd crud-produtos
```

---

### 2️⃣ Configurar o Banco de Dados (Supabase)

#### a) Criar Projeto no Supabase

1. Acesse [Supabase](https://supabase.com/) e faça login
2. Clique em **"+ New Project"**
3. Preencha:
   - **Name:** crud-produtos
   - **Database Password:** [crie uma senha forte]
   - **Region:** South America (São Paulo)
4. Aguarde 2-3 minutos para criar

#### b) Executar o Script SQL

1. No Supabase, vá em **SQL Editor**
2. Clique em **"+ New query"**
3. Cole o código do arquivo `backend/database_schema.sql`
4. Clique em **"RUN"**

### 3️⃣ Configurar o Backend

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
# Windows (PowerShell):
New-Item -ItemType File -Path .env

```

#### Editar o arquivo `.env`:

```env
SUPABASE_URL= Incluir URL do Supabase
SUPABASE_KEY= Incluir chave pública do Supabase
PORT=3000
```
---

### 4️⃣ Configurar o Frontend

```bash
# Voltar para raiz e entrar no frontend
cd ../frontend

# Instalar dependências
npm install
```

---

## ▶️ Executando o Projeto

### Backend

```bash
cd backend
npm run dev
```
**Resultado esperado:**
```
✅ Conectado ao Supabase com sucesso!
🚀 Servidor rodando na porta 3000
📡 API disponível em http://localhost:3000
```
### Frontend

Em outro terminal:

```bash
cd frontend
ng serve
```
### Acessar a Aplicação

- **Frontend:** http://localhost:4200
- **Backend API:** http://localhost:3000/api/products

---

## 📁 Estrutura do Projeto

```
crud-produtos/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── supabase.js          # Configuração do Supabase
│   │   ├── controllers/
│   │   │   └── productController.js  # Lógica de controle HTTP
│   │   ├── services/
│   │   │   └── productService.js     # Regras de negócio e DB
│   │   ├── routes/
│   │   │   └── productRoutes.js      # Definição de rotas
│   │   └── server.js                 # Servidor Express
│   ├── .env                          # Variáveis de ambiente
│   ├── package.json
│   └── database_schema.sql           # Script SQL
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── product-list/
    │   │   │   │   └── product-list.component.ts
    │   │   │   ├── product-dialog/
    │   │   │   │   └── product-dialog.component.ts
    │   │   │   └── confirm-dialog/
    │   │   │       └── confirm-dialog.component.ts
    │   │   ├── models/
    │   │   │   └── product.model.ts       # Interfaces TypeScript
    │   │   ├── services/
    │   │   │   └── product.service.ts     # Serviço HTTP
    │   │   ├── app.component.ts
    │   │   └── app.config.ts
    │   ├── styles.css
    │   └── index.html
    └── package.json
```

---

## 🌐 Endpoints da API

### Base URL: `http://localhost:3000/api/products`

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| **GET** | `/` | Listar todos os produtos | 200 |
| **GET** | `/:id` | Buscar produto por ID | 200, 404 |
| **POST** | `/` | Criar novo produto | 201, 400 |
| **PUT** | `/:id` | Atualizar produto | 200, 404 |
| **DELETE** | `/:id` | Deletar produto | 200, 404 |

### Exemplos de Requisições

#### Criar Produto (POST)
```json
POST http://localhost:3000/api/products
Content-Type: application/json

{
  "name": "Notebook Dell",
  "description": "Notebook Dell Inspiron 15",
  "price": 3499.90,
  "stock": 10,
  "category": "Eletrônicos"
}
```

#### Atualizar Produto (PUT)
```json
PUT http://localhost:3000/api/products/{id}
Content-Type: application/json

{
  "price": 3299.90,
  "stock": 15
}
```

---

## 📸 Screenshots

### 1. Tela Principal - Lista de Produtos

![Lista de Produtos](./screenshots/lista-produtos.png)

*Tabela com todos os produtos cadastrados, utilizando Angular Material Table*

---

### 2. Formulário de Criação/Edição

![Formulário](./screenshots/formulario-produto.png)

*Modal com formulário validado usando Angular Material Form Fields*

---

### 3. Confirmação de Exclusão

![Confirmação](./screenshots/confirmacao-exclusao.png)

*Dialog de confirmação elegante com ícone de aviso*

---

### 4. Notificações de Sucesso/Erro

![Notificação](./screenshots/notificacao-sucesso.png)

*Feedback visual com Material Snackbar*

---

### 5. Backend Rodando

![Backend Terminal](./screenshots/backend-terminal.png)

*Terminal mostrando o servidor rodando e conectado ao Supabase*

---

## 📦 Dependências

### Backend

**Descrição das dependências:**
- **@supabase/supabase-js** - Cliente JavaScript para Supabase
- **express** - Framework web minimalista para Node.js
- **cors** - Middleware para habilitar CORS
- **dotenv** - Carrega variáveis de ambiente do arquivo .env
- **nodemon** - Reinicia automaticamente o servidor durante desenvolvimento

---

### Frontend

**Descrição das dependências:**
- **@angular/core** - Núcleo do framework Angular
- **@angular/material** - Componentes Material Design
- **@angular/cdk** - Kit de desenvolvimento de componentes
- **@angular/forms** - Módulo de formulários reativos
- **rxjs** - Biblioteca de programação reativa
- **typescript** - Superset tipado do JavaScript

---

## 🎯 Componentes Angular Material Utilizados

- ✅ **MatToolbar** - Barra de navegação superior
- ✅ **MatCard** - Cards para organizar conteúdo
- ✅ **MatTable** - Tabela de dados
- ✅ **MatButton** - Botões estilizados (raised, icon)
- ✅ **MatIcon** - Ícones Material Icons
- ✅ **MatDialog** - Modais/Diálogos
- ✅ **MatFormField** - Campos de formulário
- ✅ **MatInput** - Inputs de texto e número
- ✅ **MatSelect** - Dropdown/Select
- ✅ **MatSnackBar** - Notificações toast

---

## 👨‍💻 Autor

**Thiago de Freitas Pires**

- GitHub: [@ThiagoFPires](https://github.com/ThiagoFPires)

---

## 🎓 Informações Acadêmicas

- **Instituição:** UNIFAGOC - Centro Universitário Governador Ozanam Coelho
- **Curso:** Ciência da Computação
- **Disciplina:** Desenvolvimento Web e Mobile
- **Professor:** Felipe Padovani

---

**Desenvolvido com ❤️ para a disciplina de Desenvolvimento Web e Mobile do curso de Ciência da Computação do UNIFAGOC**
