import { Repository } from 'typeorm';
import { Motorista } from './entities/motorista.entity';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';
export declare class MotoristaService {
    private motoristaRepository;
    constructor(motoristaRepository: Repository<Motorista>);
    create(createMotoristaDto: CreateMotoristaDto): Promise<Motorista>;
    findAll(): Promise<Motorista[]>;
    findOne(id: number): Promise<Motorista>;
    update(id: number, updateMotoristaDto: UpdateMotoristaDto): Promise<Motorista>;
    remove(id: number): Promise<void>;
}
