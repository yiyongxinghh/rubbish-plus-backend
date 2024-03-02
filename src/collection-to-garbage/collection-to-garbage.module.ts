import { Module } from '@nestjs/common';
import { CollectionToGarbageService } from './collection-to-garbage.service';
import { CollectionToGarbageController } from './collection-to-garbage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionToGarbage } from './entities/collection-to-garbage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionToGarbage])], 
  controllers: [CollectionToGarbageController],
  providers: [CollectionToGarbageService],
})
export class CollectionToGarbageModule {}
