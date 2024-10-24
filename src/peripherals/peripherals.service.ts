import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreatePeripheralDto } from './dto/create-peripheral.dto';
import { UpdatePeripheralDto } from './dto/update-peripheral.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PeripheralsService extends PrismaClient implements OnModuleInit {
  logger = new Logger('PeripheralService');
  onModuleInit() {
    this.$connect();
    this.logger.log('Database Connect');
  }
  create(createPeripheralDto: CreatePeripheralDto) {
    return this.peripheral.create({ data: createPeripheralDto });
  }

  findAll() {
    return this.peripheral.findMany();
  }

  findOne(id: string) {
    return this.peripheral.findFirst({ where: { id } });
  }

  update(id: string, updatePeripheralDto: UpdatePeripheralDto) {
    this.findOne(id);
    return this.peripheral.update({ where: { id }, data: updatePeripheralDto });
  }

  remove(id: string) {
    return this.peripheral.delete({ where: { id } });
  }
}
