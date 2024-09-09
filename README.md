# To do service

Esse é a parte backend do projeto Full Stack To do. O diagrama do banco de dados:

![Screenshot_1](https://github.com/user-attachments/assets/fe862d32-6a6a-4ebb-9faf-6daa57f4cc07)

## Tecnologias usadas:

- node
- dotenv
- yup
- typescript
- knex
- bcrypt

## Como rodar:

Clone o repositório:

```
git clone https://github.com/usuario/repositorio.git
```

Instale as dependências:

```
npm install
```

Configure as variáveis de ambiente:

Siga de base o arquivo chamado .env-example

```
# Porta de acesso (local)
PORT=3001

# Configurações para o banco de dados
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DATABASE_NAME=

# JWT
JWT_SECRET=
```

Para rodar o servidor, use:

```
npm start
```

O servidor estará disponível em http://localhost:3001 (ou em outra porta configurada).

