import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateLaptoDto } from './dto/create-lapto.dto';
import { UpdateLaptoDto } from './dto/update-lapto.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LaptopsService extends PrismaClient implements OnModuleInit {
  logger = new Logger('laptosServices');
  onModuleInit() {
    this.logger.log('Connect Database');
  }
  create(createLaptoDto: CreateLaptoDto) {
    return this.laptop.create({ data: createLaptoDto });
  }

  findAll() {
    return this.laptop.findMany();
  }

  findOne(id: string) {
    return this.laptop.findFirst({ where: { id } });
  }

  async update(id: string, updateLaptoDto: UpdateLaptoDto) {
    await this.findOne(id);
    return this.laptop.update({ where: { id }, data: updateLaptoDto });
  }

  remove(id: string) {
    return this.laptop.delete({ where: { id } });
  }
}
