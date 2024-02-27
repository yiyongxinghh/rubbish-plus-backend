import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany, ManyToMany } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { Pic } from 'src/pic/entities/pic.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderToGarbage } from 'src/order-to-garbage/entities/order-to-garbage.entity';

@Entity()
export class Garbage {

    @PrimaryGeneratedColumn({ name: 'garbage_id' })
    garbageId: number;

    @Column({ name: 'garbage_name' })
    garbageName: string;

    @Column({ name: 'garbage_type' })
    garbageType: string;

    @Column({ name: 'garbage_amount' })
    garbageAmount: number;

    @Column({ name: 'garbage_price', type: 'double' })
    garbagePrice: number;

    @Column({ name: 'garbage_score', type: 'smallint', default: 0 })
    garbageScore: number;

    @Column({ name: 'garbage_description', type: 'text'})
    garbageDescription: string;

    @ManyToOne(() => Category, category => category.garbages)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => User, user => user.garbages)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToOne(() => Pic, pic => pic.garbage)
    @JoinColumn({ name: 'pic_id' })
    pic: Pic;

    @OneToMany(() => Comment, comment => comment.garbage)
    comments: Comment[];

    @OneToMany(()=>OrderToGarbage,orderToGarbage=>orderToGarbage.garbage)
    orderToGarbage: OrderToGarbage[] // 订单包含的垃圾列表
}
