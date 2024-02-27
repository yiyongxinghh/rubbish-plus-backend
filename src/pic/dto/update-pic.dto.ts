import { PartialType } from '@nestjs/mapped-types';
import { CreatePicDto } from './create-pic.dto';

export class UpdatePicDto extends PartialType(CreatePicDto) {}
