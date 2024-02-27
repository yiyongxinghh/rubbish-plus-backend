import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderToGarbage } from 'src/order-to-garbage/entities/order-to-garbage.entity';
import { GarbageService } from 'src/garbage/garbage.service';

interface GarbageItem {
  id: number;
  quantity: number;
}

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly order: Repository<Order>,
    @InjectRepository(OrderToGarbage) private readonly orderToGarbage: Repository<OrderToGarbage>,
    private garbageService: GarbageService,) { }

  /**
   * 创建订单
   * @param createOrderDto 
   * @param garbageItems 
   */
  async create(createOrderDto: CreateOrderDto, garbageItems: GarbageItem[]) {
    const orderItem = await this.order.createQueryBuilder().insert().into(Order).values(createOrderDto).execute();
    const orderEntity = await this.findOne(orderItem.identifiers[0].orderId)
    for (const item of garbageItems) {
      const garbageEntity = await this.garbageService.findOne(item.id);
      await this.orderToGarbage.createQueryBuilder().insert().into(OrderToGarbage).values({
        order: orderEntity,
        garbage: garbageEntity,
        garbageQuantity: item.quantity
      }).execute();
    }
  }

  /**
   * 获取指定用户id的所有订单
   * @param userId 
   * @param userRank 
   * @param page 
   * @param pageSize 
   * @returns 
   */
  findUserAllOrder(userId: number, userRank: number, page: number, pageSize: number) {
    if (userRank === 0) {
      return this.order.createQueryBuilder('order')
        .innerJoinAndSelect('order.orderToGarbage', 'orderToGarbage')
        .innerJoinAndSelect('orderToGarbage.garbage', 'garbage')
        .where('order.Recipient = :userId', { userId })
        .skip((page - 1) * pageSize).take(pageSize).getMany();
    } else if (userRank === 1) {
      return this.order.createQueryBuilder('order')
        .innerJoinAndSelect('order.orderToGarbage', 'orderToGarbage')
        .innerJoinAndSelect('orderToGarbage.garbage', 'garbage')
        .where('order.Deliveryman = :userId', { userId })
        .skip((page - 1) * pageSize).take(pageSize).getMany();
    }
  }

  findOne(id: number) {
    return this.order.createQueryBuilder().where("order_id = :id", { id }).getOne();
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.order.createQueryBuilder().update(Order).set(updateOrderDto).where("order_id = :id", { id }).execute();
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  getTotal() {
    return this.order.createQueryBuilder().getCount() // 获取总数量
  }
}