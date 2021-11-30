import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import TicketCategory from './ticketCategory.entity';

@Entity()
export default class TicketSubCategory {
    @ManyToOne(() => TicketCategory, category => category.ticketCategoryId)
    @JoinColumn({ name: 'ticketSubCategoryId' })
    @PrimaryGeneratedColumn()
    ticketSubCategoryId!: number;
    
    @Column('varchar', { length: 63 })
    description!: string;
    
    @Column({
        type: 'tinyint',
        default: 1
    })
    state!: boolean;
};