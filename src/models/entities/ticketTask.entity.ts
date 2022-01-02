import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import TicketSubCategory from './ticketSubCategory.entity';

@Entity()
export default class TicketTask {
    @PrimaryGeneratedColumn()
    ticketTaskId!: number;
    
    @ManyToOne(() => TicketSubCategory, subCategory => subCategory.ticketSubCategoryId)
    @JoinColumn({ name: 'ticketTaskSubCategory' })
    @Column()
    ticketTaskSubCategory!: number;
    
    @Column('varchar', { length: 63 })
    description!: string;
    
    @Column({
        type: 'tinyint',
        default: 1
    })
    state!: boolean;
};