import FolderEntity from '../../folders/entities/folder.entity';
import LinkEntity from '../../links/entities/link.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @OneToMany(() => LinkEntity, link => link.user)
    links: LinkEntity[];

    @OneToMany(() => FolderEntity, link => link.user)
    folders: FolderEntity[];
}
