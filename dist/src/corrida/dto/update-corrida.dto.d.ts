import { CorridaStatus } from '../entities/corrida.entity';
export declare class UpdateCorridaDto {
    origem?: string;
    destino?: string;
    valor?: number;
    status?: CorridaStatus;
}
