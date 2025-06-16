import { Repository } from 'typeorm';
import { Passageiro } from './entities/passageiro.entity';
import { CreatePassageiroDto } from './dto/create-passageiro.dto';
import { UpdatePassageiroDto } from './dto/update-passageiro.dto';
export declare class PassageiroService {
    private passageiroRepository;
    constructor(passageiroRepository: Repository<Passageiro>);
    create(createPassageiroDto: CreatePassageiroDto): Promise<Passageiro>;
    findAll(): Promise<Passageiro[]>;
    findOne(id: number): Promise<Passageiro>;
    update(id: number, updatePassageiroDto: UpdatePassageiroDto): Promise<Passageiro>;
    remove(id: number): Promise<void>;
    verificarCorridasPendentes(id: number): Promise<boolean>;
}
