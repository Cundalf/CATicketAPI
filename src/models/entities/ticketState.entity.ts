import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class TicketState {
    @PrimaryGeneratedColumn()
    ticketStateId!: number;
    
    @Column('varchar', { length: 63 })
    description!: string;
    
    @Column({
        type: 'tinyint',
        default: 1
    })
    state!: boolean;
};