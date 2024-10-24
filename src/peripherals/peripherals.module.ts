import { Module } from '@nestjs/common';
import { PeripheralsService } from './peripherals.service';
import { PeripheralsController } from './peripherals.controller';
import { AuthUserModule } from 'src/auth_user/auth_user.module';

@Module({
  controllers: [PeripheralsController],
  providers: [PeripheralsService],
  imports: [AuthUserModule],
})
export class PeripheralsModule {}
