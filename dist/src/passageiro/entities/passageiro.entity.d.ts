import { Corrida } from '../../corrida/entities/corrida.entity';
export declare class Passageiro {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    corridas: Corrida[];
}
