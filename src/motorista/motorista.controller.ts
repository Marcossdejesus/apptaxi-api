import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MotoristaService } from './motorista.service';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';

@Controller('motoristas')
export class MotoristaController {
  constructor(private readonly motoristaService: MotoristaService) {}

  @Post()
  create(@Body() createMotoristaDto: CreateMotoristaDto) {
    return this.motoristaService.create(createMotoristaDto);
  }

  @Get()
  findAll() {
    return this.motoristaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motoristaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMotoristaDto: UpdateMotoristaDto) {
    return this.motoristaService.update(+id, updateMotoristaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motoristaService.remove(+id);
  }
} 