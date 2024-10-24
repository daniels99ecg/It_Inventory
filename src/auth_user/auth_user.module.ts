import { Module } from '@nestjs/common';
import { AuthUserService } from './auth_user.service';
import { AuthUserController } from './auth_user.controller';
import { PrismaClient } from '@prisma/client';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthUserController],
  providers: [PrismaClient, AuthUserService, JwtStrategy],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cofigService: ConfigService) => {
        return {
          secret: cofigService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h',
          },
        };
      },
    }),
  ],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class AuthUserModule {}
