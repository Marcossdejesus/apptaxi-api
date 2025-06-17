import { Corrida } from '../../corrida/entities/corrida.entity';
import { Veiculo } from '../../veiculo/entities/veiculo.entity';
export declare class Motorista {
    id: number;
    nome: string;
    cnh: string;
    placa: string;
    modelo: string;
    disponivel: boolean;
    corridas: Corrida[];
    veiculo: Veiculo;
}
