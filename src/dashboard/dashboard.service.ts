import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Corrida } from '../corrida/entities/corrida.entity';
import { Motorista } from '../motorista/entities/motorista.entity';
import { Passageiro } from '../passageiro/entities/passageiro.entity';
import { CorridaStatus } from '../corrida/entities/corrida.entity';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Corrida)
        private corridaRepository: Repository<Corrida>,
        @InjectRepository(Motorista)
        private motoristaRepository: Repository<Motorista>,
        @InjectRepository(Passageiro)
        private passageiroRepository: Repository<Passageiro>,
    ) {}

    async getEstatisticasGerais() {
        const [totalCorridas, totalMotoristas, totalPassageiros] = await Promise.all([
            this.corridaRepository.count(),
            this.motoristaRepository.count(),
            this.passageiroRepository.count(),
        ]);

        return {
            totalCorridas,
            totalMotoristas,
            totalPassageiros,
        };
    }

    async getCorridasPorStatus() {
        const corridas = await this.corridaRepository
            .createQueryBuilder('corrida')
            .select('corrida.status', 'status')
            .addSelect('COUNT(*)', 'total')
            .groupBy('corrida.status')
            .getRawMany();

        return corridas;
    }

    async getFaturamentoPorPeriodo(dataInicio: Date, dataFim: Date) {
        // Normalizando as datas para UTC
        const dataInicioUTC = new Date(Date.UTC(
            dataInicio.getUTCFullYear(),
            dataInicio.getUTCMonth(),
            dataInicio.getUTCDate(),
            0, 0, 0, 0
        ));

        const dataFimUTC = new Date(Date.UTC(
            dataFim.getUTCFullYear(),
            dataFim.getUTCMonth(),
            dataFim.getUTCDate(),
            23, 59, 59, 999
        ));

        console.log('Período solicitado (UTC):');
        console.log('Início:', dataInicioUTC.toISOString());
        console.log('Fim:', dataFimUTC.toISOString());

        // Usando find com Between para melhor controle do intervalo
        const corridas = await this.corridaRepository.find({
            where: {
                status: CorridaStatus.CONCLUIDA,
                data: Between(dataInicioUTC, dataFimUTC)
            },
            relations: ['motorista', 'passageiro']
        });

        console.log('Corridas encontradas:', corridas);

        const faturamento = corridas.reduce((total, corrida) => {
            console.log(`Somando corrida ${corrida.id}:`, corrida.valor);
            return total + Number(corrida.valor);
        }, 0);

        console.log('Faturamento total:', faturamento);

        return {
            periodo: {
                inicio: dataInicio,
                fim: dataFim,
            },
            faturamento,
            totalCorridas: corridas.length,
            corridas: corridas.map(c => ({
                id: c.id,
                origem: c.origem,
                destino: c.destino,
                valor: c.valor,
                data: c.data,
                status: c.status,
                motorista: c.motorista?.nome,
                passageiro: c.passageiro?.nome
            }))
        };
    }

    async getMotoristasMaisAtivos(limit: number = 5) {
        const motoristas = await this.motoristaRepository
            .createQueryBuilder('motorista')
            .leftJoin('motorista.corridas', 'corrida')
            .select('motorista.id', 'id')
            .addSelect('motorista.nome', 'nome')
            .addSelect('COUNT(corrida.id)', 'total_corridas')
            .groupBy('motorista.id')
            .addGroupBy('motorista.nome')
            .orderBy('total_corridas', 'DESC')
            .limit(limit)
            .getRawMany();

        return motoristas.map(m => ({
            id: m.id,
            nome: m.nome,
            totalCorridas: parseInt(m.total_corridas)
        }));
    }

    async getPassageirosMaisFrequentes(limit: number = 5) {
        const passageiros = await this.passageiroRepository
            .createQueryBuilder('passageiro')
            .leftJoin('passageiro.corridas', 'corrida')
            .select('passageiro.id', 'id')
            .addSelect('passageiro.nome', 'nome')
            .addSelect('COUNT(corrida.id)', 'total_corridas')
            .groupBy('passageiro.id')
            .addGroupBy('passageiro.nome')
            .orderBy('total_corridas', 'DESC')
            .limit(limit)
            .getRawMany();

        return passageiros.map(p => ({
            id: p.id,
            nome: p.nome,
            totalCorridas: parseInt(p.total_corridas)
        }));
    }
} 