import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
export class CreateEmployeeDto {
  @ApiProperty({
    example: 'daniel',
    description: 'Add name employee',
  })
  @IsString()
  nameEmployee: string;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  laptopId: string;
  @ApiProperty()
  @IsString()
  displayId: string;
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  peripheralId: string[];
}
