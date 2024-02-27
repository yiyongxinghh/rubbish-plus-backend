import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn({ name: 'message_id' })
    messageId: number;

    @Column({ name: 'message_content', type: 'text' })
    messageContent: string;

    @Column({ name: 'message_time', type: 'datetime' })
    messageTime: Date;

    @Column({ name: 'message_is_read', type: 'boolean', default: false })
    messageIsRead: boolean;

    @ManyToOne(() => User, user => user.sentMessages)
    sender: User;

    @ManyToOne(() => User, user => user.receivedMessages)
    recipient: User;

}
