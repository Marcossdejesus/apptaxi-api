import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Corrida } from '../corrida/entities/corrida.entity';

@Entity()
export class Motorista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cnh: string;

  @Column()
  placa: string;

  @Column()
  modelo: string;

  @Column()
  disponivel: boolean;

  @OneToMany(() => Corrida, corrida => corrida.motorista)
  corridas: Corrida[];
} 