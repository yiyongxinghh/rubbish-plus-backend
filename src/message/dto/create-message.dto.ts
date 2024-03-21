import { User } from "src/user/entities/user.entity";

export class CreateMessageDto {

    messageId: number;

    messageContent: string;

    messageTime: Date;

    messageIsRead: boolean;

    sender: User;

    recipient: User;
}
