import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Corrida } from '../../corrida/entities/corrida.entity';

@Entity('motorista')
export class Motorista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cnh: string;

  @Column()
  placa: string;

  @Column()
  modelo: string;

  @Column({ default: true })
  disponivel: boolean;

  @OneToMany(() => Corrida, corrida => corrida.motorista)
  corridas: Corrida[];
} 