import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getEstatisticasGerais(): Promise<{
        totalCorridas: number;
        totalMotoristas: number;
        totalPassageiros: number;
    }>;
    getCorridasPorStatus(): Promise<any[]>;
    getFaturamentoPorPeriodo(dataInicio: string, dataFim: string): Promise<{
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
            status: import("../corrida/entities/corrida.entity").CorridaStatus;
            motorista: string;
            passageiro: string;
        }[];
    }>;
    getMotoristasMaisAtivos(limit?: string): Promise<{
        id: any;
        nome: any;
        totalCorridas: number;
    }[]>;
    getPassageirosMaisFrequentes(limit?: string): Promise<{
        id: any;
        nome: any;
        totalCorridas: number;
    }[]>;
}
