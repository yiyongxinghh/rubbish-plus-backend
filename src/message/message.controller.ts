import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { GoEasyHttpService } from '../events/goeasy.message'
import * as dayjs from 'dayjs';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService, private readonly goEasyHttpService: GoEasyHttpService) { }

  @Post()
  async create(@Query('channel') channel:string,@Body() createMessageDto: CreateMessageDto) {
    console.log(channel,createMessageDto);
    await this.goEasyHttpService.sendMessage(channel,createMessageDto.messageContent)
    return this.messageService.create(createMessageDto);
  }

  /**
   * GET 根据发送者id和接收者id,查询所有消息,自带分页
   * @param query 
   * @returns 
   */
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

  /**
   * GET 根据用户id获取所有聊天信息列表
   * @param id 
   * @returns 
   */
  @Get('/user')
  async findByUserId(@Query('userId') id: number) {
    const messages = await this.messageService.findMessagesById(id);
    const groupedMessages = [];
    messages.forEach((item) => {
      const existingGroup = groupedMessages.find((group) => {
        return group.userName.includes(item.senderName) && group.userName.includes(item.recipientName);
      });
      if (!existingGroup) {
        groupedMessages.push({
          userName: [item.senderName, item.recipientName],
          userId: [item.senderId, item.recipientId],
          message: item.messageContent,
          time: dayjs(item.messageTime).format('YYYY-MM-DD')
        })
      }
    })
    return groupedMessages
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
