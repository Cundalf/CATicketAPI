import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import TicketSubCategory from './ticketSubCategory.entity';

@Entity()
export default class TicketCategory {
    @PrimaryGeneratedColumn()
    ticketCategoryId!: number;
    
    @Column('varchar', { length: 63 })
    description!: string;
    
    @Column({
        type: 'tinyint',
        default: 1
    })
    state!: boolean;
    
    @OneToMany(() => TicketSubCategory, subCategory => subCategory.ticketSubCategoryId)
    subCategories!: TicketSubCategory[]
};