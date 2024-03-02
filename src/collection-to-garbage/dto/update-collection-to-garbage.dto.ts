import { PartialType } from '@nestjs/mapped-types';
import { CreateCollectionToGarbageDto } from './create-collection-to-garbage.dto';

export class UpdateCollectionToGarbageDto extends PartialType(CreateCollectionToGarbageDto) {}
