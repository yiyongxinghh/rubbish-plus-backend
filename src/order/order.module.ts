import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderToGarbage } from 'src/order-to-garbage/entities/order-to-garbage.entity';
import { GarbageModule } from 'src/garbage/garbage.module';

@Module({
  imports:[TypeOrmModule.forFeature([Order]),TypeOrmModule.forFeature([OrderToGarbage]),GarbageModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
