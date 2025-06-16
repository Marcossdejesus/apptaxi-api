import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePassageiroDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;
} 