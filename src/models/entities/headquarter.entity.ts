import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Headquarter {
    @PrimaryGeneratedColumn()
    headquarterId!: number;
    
    @Column('varchar', { length: 63 })
    description!: string;
    
    @Column('varchar', { length: 8 })
    ipRange!: string;
    
    @Column({
        type: 'tinyint',
        default: 1
    })
    state!: boolean;
};