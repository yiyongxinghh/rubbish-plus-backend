import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { MessageModule } from '../message/message.module';


@Module({
    imports: [MessageModule],
    providers: [EventsGateway],
})
export class EventsModule { }