import { Motorista } from '../motorista/motorista.entity';
import { Passageiro } from '../passageiro/passageiro.entity';
export declare class Corrida {
    id: number;
    origem: string;
    destino: string;
    valor: number;
    status: string;
    data: Date;
    motorista: Motorista;
    passageiro: Passageiro;
}
