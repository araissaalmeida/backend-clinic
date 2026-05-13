# Backend Clinic

Projeto desenvolvido para a disciplina de Programação Web I

O objetivo do projeto é implementar um backend simples utilizando Node.js e Express para gerenciamento de uma clínica odontológica, com integração entre banco de dados relacional e não relacional.

## Tecnologias utilizadas

- Node.js
- Express
- JSON Mock Database
- Postman

## Estrutura do projeto

- Procedimento
- Secretária
- Dentista
- Atendimento

## Funcionalidades implementadas

### Procedimentos

CRUD completo de procedimentos:

- GET all
- GET by id
- POST
- PATCH
- DELETE

Validações implementadas:

- validação de ID numérico
- validação de campos obrigatórios
- tratamento de erros HTTP

## Como executar o projeto

### Instalar dependências

```bash
npm install
```

### Executar o servidor

```bash
npm run dev
```

Servidor padrão:

```text
http://localhost:3000
```

## Endpoints de Procedimentos

### Listar todos os procedimentos

```http
GET /procedimentos
```

### Buscar procedimento por ID

```http
GET /procedimentos/:id
```

### Criar procedimento

```http
POST /procedimentos
```

Exemplo de body:

```json
{
    "descricao": "Aplicacao de facetas em resina composta",
    "tipoProcedimento": "ESTÉTICO",
    "nome": "Faceta de Resina",
    "valor": 900
}
```

### Editar procedimento

```http
PATCH /procedimentos/:id
```

### Deletar procedimento

```http
DELETE /procedimentos/:id
```

## Ferramentas utilizadas para testes

- Postman
- Nodemon