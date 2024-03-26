import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderToGarbageService } from './order-to-garbage.service';
import { CreateOrderToGarbageDto } from './dto/create-order-to-garbage.dto';
import { UpdateOrderToGarbageDto } from './dto/update-order-to-garbage.dto';

@Controller('order-to-garbage')
export class OrderToGarbageController {
  constructor(private readonly orderToGarbageService: OrderToGarbageService) {}

  /**
   * POST 创建订单和废品连接
   * @param createOrderToGarbageDto 
   * @returns 
   */
  @Post()
  create(@Body() createOrderToGarbageDto: CreateOrderToGarbageDto) {
    return this.orderToGarbageService.create(createOrderToGarbageDto);
  }

  /**
   * GET 获取所有订单和废品连接
   * @returns 
   */
  @Get()
  findAll() {
    return this.orderToGarbageService.findAll();
  }

  /**
   * GET 获取单个订单和废品连接
   * @param id 
   * @returns 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderToGarbageService.findOne(+id);
  }

  /**
   * PATCH 更新订单和废品连接
   * @param id 
   * @param updateOrderToGarbageDto 
   * @returns 
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderToGarbageDto: UpdateOrderToGarbageDto) {
    return this.orderToGarbageService.update(+id, updateOrderToGarbageDto);
  }

  /**
   * DELETE 删除订单和废品连接
   * @param id 
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderToGarbageService.remove(+id);
  }
}
