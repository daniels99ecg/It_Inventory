import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { authUser, PrismaClient } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly AuthModel: PrismaClient,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<authUser> {
    const { email } = payload;
    const user = await this.AuthModel.authUser.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException('Token not valid');
    if (!user.isActive)
      throw new UnauthorizedException(
        'User is inactive, talk with an super Admin',
      );

    return user;
  }
}
