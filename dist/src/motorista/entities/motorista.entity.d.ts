import { Corrida } from '../../corrida/entities/corrida.entity';
export declare class Motorista {
    id: number;
    nome: string;
    cnh: string;
    placa: string;
    modelo: string;
    disponivel: boolean;
    corridas: Corrida[];
}
