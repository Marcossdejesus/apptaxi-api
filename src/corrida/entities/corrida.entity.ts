import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Motorista } from '../../motorista/entities/motorista.entity';
import { Passageiro } from '../../passageiro/entities/passageiro.entity';

export enum CorridaStatus {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA',
  CANCELADA = 'CANCELADA',
}

@Entity('corrida')
export class Corrida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origem: string;

  @Column()
  destino: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({
    type: 'enum',
    enum: CorridaStatus,
    default: CorridaStatus.PENDENTE,
  })
  status: CorridaStatus;

  @Column()
  data: Date;

  @Column({ name: 'motoristaId', nullable: true })
  motoristaId: number;

  @Column({ name: 'passageiroId', nullable: true })
  passageiroId: number;

  @ManyToOne(() => Motorista, motorista => motorista.corridas, { 
    eager: true,
    cascade: true
  })
  @JoinColumn({ name: 'motoristaId' })
  motorista: Motorista;

  @ManyToOne(() => Passageiro, passageiro => passageiro.corridas, { 
    eager: true,
    cascade: true
  })
  @JoinColumn({ name: 'passageiroId' })
  passageiro: Passageiro;
} 