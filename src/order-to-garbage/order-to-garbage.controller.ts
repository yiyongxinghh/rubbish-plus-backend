import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderToGarbageService } from './order-to-garbage.service';
import { CreateOrderToGarbageDto } from './dto/create-order-to-garbage.dto';
import { UpdateOrderToGarbageDto } from './dto/update-order-to-garbage.dto';

@Controller('order-to-garbage')
export class OrderToGarbageController {
  constructor(private readonly orderToGarbageService: OrderToGarbageService) {}

  @Post()
  create(@Body() createOrderToGarbageDto: CreateOrderToGarbageDto) {
    return this.orderToGarbageService.create(createOrderToGarbageDto);
  }

  @Get()
  findAll() {
    return this.orderToGarbageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderToGarbageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderToGarbageDto: UpdateOrderToGarbageDto) {
    return this.orderToGarbageService.update(+id, updateOrderToGarbageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderToGarbageService.remove(+id);
  }
}
