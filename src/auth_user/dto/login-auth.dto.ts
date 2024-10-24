import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'daniel@gmail.com',
    description: 'Add email validation',
  })
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '123456789',
    description: 'Add password validation',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}
