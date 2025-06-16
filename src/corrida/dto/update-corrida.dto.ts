import { IsString, IsNumber, IsPositive, IsOptional, IsEnum } from 'class-validator';
import { CorridaStatus } from '../entities/corrida.entity';

export class UpdateCorridaDto {
  @IsString()
  @IsOptional()
  origem?: string;

  @IsString()
  @IsOptional()
  destino?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  valor?: number;

  @IsEnum(CorridaStatus)
  @IsOptional()
  status?: CorridaStatus;
} 