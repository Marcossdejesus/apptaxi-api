import { PassageiroService } from './passageiro.service';
import { CreatePassageiroDto } from './dto/create-passageiro.dto';
import { UpdatePassageiroDto } from './dto/update-passageiro.dto';
export declare class PassageiroController {
    private readonly passageiroService;
    constructor(passageiroService: PassageiroService);
    create(createPassageiroDto: CreatePassageiroDto): Promise<import("./entities/passageiro.entity").Passageiro>;
    findAll(): Promise<import("./entities/passageiro.entity").Passageiro[]>;
    findOne(id: string): Promise<import("./entities/passageiro.entity").Passageiro>;
    update(id: string, updatePassageiroDto: UpdatePassageiroDto): Promise<import("./entities/passageiro.entity").Passageiro>;
    remove(id: string): Promise<void>;
}
