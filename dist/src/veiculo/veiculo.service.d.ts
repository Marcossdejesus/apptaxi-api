import { Repository } from 'typeorm';
import { Veiculo } from './entities/veiculo.entity';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { Corrida } from '../corrida/entities/corrida.entity';
export declare class VeiculoService {
    private veiculoRepository;
    private corridaRepository;
    constructor(veiculoRepository: Repository<Veiculo>, corridaRepository: Repository<Corrida>);
    create(createVeiculoDto: CreateVeiculoDto): Promise<Veiculo>;
    findAll(): Promise<Veiculo[]>;
    findOne(id: number): Promise<Veiculo>;
    findByPlaca(placa: string): Promise<Veiculo>;
    update(id: number, updateVeiculoDto: UpdateVeiculoDto): Promise<Veiculo>;
    remove(id: number): Promise<void>;
    findByStatus(status: string): Promise<Veiculo[]>;
    findVeiculosParaManutencao(): Promise<Veiculo[]>;
}
