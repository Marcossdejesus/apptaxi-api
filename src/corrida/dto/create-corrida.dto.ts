import { IsString, IsNumber, IsDate, IsPositive, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsInt()
  motoristaId: number;

  @IsInt()
  passageiroId: number;
}