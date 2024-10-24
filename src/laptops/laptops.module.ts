import { Module } from '@nestjs/common';
import { LaptopsService } from './laptops.service';
import { LaptopsController } from './laptops.controller';
import { AuthUserModule } from 'src/auth_user/auth_user.module';

@Module({
  controllers: [LaptopsController],
  providers: [LaptopsService],
  imports: [AuthUserModule],
})
export class LaptopsModule {}
