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
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
@ApiTags('Employee')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: 201,
    description: 'Employee created successfully',
    type: Employee,
  })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiResponse({
    status: 200,
    description: 'Get all list employee',
  })
  @ApiResponse({
    status: 404,
    description: 'No employees found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid parameters',
  })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
