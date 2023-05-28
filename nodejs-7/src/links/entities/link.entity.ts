import { UserEntity } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('links')
export default class LinkEntity {
    @PrimaryGeneratedColumn('increment') // uuid
    id: number;

    @Column({ type: 'character varying', nullable: true })
    name?: string;

    @Column({ type: 'character varying', length: 100, nullable: true })
    shortName?: string;

    @ManyToOne(() => UserEntity, user => user.links)
    user?: UserEntity;
}