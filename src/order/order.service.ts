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
   * 创建购买订单
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
   * 创建回收订单
   * @param createOrderDto 
   * @returns 
   */
  async createRecover(createOrderDto: CreateOrderDto,){
    return this.order.createQueryBuilder().insert().into(Order).values(createOrderDto).execute();
  }

  /**
   * 获取指定用户id的所有订单
   * @param userId 
   * @param userRank 
   * @param page 
   * @param pageSize 
   * @returns 
   */
  findUserAllOrder(userId: number, userRank: number) {
    if (userRank === 0) {
      return this.order.createQueryBuilder('order')
        .leftJoinAndSelect('order.orderToGarbage', 'orderToGarbage')
        .leftJoinAndSelect('orderToGarbage.garbage', 'garbage')
        .leftJoinAndSelect('garbage.pic', 'pic')
        .where('order.Recipient = :userId', { userId })
        .getMany();
    } else if (userRank === 1) {
      return this.order.createQueryBuilder('order')
        .leftJoinAndSelect('order.orderToGarbage', 'orderToGarbage')
        .leftJoinAndSelect('orderToGarbage.garbage', 'garbage')
        .leftJoinAndSelect('garbage.pic', 'pic')
        .where('order.Deliveryman = :userId', { userId })
        .getMany();
    }
  }

  /**
   * 获取所有配送者为空的订单
   * @returns 
   */
  findNullDeliveryman(){
    return this.order.createQueryBuilder('order')
      .leftJoinAndSelect('order.Recipient', 'recipient')
      .where('order.Deliveryman is null')
      .getMany();
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