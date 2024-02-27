import { Entity, Column, PrimaryGeneratedColumn,OneToOne } from 'typeorm';

@Entity()
export class Panel{
    @PrimaryGeneratedColumn({name:'panel_id'})
    panelId: number;

    @Column({name:'panel_name'})
    panelName: string;

    @Column({name:'panel_description'})
    panelDescription: string;

    @Column({name:'panel_url'})
    panelUrl: string;
}