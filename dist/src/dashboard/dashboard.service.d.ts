import { Repository } from 'typeorm';
import { Corrida } from '../corrida/entities/corrida.entity';
import { Motorista } from '../motorista/entities/motorista.entity';
import { Passageiro } from '../passageiro/entities/passageiro.entity';
import { CorridaStatus } from '../corrida/entities/corrida.entity';
export declare class DashboardService {
    private corridaRepository;
    private motoristaRepository;
    private passageiroRepository;
    constructor(corridaRepository: Repository<Corrida>, motoristaRepository: Repository<Motorista>, passageiroRepository: Repository<Passageiro>);
    getEstatisticasGerais(): Promise<{
        totalCorridas: number;
        totalMotoristas: number;
        totalPassageiros: number;
    }>;
    getCorridasPorStatus(): Promise<any[]>;
    getFaturamentoPorPeriodo(dataInicio: Date, dataFim: Date): Promise<{
        periodo: {
            inicio: Date;
            fim: Date;
        };
        faturamento: number;
        totalCorridas: number;
        corridas: {
            id: number;
            origem: string;
            destino: string;
            valor: number;
            data: Date;
            status: CorridaStatus;
            motorista: string;
            passageiro: string;
        }[];
    }>;
    getMotoristasMaisAtivos(limit?: number): Promise<{
        id: any;
        nome: any;
        totalCorridas: number;
    }[]>;
    getPassageirosMaisFrequentes(limit?: number): Promise<{
        id: any;
        nome: any;
        totalCorridas: number;
    }[]>;
}
