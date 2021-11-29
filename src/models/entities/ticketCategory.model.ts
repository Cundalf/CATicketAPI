import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import TicketSubCategory from "./ticketSubCategory.entity";

@Entity()
export default class TicketCategory {
    @PrimaryGeneratedColumn()
    ticketCategoryId!: number;
    @Column()
    description!: string;
    @Column()
    state!: boolean;

    @OneToMany(() => TicketSubCategory, subCategory => subCategory.ticketSubCategoryId)
    subCategories!: TicketSubCategory[]
};

//TicktCategory.hasMany(ticketSubCategory);