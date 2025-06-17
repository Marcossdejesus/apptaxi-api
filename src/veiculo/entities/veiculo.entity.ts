import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Motorista } from '../../motorista/entities/motorista.entity';

export enum VeiculoStatus {
  DISPONIVEL = 'DISPONIVEL',
  EM_MANUTENCAO = 'EM_MANUTENCAO',
  INDISPONIVEL = 'INDISPONIVEL'
}

export const VeiculoStatusLabels = {
  [VeiculoStatus.DISPONIVEL]: 'Disponível',
  [VeiculoStatus.EM_MANUTENCAO]: 'Em Manutenção',
  [VeiculoStatus.INDISPONIVEL]: 'Indisponível'
};

@Entity('veiculo')
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  placa: string;

  @Column()
  modelo: string;

  @Column()
  marca: string;

  @Column()
  ano: number;

  @Column()
  cor: string;

  @Column({
    type: 'enum',
    enum: VeiculoStatus,
    default: VeiculoStatus.DISPONIVEL
  })
  status: VeiculoStatus;

  @Column({ type: 'date', nullable: true })
  dataUltimaManutencao: Date;

  @Column({ type: 'date', nullable: true })
  dataVencimentoIPVA: Date;

  @Column({ type: 'date', nullable: true })
  dataVencimentoSeguro: Date;

  @OneToOne(() => Motorista)
  @JoinColumn()
  motorista: Motorista;
} 