import { Module } from '@nestjs/common';
import { DisplaysService } from './displays.service';
import { DisplaysController } from './displays.controller';
import { AuthUserModule } from 'src/auth_user/auth_user.module';

@Module({
  controllers: [DisplaysController],
  providers: [DisplaysService],
  imports: [AuthUserModule],
})
export class DisplaysModule {}
