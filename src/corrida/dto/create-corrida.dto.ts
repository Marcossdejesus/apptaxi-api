import { IsString, IsNumber, IsDate, IsPositive, IsInt, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CorridaStatus } from '../entities/corrida.entity';

export class CreateCorridaDto {
  @IsString()
  origem: string;

  @IsString()
  destino: string;

  @IsNumber()
  @IsPositive()
  valor: number;

  @Type(() => Date)
  @IsDate()
  data: Date;

  @IsEnum(CorridaStatus)
  @IsOptional()
  status?: CorridaStatus;

  @IsInt()
  motoristaId: number;

  @IsInt()
  passageiroId: number;

  @IsNumber()
  @IsOptional()
  veiculoId?: number;
}