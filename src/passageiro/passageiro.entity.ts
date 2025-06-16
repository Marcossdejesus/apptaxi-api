import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Corrida } from '../corrida/entities/corrida.entity';

@Entity()
export class Passageiro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  telefone: string;

  @OneToMany(() => Corrida, corrida => corrida.passageiro)
  corridas: Corrida[];
} 