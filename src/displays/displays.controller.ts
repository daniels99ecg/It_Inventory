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
import { DisplaysService } from './displays.service';
import { CreateDisplayDto } from './dto/create-display.dto';
import { UpdateDisplayDto } from './dto/update-display.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Display')
@Controller('displays')
export class DisplaysController {
  constructor(private readonly displaysService: DisplaysService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createDisplayDto: CreateDisplayDto) {
    return this.displaysService.create(createDisplayDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.displaysService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.displaysService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateDisplayDto: UpdateDisplayDto) {
    return this.displaysService.update(id, updateDisplayDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.displaysService.remove(id);
  }
}
