import { Controller, Get, Post, Body, Put, Param, Delete, BadRequestException } from '@nestjs/common';
import { CorridaService } from './corrida.service';
import { CreateCorridaDto } from './dto/create-corrida.dto';
import { UpdateCorridaDto } from './dto/update-corrida.dto';

@Controller('corridas')
export class CorridaController {
  constructor(private readonly corridaService: CorridaService) {}

  @Post()
  create(@Body() createCorridaDto: CreateCorridaDto) {
    return this.corridaService.create(createCorridaDto);
  }

  @Get()
  findAll() {
    return this.corridaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corridaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCorridaDto: UpdateCorridaDto) {
    const corridaId = parseInt(id, 10);
    if (isNaN(corridaId)) {
      throw new BadRequestException('ID inválido');
    }
    return this.corridaService.update(corridaId, updateCorridaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const corridaId = parseInt(id, 10);
    if (isNaN(corridaId)) {
      throw new BadRequestException('ID inválido');
    }
    return this.corridaService.remove(corridaId);
  }
} 