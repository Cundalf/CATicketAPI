import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Order {
    @PrimaryGeneratedColumn()
    orderId!: number;

    @Column()
    solicitationId!: number;
    
    @Column({ type: 'date' })
    orderDate!: Date;

    @Column({
        type: 'tinyint',
        default: 1
    })
    state!: boolean;
};