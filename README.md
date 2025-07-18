# Gerador de Certificados - Backend 🎓

Este é o backend da aplicação Gerador de Certificados, um sistema desenvolvido para gerenciar e gerar certificados de cursos.

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para Node.js
- **Sequelize** - ORM (Object-Relational Mapping) para Node.js
- **MySQL** - Sistema de gerenciamento de banco de dados
- **Docker** - Plataforma de containerização
- **JWT** - JSON Web Token para autenticação
- **Bcrypt** - Biblioteca para hash de senhas
- **Celebrate** - Middleware de validação para Express

## 🚀 Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Docker 🐳
- Docker Compose
- Node.js (versão LTS recomendada)
- npm ou yarn

### 🔧 Configuração Inicial

1. Clone o repositório:

```bash
git clone https://github.com/vepifanio/gerador-certificados-backend.git
cd gerador-certificados-backend
```

2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Database
DB_ROOT_PASSWORD=sua_senha_root
DB_NAME=certificados_db
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=3306

# JWT
JWT_SECRET=seu_jwt_secret
```

3. Instale as dependências:

```bash
npm install
```

### 🎈 Iniciando a Aplicação

1. Inicie os containers Docker:

```bash
docker-compose up -d
```

2. Execute as migrações do banco de dados:

```bash
npx sequelize-cli db:migrate
```

3. (Opcional) Execute os seeders para dados iniciais:

```bash
npx sequelize-cli db:seed:all
```

4. Inicie a aplicação em modo desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3333` 🌐

## 🗃️ Estrutura do Projeto

- `/src` - Código fonte da aplicação
  - `/config` - Configurações do projeto
  - `/controllers` - Controladores da aplicação
  - `/database` - Migrações e seeders
  - `/middlewares` - Middlewares personalizados
  - `/models` - Modelos do Sequelize
  - `/routes` - Rotas da aplicação

## 🔒 Recursos de Segurança

- Autenticação JWT
- Hash de senhas com bcrypt
- Validação de dados com Celebrate

## 📝 Observações

- O servidor de desenvolvimento é executado com Nodemon para auto-reload
- As migrações do banco de dados são gerenciadas pelo Sequelize CLI
- O Docker Compose gerencia o container do MySQL para desenvolvimento
