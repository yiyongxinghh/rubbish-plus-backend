import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Garbage } from 'src/garbage/entities/garbage.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn({name:'category_id'})
    categoryId: number;

    @Column({name:'category_name'})
    categoryName: string;

    @OneToMany(()=> Garbage, garbage => garbage.category)
    garbages: Garbage[];
}

