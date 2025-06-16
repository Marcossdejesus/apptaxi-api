import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateMotoristaDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  cnh?: string;

  @IsString()
  @IsOptional()
  placa?: string;

  @IsString()
  @IsOptional()
  modelo?: string;

  @IsBoolean()
  @IsOptional()
  disponivel?: boolean;
} 