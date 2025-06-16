import { IsString, IsOptional } from 'class-validator';

export class UpdatePassageiroDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  cpf?: string;

  @IsString()
  @IsOptional()
  telefone?: string;
} 