import { Motorista } from '../../motorista/entities/motorista.entity';
import { Passageiro } from '../../passageiro/entities/passageiro.entity';
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
    motorista: Motorista;
    passageiro: Passageiro;
}
