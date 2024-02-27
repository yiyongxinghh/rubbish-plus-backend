import { Entity, Column, PrimaryGeneratedColumn,OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Garbage } from 'src/garbage/entities/garbage.entity';

enum picTypeEnum{
    userPic='userPic',
    backPic='backPic',
    goodPic='goodPic'
}

@Entity()
export class Pic {
    @PrimaryGeneratedColumn({name:'pic_id'})
    picId: number

    @Column({name:'pic_url'})
    picUrl: string;
    
    
    @Column({name:'pic_type',default:picTypeEnum.userPic})
    picType: picTypeEnum;

    @OneToOne(() => User, user => user.pic)
    user: User;

    @OneToOne(()=>Garbage,garbage=>garbage.pic)
    garbage:Garbage;
}
