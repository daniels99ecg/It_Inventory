import { Controller, Post, Body } from '@nestjs/common';
import { AuthUserService } from './auth_user.service';
import { CreateAuthUserDto } from './dto/create-auth_user.dto';
import { LoginDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Login')
@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('register')
  create(@Body() createAuthUserDto: CreateAuthUserDto) {
    return this.authUserService.create(createAuthUserDto);
  }

  @Post('login')
  loginUser(@Body() LoginDto: LoginDto) {
    return this.authUserService.login(LoginDto);
  }
}
