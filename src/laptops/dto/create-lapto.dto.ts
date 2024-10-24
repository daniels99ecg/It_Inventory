import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateLaptoDto {
  @ApiProperty()
  @IsString()
  name: string;
}
