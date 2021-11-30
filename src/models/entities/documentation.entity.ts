import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import TicketCategory from './ticketCategory.entity';
import TicketSubCategory from './ticketSubCategory.entity';

@Entity()
export default class Documentation {
    @PrimaryGeneratedColumn()
    documentationId!: number;
    
    @ManyToOne(() => TicketCategory, category => category.ticketCategoryId)
    @JoinColumn({ name: "category" })
    @Column()
    category!: number;
    
    @ManyToOne(() => TicketSubCategory, subCategory => subCategory.ticketSubCategoryId)
    @JoinColumn({ name: "subCategory" })
    @Column()
    subCategory!: number;
    
    @Column('varchar', { length: 127 })
    task!: number;
    
    @Column('text')
    path!: string;
    
    @Column({
        type: 'tinyint',
        default: 1
    })
    state!: boolean;
};