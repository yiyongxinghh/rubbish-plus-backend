import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  async findAll(@Query() query: { page: number, pageSize: number, senderId: number, recipientId: number }) {
    const { page, pageSize, senderId, recipientId } = query
    const messages = await this.messageService.findAll(page, pageSize, senderId, recipientId);
    console.log(messages);

    const groupedMessages = [];
    messages.forEach((item) => {
      const existingGroup = groupedMessages.find((group) => {
        const senderId = group.messages[0].senderId;
        const recipientId = group.messages[0].recipientId;
        return (senderId === item.recipientId && recipientId === item.senderId) ||
          (senderId === item.senderId && recipientId === item.recipientId);
      });
      const message = {
        messageId: item.messageId,
        messageContent: item.messageContent,
        messageTime: item.messageTime,
        messageIsRead: item.messageIsRead,
        recipientId: item.recipientId,
        senderId: item.senderId,
      };
      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        groupedMessages.push({
          userName: [item.senderName, item.recipientName],
          userId: [item.senderId, item.recipientId],
          messages: [message],
        });
      }
    });
    const total = await this.messageService.getTotal()
    return { groupedMessages, total }
  }

  @Post('time')
  findTimed(@Body() date: { start: Date, end: Date }) {
    const { start, end } = date
    return this.messageService.findTimed(start, end);
  }

  @Post('topFive')
  findTopFive() {
    return this.messageService.findTopFive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
