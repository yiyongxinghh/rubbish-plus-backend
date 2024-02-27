import { Module } from '@nestjs/common';
import { OrderToGarbageService } from './order-to-garbage.service';
import { OrderToGarbageController } from './order-to-garbage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderToGarbage } from './entities/order-to-garbage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderToGarbage])],
  controllers: [OrderToGarbageController],
  providers: [OrderToGarbageService],
  exports: [OrderToGarbageService]
})
export class OrderToGarbageModule { }
