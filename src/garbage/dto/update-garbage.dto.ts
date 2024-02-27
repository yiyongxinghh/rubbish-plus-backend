import { PartialType } from '@nestjs/mapped-types';
import { CreateGarbageDto } from './create-garbage.dto';

export class UpdateGarbageDto extends PartialType(CreateGarbageDto) {
  garbageId: number;
}
