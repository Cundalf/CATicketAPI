import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import Ticket from './ticket.entity';

@Entity()
export default class TicketUpdate {
    @PrimaryGeneratedColumn()
    ticketUpdateId!: number;
    
    @ManyToOne(() => Ticket, ticket => ticket.ticketId)
    @JoinColumn({ name: "ticketId" })
    @PrimaryColumn()
    ticketId!: number;
    
    @Column('text')
    ticketUpdate!: string;
    
    @Column({
        type: 'tinyint',
        default: 1
    })
    state!: boolean;
};