import { CorridaStatus } from '../entities/corrida.entity';
export declare class CreateCorridaDto {
    origem: string;
    destino: string;
    valor: number;
    data: Date;
    status?: CorridaStatus;
    motoristaId: number;
    passageiroId: number;
    veiculoId?: number;
}
