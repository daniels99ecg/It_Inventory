import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { AuthUserModule } from 'src/auth_user/auth_user.module';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService],
  imports: [AuthUserModule],
})
export class EmployeesModule {}
