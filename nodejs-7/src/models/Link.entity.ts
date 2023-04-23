import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('links')
export default class Link {
    @PrimaryGeneratedColumn('increment') // uuid
    id: number;

    @Column({ type: 'character varying', nullable: true })
    name?: string;

    @Column({ type: 'character varying', length: 100, nullable: true })
    shortName?: string;
}