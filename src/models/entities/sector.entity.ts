import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Sector {
    @PrimaryGeneratedColumn()
    sectorId!: number;
    
    @Column('varchar', { length: 63 })
    description!: string;
    
    @Column({
        type: 'tinyint',
        default: 1
    })
    state!: boolean;
};