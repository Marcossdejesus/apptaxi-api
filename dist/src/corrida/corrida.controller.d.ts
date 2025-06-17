import { CorridaService } from './corrida.service';
import { CreateCorridaDto } from './dto/create-corrida.dto';
import { UpdateCorridaDto } from './dto/update-corrida.dto';
export declare class CorridaController {
    private readonly corridaService;
    constructor(corridaService: CorridaService);
    create(createCorridaDto: CreateCorridaDto): Promise<import("./entities/corrida.entity").Corrida>;
    findAll(status?: string): Promise<import("./entities/corrida.entity").Corrida[]>;
    findByMotorista(id: string): Promise<import("./entities/corrida.entity").Corrida[]>;
    findByPassageiro(id: string): Promise<import("./entities/corrida.entity").Corrida[]>;
    findByVeiculo(id: string): Promise<import("./entities/corrida.entity").Corrida[]>;
    findOne(id: string): Promise<import("./entities/corrida.entity").Corrida>;
    update(id: string, updateCorridaDto: UpdateCorridaDto): Promise<import("./entities/corrida.entity").Corrida>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
