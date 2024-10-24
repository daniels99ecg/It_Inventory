import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { LaptopsModule } from './laptops/laptops.module';
import { PeripheralsModule } from './peripherals/peripherals.module';
import { DisplaysModule } from './displays/displays.module';
import { AuthUserModule } from './auth_user/auth_user.module';

@Module({
  imports: [
    EmployeesModule,
    LaptopsModule,
    PeripheralsModule,
    DisplaysModule,
    AuthUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
