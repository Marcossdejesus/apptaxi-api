import { DataSource } from 'typeorm';
import { Motorista } from '../motorista/entities/motorista.entity';
import { Passageiro } from '../passageiro/entities/passageiro.entity';
import { Corrida, CorridaStatus } from '../corrida/entities/corrida.entity';
import { Veiculo, VeiculoStatus } from '../veiculo/entities/veiculo.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'AppTaxi',
  entities: [Motorista, Passageiro, Corrida, Veiculo],
  synchronize: true,
  logging: true
});

async function seed() {
  try {
    await dataSource.initialize();
    console.log('Conexão com o banco de dados estabelecida');

    // Limpa as tabelas
    await dataSource.query('TRUNCATE TABLE corrida CASCADE');
    await dataSource.query('TRUNCATE TABLE motorista CASCADE');
    await dataSource.query('TRUNCATE TABLE passageiro CASCADE');
    await dataSource.query('TRUNCATE TABLE veiculo CASCADE');

    // Cria veículos
    const veiculo1 = dataSource.manager.create(Veiculo, {
      placa: 'ABC1234',
      modelo: 'Corolla',
      marca: 'Toyota',
      ano: 2020,
      cor: 'Prata',
      status: VeiculoStatus.DISPONIVEL,
      dataUltimaManutencao: new Date('2024-01-15'),
      dataVencimentoIPVA: new Date('2024-12-31'),
      dataVencimentoSeguro: new Date('2024-12-31'),
    });

    const veiculo2 = dataSource.manager.create(Veiculo, {
      placa: 'DEF5678',
      modelo: 'Civic',
      marca: 'Honda',
      ano: 2021,
      cor: 'Preto',
      status: VeiculoStatus.DISPONIVEL,
      dataUltimaManutencao: new Date('2024-02-01'),
      dataVencimentoIPVA: new Date('2024-12-31'),
      dataVencimentoSeguro: new Date('2024-12-31'),
    });

    const veiculo3 = dataSource.manager.create(Veiculo, {
      placa: 'GHI9012',
      modelo: 'Golf',
      marca: 'Volkswagen',
      ano: 2019,
      cor: 'Branco',
      status: VeiculoStatus.EM_MANUTENCAO,
      dataUltimaManutencao: new Date('2024-03-01'),
      dataVencimentoIPVA: new Date('2024-12-31'),
      dataVencimentoSeguro: new Date('2024-12-31'),
    });

    await dataSource.manager.save([veiculo1, veiculo2, veiculo3]);
    console.log('Veículos criados');

    // Cria motoristas
    const motorista1 = dataSource.manager.create(Motorista, {
      nome: 'João Silva',
      cnh: '12345678900',
      placa: 'ABC1234',
      modelo: 'Toyota Corolla',
      disponivel: true
    });

    const motorista2 = dataSource.manager.create(Motorista, {
      nome: 'Maria Santos',
      cnh: '98765432100',
      placa: 'XYZ5678',
      modelo: 'Honda Civic',
      disponivel: true
    });

    await dataSource.manager.save([motorista1, motorista2]);
    console.log('Motoristas criados');

    // Cria passageiros
    const passageiro1 = dataSource.manager.create(Passageiro, {
      nome: 'Carlos Souza',
      cpf: '55566677788',
      telefone: '11988888888'
    });

    const passageiro2 = dataSource.manager.create(Passageiro, {
      nome: 'Ana Oliveira',
      cpf: '11122233344',
      telefone: '11977777777'
    });

    await dataSource.manager.save([passageiro1, passageiro2]);
    console.log('Passageiros criados');

    // Cria corridas
    const corrida1 = dataSource.manager.create(Corrida, {
      origem: 'Rua Aguiar, 123',
      destino: 'Rua Martins, 456',
      valor: 50.75,
      status: CorridaStatus.EM_ANDAMENTO,
      data: new Date('2024-06-15T14:00:00'),
      motorista: motorista1,
      passageiro: passageiro1,
      veiculo: veiculo1
    });

    const corrida2 = dataSource.manager.create(Corrida, {
      origem: 'Avenida Paulista, 1000',
      destino: 'Rua Augusta, 500',
      valor: 35.50,
      status: CorridaStatus.CONCLUIDA,
      data: new Date('2024-06-14T10:30:00'),
      motorista: motorista2,
      passageiro: passageiro2,
      veiculo: veiculo2
    });

    await dataSource.manager.save([corrida1, corrida2]);
    console.log('Corridas criadas');

    console.log('Seed concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante o seed:', error);
  } finally {
    await dataSource.destroy();
  }
}

seed(); 