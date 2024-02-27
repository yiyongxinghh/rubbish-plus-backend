import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,OneToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Garbage } from 'src/garbage/entities/garbage.entity';


@Entity()
export class Comment {
    @PrimaryGeneratedColumn({name:'comment_id'})
    commentId:number

    @Column({name:'comment_content'})
    commentContent:string

    @Column({name:'comment_score'})
    commentScore:number

    @Column({name:'comment_time'})
    commentTime:Date

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({name:'user_id'})
    user:User

    @ManyToOne(() => Garbage, garbage => garbage.comments)
    @JoinColumn({name:'garbage_id'})
    garbage:Garbage
}
