# AppTaxi API

Backend da aplicação AppTaxi desenvolvido com NestJS, TypeORM e PostgreSQL.

## Requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados PostgreSQL:
- Crie um banco de dados chamado 'AppTaxi'
- Configure as credenciais no arquivo `src/app.module.ts` se necessário

4. Execute as para criar as tabelas:
```bash
npm run migration:run
```

5. Execute os seeds para inserir dados iniciais:
```bash
npm run seed:run
```

## Executando a aplicação

```bash
# desenvolvimento
npm run start:dev

# produção
npm run start:prod
```

## Estrutura do Projeto

- `src/motorista/` - Módulo de motoristas
- `src/passageiro/` - Módulo de passageiros
- `src/corrida/` - Módulo de corridas
- `db/migrations/` - do banco de dados
- `db/seeds/` - Seeds para dados iniciais

## Regras de Negócio

### Motorista
1. Não pode haver dois motoristas com a mesma CNH
2. Não pode haver dois motoristas com a mesma placa
3. Motorista não pode ser removido se tiver corridas em andamento

### Passageiro
1. Não pode haver dois passageiros com o mesmo CPF
2. Passageiro não pode ter mais de 3 corridas pendentes simultaneamente
3. Passageiro não pode ser removido se tiver corridas em andamento

### Corrida
1. Corrida não pode ser criada sem motorista disponível
2. Corrida não pode ser cancelada se já estiver em andamento
3. Corrida não pode ter valor zero ou negativo

## Endpoints da API

### Motoristas
- GET /motoristas - Lista todos os motoristas
- POST /motoristas - Cria um novo motorista
- GET /motoristas/:id - Obtém um motorista específico
- PUT /motoristas/:id - Atualiza um motorista
- DELETE /motoristas/:id - Remove um motorista

### Passageiros
- GET /passageiros - Lista todos os passageiros
- POST /passageiros - Cria um novo passageiro
- GET /passageiros/:id - Obtém um passageiro específico
- PUT /passageiros/:id - Atualiza um passageiro
- DELETE /passageiros/:id - Remove um passageiro

### Corridas
- GET /corridas - Lista todas as corridas
- POST /corridas - Cria uma nova corrida
- GET /corridas/:id - Obtém uma corrida específica
- PUT /corridas/:id - Atualiza uma corrida
- DELETE /corridas/:id - Remove uma corrida

## Collection do Postman

A collection do Postman com todos os endpoints e exemplos de requisições está disponível no arquivo `apptaxi.postman_collection.json` na raiz do projeto.

## Tratamento de Erros

A API retorna códigos de status HTTP apropriados e mensagens de erro detalhadas em caso de falha:

- 400 Bad Request - Erro de validação ou regra de negócio
- 404 Not Found - Recurso não encontrado
- 409 Conflict - Conflito com regras de negócio
- 500 Internal Server Error - Erro interno do servidor

Exemplo de resposta de erro:
```json
{
  "statusCode": 400,
  "message": "Não pode haver dois motoristas com a mesma CNH",
  "error": "Bad Request"
}
``` 