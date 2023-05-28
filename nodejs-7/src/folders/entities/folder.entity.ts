import { UserEntity } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('folders')
export default class FolderEntity {
    @PrimaryGeneratedColumn('increment') // uuid
    id: number;

    @Column({ type: 'character varying' })
    name: string;

    @ManyToOne(() => UserEntity, user => user.folders)
    user: UserEntity;
}