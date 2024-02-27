import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GarbageService } from 'src/garbage/garbage.service';

interface GarbageItem {
  id: number;
  quantity: number;
}

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly garbageService: GarbageService,) { }

  @Post()
  async create(@Body('order') createOrderDto: CreateOrderDto, @Body('garbage') garbageItems: GarbageItem[]) {
    return this.orderService.create(createOrderDto, garbageItems);
  }

  @Post('findUserAllOrder')
  findUserAllOrder(@Body() body: { userId: number, userRank: number, page: number, pageSize: number }) {
    const { userId, userRank, page, pageSize } = body
    return this.orderService.findUserAllOrder(userId, userRank, page, pageSize);
  }




  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
