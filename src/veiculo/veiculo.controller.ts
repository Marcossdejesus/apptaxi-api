import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Controller('veiculos')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Post()
  create(@Body() createVeiculoDto: CreateVeiculoDto) {
    return this.veiculoService.create(createVeiculoDto);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    if (status) {
      return this.veiculoService.findByStatus(status);
    }
    return this.veiculoService.findAll();
  }

  @Get('manutencao')
  findVeiculosParaManutencao() {
    return this.veiculoService.findVeiculosParaManutencao();
  }

  @Get('placa/:placa')
  findByPlaca(@Param('placa') placa: string) {
    return this.veiculoService.findByPlaca(placa);
  }

  @Get('status/:status')
  findByStatusParam(@Param('status') status: string) {
    return this.veiculoService.findByStatus(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.veiculoService.findOne(+id);
  }

  @Put(':id')
  updatePut(@Param('id') id: string, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculoService.update(+id, updateVeiculoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculoService.update(+id, updateVeiculoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.veiculoService.remove(+id);
  }
} 