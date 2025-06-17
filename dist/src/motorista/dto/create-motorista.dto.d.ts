import { CreateVeiculoDto } from '../../veiculo/dto/create-veiculo.dto';
export declare class CreateMotoristaDto {
    nome: string;
    cnh: string;
    placa: string;
    modelo: string;
    disponivel: boolean;
    telefone: string;
    email: string;
    ativo?: boolean;
    veiculo?: CreateVeiculoDto;
}
