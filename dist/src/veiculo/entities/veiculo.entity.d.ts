import { Motorista } from '../../motorista/entities/motorista.entity';
export declare enum VeiculoStatus {
    DISPONIVEL = "DISPONIVEL",
    EM_MANUTENCAO = "EM_MANUTENCAO",
    INDISPONIVEL = "INDISPONIVEL"
}
export declare const VeiculoStatusLabels: {
    DISPONIVEL: string;
    EM_MANUTENCAO: string;
    INDISPONIVEL: string;
};
export declare class Veiculo {
    id: number;
    placa: string;
    modelo: string;
    marca: string;
    ano: number;
    cor: string;
    status: VeiculoStatus;
    dataUltimaManutencao: Date;
    dataVencimentoIPVA: Date;
    dataVencimentoSeguro: Date;
    motorista: Motorista;
}
