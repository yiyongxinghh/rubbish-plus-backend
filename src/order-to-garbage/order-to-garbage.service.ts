import { Injectable } from '@nestjs/common';
import { CreateOrderToGarbageDto } from './dto/create-order-to-garbage.dto';
import { UpdateOrderToGarbageDto } from './dto/update-order-to-garbage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderToGarbage } from './entities/order-to-garbage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderToGarbageService {
  constructor(@InjectRepository(OrderToGarbage) private readonly orderToGarbage: Repository<OrderToGarbage>){}

  create(createOrderToGarbageDto: CreateOrderToGarbageDto) {
    return 'This action adds a new orderToGarbage';
  }

  /**
   * 获取指定id组的所有结果
   * @param ids 
   * @returns 
   */
  findIds(ids:string[]) {
    return this.orderToGarbage.createQueryBuilder().where("garbageGarbageId in (:...ids)", { ids }).getMany();
  }

  /**
   * 删除指定id组的所有结果
   * @param ids 
   * @returns 
   */
  deleteIds(ids:string[]) {
    return this.orderToGarbage.createQueryBuilder().delete().from(OrderToGarbage)
    .where("garbageGarbageId in (:...ids)", { ids }).execute();
  }

  findAll() {
    return `This action returns all orderToGarbage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderToGarbage`;
  }

  update(id: number, updateOrderToGarbageDto: UpdateOrderToGarbageDto) {
    return `This action updates a #${id} orderToGarbage`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderToGarbage`;
  }
}
