import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm';
import { Garbage } from 'src/garbage/entities/garbage.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class OrderToGarbage {
    @PrimaryGeneratedColumn({ name: 'order_garbage_id' })
    orderGarbageId: number;

    @Column({ name: 'garbage_quantity', type: 'integer' })
    garbageQuantity: number; // 购买废品的数量

    @ManyToOne(() => Order, order => order.orderToGarbage)
    order: Order;

    @ManyToOne(() => Garbage, garbage => garbage.orderToGarbage)
    garbage: Garbage;
}
