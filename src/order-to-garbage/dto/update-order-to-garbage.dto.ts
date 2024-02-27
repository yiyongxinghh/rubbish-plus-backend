import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderToGarbageDto } from './create-order-to-garbage.dto';

export class UpdateOrderToGarbageDto extends PartialType(CreateOrderToGarbageDto) {}
