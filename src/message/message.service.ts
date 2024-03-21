import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import GoEasy from 'goeasy'

@Injectable()
export class MessageService {
  constructor(@InjectRepository(Message) private readonly message: Repository<Message>) { }

  create(createMessageDto: CreateMessageDto) {
    return this.message.save(createMessageDto);
  }

  /**
   * 根据发送者id和接收者id,查询所有消息,自带分页
   * @param page 
   * @param pageSize 
   * @param userId 
   * @returns 
   */
  findAll(page: number, pageSize: number, senderId: number, recipientId: number) {
    if (page && pageSize) {
      return this.message.createQueryBuilder('message')
        .leftJoinAndSelect('message.sender', 'sender')
        .leftJoinAndSelect('message.recipient', 'recipient')
        .select([
          'sender.userId AS senderId',
          'sender.userName AS senderName',
          'message.messageId AS messageId',
          'recipient.userId AS recipientId',
          'recipient.userName AS recipientName',
          'message.messageContent AS messageContent',
          'message.messageTime AS messageTime',
          'message.messageIsRead AS messageIsRead',
        ])
        .where('message.recipient = :recipientId', { recipientId }).andWhere('message.sender = :senderId', { senderId })
        .orWhere('message.sender = :recipientId', { recipientId }).andWhere('message.recipient = :senderId', { senderId })
        .orderBy('message.messageTime', 'ASC')
        .skip((page - 1) * pageSize).take(pageSize).getRawMany();
    }
    else {
      return this.message.createQueryBuilder('message')
        .leftJoinAndSelect('message.sender', 'sender')
        .leftJoinAndSelect('message.recipient', 'recipient')
        .select([
          'sender.userId AS senderId',
          'sender.userName AS senderName',
          'recipient.userId AS recipientId',
          'recipient.userName AS recipientName',
          'message.messageId AS messageId',
          'message.messageContent AS messageContent',
          'message.messageTime AS messageTime',
          'message.messageIsRead AS messageIsRead',
        ])
        .where('message.recipient = :recipientId', { recipientId }).andWhere('message.sender = :senderId', { senderId })
        .orWhere('message.sender = :recipientId', { recipientId }).andWhere('message.recipient = :senderId', { senderId })
        .orderBy('message.messageTime', 'ASC')
        .getRawMany();
    }
  }

  /**
   * 通过指定用户id，获取所有与其聊天的用户
   * @param userId 
   * @returns 
   */
  findMessagesById(userId: number) {
    return this.message.createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.recipient', 'recipient')
      .select([
        'sender.userId AS senderId',
        'sender.userName AS senderName',
        'recipient.userId AS recipientId',
        'recipient.userName AS recipientName',
        'message.messageId AS messageId',
        'message.messageContent AS messageContent',
        'message.messageTime AS messageTime',
        'message.messageIsRead AS messageIsRead',
      ])
      .where('message.recipient = :userId', { userId })
      .orWhere('message.sender = :userId', { userId })
      .orderBy('message.messageTime', 'DESC')
      .getRawMany();
  }

  /**
   * 查询指定时间内的消息
   * @param start 
   * @param end 
   * @returns 
   */
  findTimed(start: Date, end: Date) {
    return this.message.createQueryBuilder().where("message_time >= :start AND message_time <= :end", { start, end }).getMany();
  }

  /**
   * 查询最新的前五条消息
   * @returns 
   */
  findTopFive() {
    return this.message.createQueryBuilder('message')
      .innerJoinAndSelect('message.sender', 'user')
      .orderBy('message_time', 'DESC').limit(5).getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  getTotal() {
    return this.message.createQueryBuilder().getCount() // 获取总数量
  }
}
