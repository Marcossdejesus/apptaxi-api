import { Motorista } from '../../motorista/entities/motorista.entity';
import { Passageiro } from '../../passageiro/entities/passageiro.entity';
import { Veiculo } from '../../veiculo/entities/veiculo.entity';
export declare enum CorridaStatus {
    PENDENTE = "PENDENTE",
    EM_ANDAMENTO = "EM_ANDAMENTO",
    CONCLUIDA = "CONCLUIDA",
    CANCELADA = "CANCELADA"
}
export declare class Corrida {
    id: number;
    origem: string;
    destino: string;
    valor: number;
    status: CorridaStatus;
    data: Date;
    motoristaId: number;
    passageiroId: number;
    veiculoId: number;
    motorista: Motorista;
    passageiro: Passageiro;
    veiculo: Veiculo;
}
