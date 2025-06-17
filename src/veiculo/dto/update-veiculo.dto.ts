import { IsString, IsNumber, IsEnum, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { VeiculoStatus, VeiculoStatusLabels } from '../entities/veiculo.entity';

export class UpdateVeiculoDto {
  @IsString()
  @IsOptional()
  placa?: string;

  @IsString()
  @IsOptional()
  marca?: string;

  @IsNumber()
  @IsOptional()
  ano?: number;

  @IsString()
  @IsOptional()
  cor?: string;

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