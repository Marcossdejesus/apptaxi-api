import { Repository } from 'typeorm';
import { Corrida } from './entities/corrida.entity';
import { CreateCorridaDto } from './dto/create-corrida.dto';
import { UpdateCorridaDto } from './dto/update-corrida.dto';
import { MotoristaService } from '../motorista/motorista.service';
import { PassageiroService } from '../passageiro/passageiro.service';
export declare class CorridaService {
    private corridaRepository;
    private motoristaService;
    private passageiroService;
    constructor(corridaRepository: Repository<Corrida>, motoristaService: MotoristaService, passageiroService: PassageiroService);
    create(createCorridaDto: CreateCorridaDto): Promise<Corrida>;
    findAll(): Promise<Corrida[]>;
    findOne(id: number): Promise<Corrida>;
    update(id: number, updateCorridaDto: UpdateCorridaDto): Promise<Corrida>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
