import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { GoEasyHttpService } from './goeasy.message';
import { MessageModule } from '../message/message.module';


@Module({
    imports: [MessageModule],
    providers: [EventsGateway,GoEasyHttpService],
})
export class EventsModule { }