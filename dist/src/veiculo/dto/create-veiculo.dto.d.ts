import { VeiculoStatus } from '../entities/veiculo.entity';
export declare class CreateVeiculoDto {
    placa: string;
    modelo: string;
    marca: string;
    ano: number;
    cor: string;
    status?: VeiculoStatus;
    dataUltimaManutencao?: Date;
    dataVencimentoIPVA?: Date;
    dataVencimentoSeguro?: Date;
}
