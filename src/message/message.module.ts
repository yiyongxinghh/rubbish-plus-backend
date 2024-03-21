import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoEasyHttpService } from 'src/events/goeasy.message';

@Module({
  controllers: [MessageController],
  providers: [MessageService,GoEasyHttpService],
  imports: [TypeOrmModule.forFeature([Message])], 
  exports: [MessageService]
})
export class MessageModule {}
