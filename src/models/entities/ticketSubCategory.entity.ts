import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class TicketSubCategory {
    @PrimaryGeneratedColumn()
    ticketSubCategoryId!: number;
    @Column()
    description!: string;
    @Column()
    state!: boolean;
};