import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDisplayDto {
  @ApiProperty()
  @IsString()
  name: string;
}
