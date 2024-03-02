import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn } from 'typeorm';
import { Collection } from 'src/collection/entities/collection.entity';
import { Garbage } from 'src/garbage/entities/garbage.entity';

@Entity()
export class CollectionToGarbage {

    @PrimaryGeneratedColumn({name:'collection_to_garbage_id'})
    collectionToGarbageId: number;

    @ManyToOne(()=>Collection, collection=>collection.collectionToGarbages)
    collection: Collection;

    @ManyToOne(()=>Garbage, collection=>collection.collectionToGarbages)
    garbage: Garbage;
}
