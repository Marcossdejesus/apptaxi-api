import { IsString, IsNotEmpty, IsNumber, IsEnum, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { VeiculoStatus, VeiculoStatusLabels } from '../entities/veiculo.entity';

export class CreateVeiculoDto {
  @IsString()
  @IsNotEmpty({ message: 'A placa é obrigatória' })
  placa: string;

  @IsString()
  @IsNotEmpty({ message: 'O modelo é obrigatório' })
  modelo: string;

  @IsString()
  @IsNotEmpty({ message: 'A marca é obrigatória' })
  marca: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O ano é obrigatório' })
  ano: number;

  @IsString()
  @IsNotEmpty({ message: 'A cor é obrigatória' })
  cor: string;

  @IsEnum(VeiculoStatus, { 
    message: `O status deve ser um dos seguintes valores: ${Object.values(VeiculoStatusLabels).join(', ')}` 
  })
  @IsOptional()
  status?: VeiculoStatus;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataUltimaManutencao?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataVencimentoIPVA?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataVencimentoSeguro?: Date;
} 