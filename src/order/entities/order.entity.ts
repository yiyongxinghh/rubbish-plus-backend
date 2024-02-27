import { Garbage } from 'src/garbage/entities/garbage.entity';
import { OrderToGarbage } from 'src/order-to-garbage/entities/order-to-garbage.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Order {
    @PrimaryGeneratedColumn({ name: 'order_id' })
    orderId: number;

    @Column({ name: 'order_date', type: 'datetime' })
    orderDate: Date;

    @Column({ name: 'order_is_sign', type: 'boolean' })
    orderIsSign: boolean;

    @Column({ name: 'order_address' })
    orderAddress: string;

    @Column({ name: 'order_money',type:'double' })
    orderMoney: number;

    @Column({name:'order_description'})
    orderDescription: string;

    @ManyToOne(() => User, user => user.deliveredOrders)
    Recipient: User

    @ManyToOne(() => User,user => user.recipientOrders)
    Deliveryman: User

    @OneToMany(()=>OrderToGarbage,orderToGarbage => orderToGarbage.order)
    orderToGarbage: OrderToGarbage[] // 订单包含的垃圾列表
}
