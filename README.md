# AppTaxi API

Backend da aplicação AppTaxi desenvolvido com NestJS, TypeORM e PostgreSQL.

## Requisitos

- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
cd apptaxi-api
npm install
```

3. Configure o banco de dados:
- Crie um banco de dados PostgreSQL chamado `apptaxi`
- Configure as credenciais no arquivo `typeorm.config.ts` ou usando variáveis de ambiente:
  - DB_HOST=localhost
  - DB_PORT=5432
  - DB_USERNAME=postgres
  - DB_PASSWORD=postgres
  - DB_DATABASE=apptaxi

4. Execute as migrações:
```bash
npm run migration:run
```

5. Execute os seeds para inserir dados iniciais:
```bash
npm run seed:run
```

## Executando a aplicação

```bash
npm run start:dev
```

A API estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
src/
├── motorista/         # Módulo de motoristas
├── passageiro/        # Módulo de passageiros
├── corrida/          # Módulo de corridas
├── veiculo/          # Módulo de veículos
├── dashboard/        # Módulo de dashboard
├── migrations/       # Migrações do banco de dados
├── seeds/           # Seeds para dados iniciais
└── app.module.ts     # Módulo principal
```

## Regras de Negócio

1. Motoristas:
   - Cada motorista deve ter uma CNH única
   - Um motorista pode ter um veículo associado
   - Um motorista pode ter múltiplas corridas

2. Passageiros:
   - Cada passageiro deve ter um email único
   - Um passageiro pode ter múltiplas corridas

3. Corridas:
   - Uma corrida deve ter um motorista e um passageiro
   - Uma corrida pode ter um veículo associado
   - O status da corrida pode ser: PENDENTE, EM_ANDAMENTO, CONCLUIDA, CANCELADA

4. Veículos:
   - **Cadastro**:
     - Placa é obrigatória e deve ser única
     - Modelo, marca, ano e cor são obrigatórios
     - Status padrão é "DISPONIVEL" se não especificado
   
   - **Status**:
     - DISPONIVEL: Veículo disponível para corridas
     - EM_MANUTENCAO: Veículo em manutenção
     - INDISPONIVEL: Veículo indisponível
   
   - **Manutenção**:
     - Sistema identifica veículos que precisam de manutenção quando:
       - Última manutenção foi há mais de 30 dias
       - IPVA está vencido
       - Seguro está vencido
   
   - **Exclusão**:
     - Não é possível excluir veículo com corridas associadas
     - Em vez de excluir, deve-se marcar como INDISPONIVEL
   
   - **Relacionamentos**:
     - Um veículo pode estar associado a um motorista (1:1)
     - Um veículo pode ter múltiplas corridas (1:N)
   
   - **Atualização**:
     - Pode-se atualizar parcialmente (PATCH) ou completamente (PUT)
     - Todos os campos são opcionais na atualização
     - Datas devem estar no formato ISO (YYYY-MM-DD)
   
   - **Consultas**:
     - Busca por ID, placa, status ou necessidade de manutenção
     - Status deve ser um dos valores válidos do enum VeiculoStatus
   
   - **Datas Importantes**:
     - dataUltimaManutencao: Data da última manutenção
     - dataVencimentoIPVA: Data de vencimento do IPVA
     - dataVencimentoSeguro: Data de vencimento do seguro

## Endpoints da API

### Motoristas
- `GET /motoristas`: Lista todos os motoristas
- `POST /motoristas`: Cria um novo motorista
- `GET /motoristas/:id`: Obtém um motorista específico
- `PUT /motoristas/:id`: Atualiza um motorista
- `DELETE /motoristas/:id`: Remove um motorista

### Passageiros
- `GET /passageiros`: Lista todos os passageiros
- `POST /passageiros`: Cria um novo passageiro
- `GET /passageiros/:id`: Obtém um passageiro específico
- `PUT /passageiros/:id`: Atualiza um passageiro
- `DELETE /passageiros/:id`: Remove um passageiro

### Corridas
- `GET /corridas`: Lista todas as corridas
- `POST /corridas`: Cria uma nova corrida
- `GET /corridas/:id`: Obtém uma corrida específica
- `PUT /corridas/:id`: Atualiza uma corrida
- `DELETE /corridas/:id`: Remove uma corrida
- `GET /corridas/motorista/:id`: Lista corridas de um motorista
- `GET /corridas/passageiro/:id`: Lista corridas de um passageiro
- `GET /corridas/veiculo/:id`: Lista corridas de um veículo

### Veículos
- `GET /veiculos`: Lista todos os veículos
- `GET /veiculos?status=STATUS`: Lista veículos por status (DISPONIVEL, EM_MANUTENCAO, INDISPONIVEL)
- `POST /veiculos`: Cria um novo veículo
- `GET /veiculos/:id`: Obtém um veículo específico
- `PUT /veiculos/:id`: Atualiza um veículo (atualização completa)
- `PATCH /veiculos/:id`: Atualiza um veículo (atualização parcial)
- `DELETE /veiculos/:id`: Remove um veículo (não permite remover se houver corridas associadas)
- `GET /veiculos/placa/:placa`: Obtém um veículo pela placa
- `GET /veiculos/manutencao`: Lista veículos que precisam de manutenção

Status dos Veículos:
- `DISPONIVEL`: Veículo disponível para corridas
- `EM_MANUTENCAO`: Veículo em manutenção
- `INDISPONIVEL`: Veículo indisponível

Exemplo de criação de veículo:
```json
{
  "placa": "ABC1234",
  "modelo": "Corolla",
  "marca": "Toyota",
  "ano": 2020,
  "cor": "Prata",
  "status": "DISPONIVEL",
  "dataUltimaManutencao": "2024-03-20",
  "dataVencimentoIPVA": "2024-12-31",
  "dataVencimentoSeguro": "2024-12-31"
}
```

Exemplo de atualização de veículo:
```json
{
  "status": "EM_MANUTENCAO",
  "dataUltimaManutencao": "2024-03-20"
}
```

### Dashboard
- `GET /dashboard/estatisticas`: Retorna estatísticas gerais (total de corridas, motoristas e passageiros)
- `GET /dashboard/corridas/status`: Retorna número de corridas por status
- `GET /dashboard/faturamento`: Retorna faturamento por período (requer parâmetros dataInicio e dataFim)
- `GET /dashboard/motoristas/ativos`: Retorna os motoristas mais ativos (parâmetro limit opcional, padrão 5)
- `GET /dashboard/passageiros/frequentes`: Retorna os passageiros mais frequentes (parâmetro limit opcional, padrão 5)

## Coleção Postman

Uma coleção do Postman está disponível em `apptaxi.postman_collection.json` com exemplos de todas as requisições.

## Tratamento de Erros

A API retorna os seguintes códigos de status:
- 200: Sucesso
- 201: Criado
- 400: Requisição inválida
- 404: Recurso não encontrado
- 500: Erro interno do servidor

## Testes

Para executar os testes:
```bash
npm run test
```

## Scripts Disponíveis

- `npm run start:dev`: Inicia o servidor em modo desenvolvimento
- `npm run build`: Compila o projeto
- `npm run start:prod`: Inicia o servidor em modo produção
- `npm run migration:run`: Executa as migrações pendentes
- `npm run migration:revert`: Reverte a última migração
- `npm run seed:run`: Executa os seeds para inserir dados iniciais
- `npm run test`: Executa os testes
- `npm run lint`: Executa o linter
- `npm run format`: Formata o código usando Prettier 