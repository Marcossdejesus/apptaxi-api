import { IsNotEmpty, IsString, IsBoolean, IsEmail, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateVeiculoDto } from '../../veiculo/dto/create-veiculo.dto';

export class CreateMotoristaDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  nome: string;

  @IsNotEmpty({ message: 'A CNH é obrigatória' })
  @IsString({ message: 'A CNH deve ser uma string' })
  cnh: string;

  @IsNotEmpty({ message: 'A placa é obrigatória' })
  @IsString({ message: 'A placa deve ser uma string' })
  placa: string;

  @IsNotEmpty({ message: 'O modelo é obrigatório' })
  @IsString({ message: 'O modelo deve ser uma string' })
  modelo: string;

  @IsBoolean({ message: 'A disponibilidade deve ser um booleano' })
  disponivel: boolean;

  @IsString()
  telefone: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;

  @ValidateNested()
  @Type(() => CreateVeiculoDto)
  @IsOptional()
  veiculo?: CreateVeiculoDto;
}   