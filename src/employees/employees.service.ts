/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EmployeesService extends PrismaClient implements OnModuleInit {
  logger = new Logger('EmployeeServices');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connect');
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      if (createEmployeeDto.laptopId) {
        const laptopExists = await this.laptop.findUnique({
          where: { id: createEmployeeDto.laptopId },
        });

        if (!laptopExists) {
          throw new NotFoundException(
            `Laptop with ID ${createEmployeeDto.laptopId} not found`,
          );
        }
      }
      if (createEmployeeDto.displayId) {
        const deviceExists = await this.display.findUnique({
          where: { id: createEmployeeDto.displayId },
        });

        if (!deviceExists) {
          throw new NotFoundException(
            `Device with ID ${createEmployeeDto.displayId} not found`,
          );
        }
      }

      if (
        createEmployeeDto.peripheralId &&
        createEmployeeDto.peripheralId.length > 0
      ) {
        const peripheralsExist = await this.peripheral.findMany({
          where: {
            id: {
              in: createEmployeeDto.peripheralId,
            },
          },
        });

        if (peripheralsExist.length !== createEmployeeDto.peripheralId.length) {
          throw new NotFoundException(
            `Peripherals with ID ${createEmployeeDto.peripheralId} not found`,
          );
        }
      }

      const employee = await this.employee.create({
        data: createEmployeeDto,
      });

      return employee;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const employees = await this.employee.findMany({
      include: {
        laptop: {
          select: {
            id: false,
            name: true,
          },
        },
        display: {
          select: {
            id: false,
            name: true,
          },
        },
        peripheral: {
          select: {
            id: false,
            name: true,
          },
        },
      },
    });
    return employees.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ peripheralId, laptopId, displayId, ...rest }) => rest,
    );
  }

  async findOne(id: string) {
    const employee = await this.employee.findFirst({
      where: { id },
      include: { laptop: true, display: true, peripheral: true },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const { peripheralId, laptopId, displayId, ...rest } = employee;
    return rest;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    await this.findOne(id);

    return this.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: string) {
    const deleteEmployee = await this.employee.findUnique({ where: { id } });
    if (!deleteEmployee) throw new NotFoundException('Employee not found');
    await this.employee.delete({ where: { id } });

    return `Delete employee: ${deleteEmployee.nameEmployee} with email ${deleteEmployee.email}`;
  }
}
