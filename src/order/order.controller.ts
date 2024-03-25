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

  /**
   * POST 创建购买订单
   * @param createOrderDto 
   * @param garbageItems 
   * @returns 
   */
  @Post()
  async create(@Body('order') createOrderDto: CreateOrderDto, @Body('garbage') garbageItems: GarbageItem[]) {
    return this.orderService.create(createOrderDto, garbageItems);
  }

  /**
   * POST 创建回收订单
   * @param createOrderDto 
   * @returns 
   */
  @Post('/recover')
  async createRecover(@Body() createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    return this.orderService.createRecover(createOrderDto);
  }

  /**
   * POST 获取用户所有订单，自带分页
   * @param body 
   * @returns 
   */
  @Post('findUserAllOrder')
  findUserAllOrder(@Body() body: { userId: number, userRank: number}) {
    const { userId, userRank} = body
    return this.orderService.findUserAllOrder(userId, userRank);
  }

  /**
   * GET 获取订单总数量
   * @returns 
   */
  @Get('count')
  getTotal() {
    return this.orderService.getTotal();
  }

  /**
   * GET 获取所有配送者为空的订单
   * @returns 
   */
  @Get('nullDeliveryman')
  findNullDeliveryman(){
    return this.orderService.findNullDeliveryman();
  }

  /**
   * GET 获取指定订单
   * @param id 
   * @returns 
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  /**
   * PATCH 更新订单状态
   * @param id 
   * @param updateOrderDto 
   * @returns 
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  /**
   * DELETE 删除订单
   * @param id 
   * @returns 
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
