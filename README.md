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

Arquivos principais:

- app.js
- routes
- controllers
- services
- database

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

### Secretárias

CRUD completo de secretárias:

- GET all
- GET by id
- POST
- PATCH
- DELETE

Validações implementadas:

- validação de ID numérico
- validação do campo nome obrigatório
- tratamento de erros HTTP

### Atendimentos

CRUD completo de atendimentos:

- GET all
- GET by id
- POST
- PATCH
- DELETE

Validações implementadas:

- validação de ID inteiro positivo
- validação de body JSON válido
- validação de campos obrigatórios
- validação de campos permitidos no body
- validação de CPF com 11 dígitos numéricos
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

## Endpoints de Secretárias

### Listar todas as secretárias

```http
GET /secretaria
```

### Buscar secretária por ID

```http
GET /secretaria/:id
```

### Criar secretária

```http
POST /secretaria
```

Exemplo de body:

```json
{
    "id": "3",
    "nome": "Maria Silva"
}
```

### Editar secretária

```http
PATCH /secretaria/:id
```

Exemplo de body:

```json
{
    "nome": "Maria Oliveira"
}
```

### Deletar secretária

```http
DELETE /secretaria/:id
```

## Endpoints de Atendimentos

### Listar todos os atendimentos

```http
GET /atendimentos
```

### Buscar atendimento por ID

```http
GET /atendimentos/:id
```

### Criar atendimento

```http
POST /atendimentos
```

Exemplo de body:

```json
{
    "idAtendimento": 300,
    "observacao": "Consulta inicial",
    "data": "2026-05-12",
    "valorTotal": 250,
    "tipoAtendimento": "CLINICO",
    "parcelas": 1,
    "fk_CPF_Paciente": "10000020110",
    "fk_CPF_Secretaria": "90011122233",
    "status": "AGENDADO",
    "horario_inicio": "09:00:00",
    "horario_fim": "10:00:00"
}
```

### Editar atendimento

```http
PATCH /atendimentos/:id
```

Exemplo de body:

```json
{
    "observacao": "Consulta de retorno",
    "status": "CONCLUIDO"
}
```

### Deletar atendimento

```http
DELETE /atendimentos/:id
```

## Ferramentas utilizadas para testes

- Postman
- Nodemon

## Funcionalidades implementadas (complemento)

### Dentistas

CRUD completo de dentistas:

- GET all
- GET by cpf
- POST
- PUT
- DELETE

Validações implementadas:

- verificação de dentista existente por CPF
- prevenção de duplicidade de CPF_Dentista
- prevenção de duplicidade de CRO
- tratamento de erros HTTP

## Endpoints de Dentistas

### Listar todos os dentistas

```http
GET /dentistas
```

### Buscar dentista por CPF

```http
GET /dentistas/:cpf
```

### Criar dentista

```http
POST /dentistas
```

Exemplo de body:

```json
{
    "CPF_Dentista": "12345678901",
    "nome": "Carlos Mendes",
    "CRO": "12345",
    "croUF": "SP",
    "especialidade": "Ortodontia"
}
```

### Editar dentista

```http
PUT /dentistas/:cpf
```

Exemplo de body:

```json
{
    "nome": "Carlos Mendes Filho",
    "especialidade": "Implantodontia"
}
```

### Deletar dentista

```http
DELETE /dentistas/:cpf
```

## Observações

- O recurso de dentistas utiliza `PUT` para atualização, enquanto os demais recursos usam `PATCH`.
