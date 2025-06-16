import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Corrida } from '../../corrida/entities/corrida.entity';

@Entity('passageiro')
export class Passageiro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  telefone: string;

  @OneToMany(() => Corrida, corrida => corrida.passageiro)
  corridas: Corrida[];
} 