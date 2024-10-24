import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LaptopsService } from './laptops.service';
import { CreateLaptoDto } from './dto/create-lapto.dto';
import { UpdateLaptoDto } from './dto/update-lapto.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Laptops')
@Controller('laptops')
export class LaptopsController {
  constructor(private readonly laptosService: LaptopsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createLaptoDto: CreateLaptoDto) {
    return this.laptosService.create(createLaptoDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.laptosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.laptosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateLaptoDto: UpdateLaptoDto) {
    return this.laptosService.update(id, updateLaptoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.laptosService.remove(id);
  }
}
