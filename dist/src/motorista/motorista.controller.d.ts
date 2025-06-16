import { MotoristaService } from './motorista.service';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';
export declare class MotoristaController {
    private readonly motoristaService;
    constructor(motoristaService: MotoristaService);
    create(createMotoristaDto: CreateMotoristaDto): Promise<import("./entities/motorista.entity").Motorista>;
    findAll(): Promise<import("./entities/motorista.entity").Motorista[]>;
    findOne(id: string): Promise<import("./entities/motorista.entity").Motorista>;
    update(id: string, updateMotoristaDto: UpdateMotoristaDto): Promise<import("./entities/motorista.entity").Motorista>;
    remove(id: string): Promise<void>;
}
