import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthUserDto } from './create-auth_user.dto';

export class UpdateAuthUserDto extends PartialType(CreateAuthUserDto) {}
