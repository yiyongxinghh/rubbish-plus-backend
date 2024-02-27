import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../message/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  private userList = [];

  constructor(private readonly messageService: MessageService) { }

  @WebSocketServer()
  server: Server;


  /**
   * 接受用户发送的消息 并返回给该用户指定的用户消息
   * 并将消息存到数据库
   * @param data 消息数据
   * @returns 
   */
  @SubscribeMessage('message-send')
  async findAll(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(data.data);
    const messageData = data.data.messageObject
    const target = this.server.sockets.sockets.get(client.id);
    if (data.data.sender && data.data.recipient) {
      const sender = data.data.sender
      const recipient = data.data.recipient
      const senderTarget = this.server.sockets.sockets.get(sender.id);
      const recipientTarget = this.server.sockets.sockets.get(recipient.id);
      senderTarget.emit('message-over', messageData);
      recipientTarget.emit('message-over', messageData);
    }else{
      console.log(client.id, 'over'); // 输出连接的socket的ID
      target.emit('message-over', messageData);
    }
    
    const message = await this.messageService.create(messageData);
    if(message) target.emit('request-data');
    
  }

  /**
   * 加载连接过来的用户，将其加工成以连接的用户列表并将其返回
   * @param data 消息数据
   * @param client 指定用户的socket
   * @returns 
   */
  @SubscribeMessage('onload')
  onload(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    console.log(client.id, 'connected'); // 输出连接的socket的ID
    const userInfo = this.userList.find((user) => user.userId === data.userId);
    if (userInfo) {
      userInfo.id = client.id;
    } else {
      this.userList.push({
        id: client.id,
        userId: data.userId,
      });
    }

    return this.server.emit('load', this.userList);
  }


}