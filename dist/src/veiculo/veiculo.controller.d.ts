import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
export declare class VeiculoController {
    private readonly veiculoService;
    constructor(veiculoService: VeiculoService);
    create(createVeiculoDto: CreateVeiculoDto): Promise<import("./entities/veiculo.entity").Veiculo>;
    findAll(status?: string): Promise<import("./entities/veiculo.entity").Veiculo[]>;
    findVeiculosParaManutencao(): Promise<import("./entities/veiculo.entity").Veiculo[]>;
    findByPlaca(placa: string): Promise<import("./entities/veiculo.entity").Veiculo>;
    findByStatusParam(status: string): Promise<import("./entities/veiculo.entity").Veiculo[]>;
    findOne(id: string): Promise<import("./entities/veiculo.entity").Veiculo>;
    updatePut(id: string, updateVeiculoDto: UpdateVeiculoDto): Promise<import("./entities/veiculo.entity").Veiculo>;
    update(id: string, updateVeiculoDto: UpdateVeiculoDto): Promise<import("./entities/veiculo.entity").Veiculo>;
    remove(id: string): Promise<void>;
}
