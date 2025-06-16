"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const motorista_entity_1 = require("../motorista/entities/motorista.entity");
const passageiro_entity_1 = require("../passageiro/entities/passageiro.entity");
const corrida_entity_1 = require("../corrida/entities/corrida.entity");
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'AppTaxi',
    entities: [motorista_entity_1.Motorista, passageiro_entity_1.Passageiro, corrida_entity_1.Corrida],
    synchronize: true,
    logging: true
});
async function seed() {
    try {
        await dataSource.initialize();
        console.log('Conexão com o banco de dados estabelecida');
        await dataSource.query('TRUNCATE TABLE corrida CASCADE');
        await dataSource.query('TRUNCATE TABLE motorista CASCADE');
        await dataSource.query('TRUNCATE TABLE passageiro CASCADE');
        const motorista1 = dataSource.manager.create(motorista_entity_1.Motorista, {
            nome: 'João Silva',
            cnh: '12345678900',
            placa: 'ABC1234',
            modelo: 'Toyota Corolla',
            disponivel: true
        });
        const motorista2 = dataSource.manager.create(motorista_entity_1.Motorista, {
            nome: 'Maria Santos',
            cnh: '98765432100',
            placa: 'XYZ5678',
            modelo: 'Honda Civic',
            disponivel: true
        });
        await dataSource.manager.save([motorista1, motorista2]);
        console.log('Motoristas criados');
        const passageiro1 = dataSource.manager.create(passageiro_entity_1.Passageiro, {
            nome: 'Carlos Souza',
            cpf: '55566677788',
            telefone: '11988888888'
        });
        const passageiro2 = dataSource.manager.create(passageiro_entity_1.Passageiro, {
            nome: 'Ana Oliveira',
            cpf: '11122233344',
            telefone: '11977777777'
        });
        await dataSource.manager.save([passageiro1, passageiro2]);
        console.log('Passageiros criados');
        const corrida1 = dataSource.manager.create(corrida_entity_1.Corrida, {
            origem: 'Rua Aguiar, 123',
            destino: 'Rua Martins, 456',
            valor: 50.75,
            status: corrida_entity_1.CorridaStatus.EM_ANDAMENTO,
            data: new Date('2024-06-15T14:00:00'),
            motorista: motorista1,
            passageiro: passageiro1
        });
        const corrida2 = dataSource.manager.create(corrida_entity_1.Corrida, {
            origem: 'Avenida Paulista, 1000',
            destino: 'Rua Augusta, 500',
            valor: 35.50,
            status: corrida_entity_1.CorridaStatus.CONCLUIDA,
            data: new Date('2024-06-14T10:30:00'),
            motorista: motorista2,
            passageiro: passageiro2
        });
        await dataSource.manager.save([corrida1, corrida2]);
        console.log('Corridas criadas');
        console.log('Seed concluído com sucesso!');
    }
    catch (error) {
        console.error('Erro durante o seed:', error);
    }
    finally {
        await dataSource.destroy();
    }
}
seed();
//# sourceMappingURL=seed.js.map