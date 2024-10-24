import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthUserDto } from './dto/create-auth_user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthUserService extends PrismaClient implements OnModuleInit {
  logger = new Logger('AuthService');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connect');
  }
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  async create(createAuthUserDto: CreateAuthUserDto) {
    try {
      const { password, ...userdata } = createAuthUserDto;
      const authCreate = await this.authUser.create({
        data: {
          ...userdata,
          password: bcrypt.hashSync(password, 10),
        },
      });
      delete authCreate.password;
      return { authCreate };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(LoginDto: LoginDto) {
    const { email, password } = LoginDto;

    const userAuth = await this.authUser.findUnique({
      where: { email },
      select: { email: true, password: true },
    });
    if (!userAuth)
      throw new UnauthorizedException(`Credential are not valid ${email}`);

    if (!bcrypt.compareSync(password, userAuth.password))
      throw new UnauthorizedException(`Crediantial are not valid ${password}`);

    return {
      userAuth,
      token: this.getJwtToken({ email: userAuth.email }),
    };
  }
  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
