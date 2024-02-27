import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Code {

    @PrimaryGeneratedColumn({name:'code_id'})
    codeId: number

    @Column({name:'code_verification'})
    codeVerification: string;
  
    @Column({name:'code_time'})
    codeTime: Date;
  
    @Column({name:'code_email'})
    codeEmail: string;

    @ManyToOne(() => User, user => user.codes)
    @JoinColumn({ name: "user_id" }) // 自定义外键名
    user:User

}

