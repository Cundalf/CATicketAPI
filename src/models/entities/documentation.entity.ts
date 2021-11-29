import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import TicketCategory from './ticketCategory.model';

@Entity()
export default class Documentation {
    @PrimaryGeneratedColumn()
    documentationId!: number;
    @ManyToOne(() => TicketCategory, category => category.ticketCategoryId)
    category!: number;
    @Column()
    subCategory!: number;
    @Column()
    task!: number;
    @Column()
    path!: string;
    @Column()
    state!: boolean;
};

//Documentation.belongsTo(categoryModel, { foreignKey: 'category' });
//Documentation.belongsTo(subCategoryModel, { foreignKey: 'subCategory' });
