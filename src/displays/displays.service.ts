import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateDisplayDto } from './dto/create-display.dto';
import { UpdateDisplayDto } from './dto/update-display.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DisplaysService extends PrismaClient implements OnModuleInit {
  logger = new Logger('DisplayService');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connect');
  }
  create(createDisplayDto: CreateDisplayDto) {
    return this.display.create({ data: createDisplayDto });
  }

  findAll() {
    return this.display.findMany();
  }

  findOne(id: string) {
    return this.display.findFirst({ where: { id } });
  }

  update(id: string, updateDisplayDto: UpdateDisplayDto) {
    this.findOne(id);
    return this.display.update({ where: { id }, data: updateDisplayDto });
  }

  remove(id: string) {
    return this.display.delete({ where: { id } });
  }
}
