import { Module } from '@nestjs/common';
import { GarbageService } from './garbage.service';
import { GarbageController } from './garbage.controller';
import { Garbage } from './entities/garbage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderToGarbageModule } from 'src/order-to-garbage/order-to-garbage.module';


@Module({
  imports: [TypeOrmModule.forFeature([Garbage]),OrderToGarbageModule,], 
  controllers: [GarbageController],
  providers: [GarbageService],
  exports: [GarbageService], // 导出服务
})
export class GarbageModule {}
