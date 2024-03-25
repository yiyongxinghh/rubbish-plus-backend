import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from 'typeorm';
import { Code } from '../../code/entities/code.entity';
import { Pic } from 'src/pic/entities/pic.entity';
import { Garbage } from 'src/garbage/entities/garbage.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Message } from 'src/message/entities/message.entity';
import { Order } from 'src/order/entities/order.entity';
import { Collection } from 'src/collection/entities/collection.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number

    @Column({ name: 'user_name' })
    userName: string

    @Column({ name: 'user_pass' })
    userPass: string

    @Column({
        name: 'user_phone',
        unique: true
    })
    userPhone: string

    @Column({
        name: 'user_email',
        unique: true
    })
    userEmail: string

    @Column({ name: 'user_address' })
    userAddress: string

    @Column({
        name: 'user_rank',
        default: 0,
        comment:'0普通用户,1配送员,2管理员'
    })
    userRank: number

    @Column({
        name: 'user_amount',
        type: 'double',
        default: 0
    })
    userAmount: number

    @OneToMany(() => Code, code => code.user)
    codes: Code[]

    @OneToOne(() => Pic, pic => pic.user)
    @JoinColumn({ name: "pic_id"})
    pic: Pic

    @OneToMany(()=>Collection, collection => collection.user)
    collections: Collection[]

    @OneToMany(() => Garbage, garbage => garbage.user)
    garbages: Garbage[]

    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[]

    @OneToMany(() => Message, message => message.sender)
    sentMessages: Message[];

    @OneToMany(() => Message, message => message.recipient)
    receivedMessages: Message[];

    @OneToMany(() => Order, order => order.Recipient)
    recipientOrders: Order[] // 用户作为收件人的订单

    @OneToMany(() => Order, order => order.Deliveryman)
    deliveredOrders: Order[] // 用户作为配送员的订单

}
