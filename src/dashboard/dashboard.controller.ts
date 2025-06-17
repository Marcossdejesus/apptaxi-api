import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('estatisticas')
    async getEstatisticasGerais() {
        return this.dashboardService.getEstatisticasGerais();
    }

    @Get('corridas/status')
    async getCorridasPorStatus() {
        return this.dashboardService.getCorridasPorStatus();
    }

    @Get('faturamento')
    async getFaturamentoPorPeriodo(
        @Query('dataInicio') dataInicio: string,
        @Query('dataFim') dataFim: string,
    ) {
        return this.dashboardService.getFaturamentoPorPeriodo(
            new Date(dataInicio),
            new Date(dataFim),
        );
    }

    @Get('motoristas/ativos')
    async getMotoristasMaisAtivos(@Query('limit') limit?: string) {
        const limitNumber = limit ? parseInt(limit, 10) : 5;
        if (isNaN(limitNumber)) {
            throw new BadRequestException('O parâmetro limit deve ser um número');
        }
        return this.dashboardService.getMotoristasMaisAtivos(limitNumber);
    }

    @Get('passageiros/frequentes')
    async getPassageirosMaisFrequentes(@Query('limit') limit?: string) {
        const limitNumber = limit ? parseInt(limit, 10) : 5;
        if (isNaN(limitNumber)) {
            throw new BadRequestException('O parâmetro limit deve ser um número');
        }
        return this.dashboardService.getPassageirosMaisFrequentes(limitNumber);
    }
} 