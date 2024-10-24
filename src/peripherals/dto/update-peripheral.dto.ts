import { PartialType } from '@nestjs/mapped-types';
import { CreatePeripheralDto } from './create-peripheral.dto';

export class UpdatePeripheralDto extends PartialType(CreatePeripheralDto) {}
