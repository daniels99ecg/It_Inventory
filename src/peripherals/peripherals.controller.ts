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
import { PeripheralsService } from './peripherals.service';
import { CreatePeripheralDto } from './dto/create-peripheral.dto';
import { UpdatePeripheralDto } from './dto/update-peripheral.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Peripherals')
@Controller('peripherals')
export class PeripheralsController {
  constructor(private readonly peripheralsService: PeripheralsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createPeripheralDto: CreatePeripheralDto) {
    return this.peripheralsService.create(createPeripheralDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.peripheralsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.peripheralsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updatePeripheralDto: UpdatePeripheralDto,
  ) {
    return this.peripheralsService.update(id, updatePeripheralDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.peripheralsService.remove(id);
  }
}
