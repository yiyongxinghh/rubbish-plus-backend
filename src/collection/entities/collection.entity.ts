import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CollectionToGarbage } from 'src/collection-to-garbage/entities/collection-to-garbage.entity';


@Entity()
export class Collection {
    @PrimaryGeneratedColumn({name:'collection_id'})
    collectionId: number;

    @Column({name:'collection_name'})
    collectionName: string;
    
    @ManyToOne(()=>User, user=>user.collections)
    @JoinColumn({ name: "user_id"})
    user: User;
    
    @OneToMany(()=>CollectionToGarbage, collectionToGarbages=>collectionToGarbages.collection)
    collectionToGarbages: CollectionToGarbage[];
}
