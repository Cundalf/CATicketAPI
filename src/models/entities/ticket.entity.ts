import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import Headquarter from './headquarter.entity';
import Priority from './priority.entity';
import Employee from './employee.entity';
import User from './user.entity';
import TicketCategory from './ticketCategory.entity';
import TicketSubCategory from './ticketSubCategory.entity';
import TicketTask from './ticketTask.entity';
import Sector from './sector.entity';
import TicketState from './ticketState.entity';
import Order from './order.entity';
import TicketUpdate from './ticketUpdate.entity';

@Entity()
export default class Ticket {
    @PrimaryGeneratedColumn()
    ticketId!: number;

    @Column({ type: 'date' })
    ticketDate!: Date;

    @Column({ type: 'time' })
    ticketTime!: Date;

    @ManyToOne(() => Headquarter, headquarter => headquarter.headquarterId)
    @JoinColumn({ name: "ticketHeadquarter" })
    @Column()
    ticketHeadquarter!: number;

    @ManyToOne(() => Priority, priority => priority.priorityId)
    @JoinColumn({ name: "ticketPriority" })
    @Column()
    ticketPriority!: number;

    @ManyToOne(() => Employee, employee => employee.employeeId)
    @JoinColumn({ name: "ticketEmployee" })
    @Column()
    ticketEmployee!: number;

    @ManyToOne(() => User, user => user.userId)
    @JoinColumn({ name: "ticketUserCreator" })
    @Column()
    ticketUserCreator!: number;

    @ManyToOne(() => TicketCategory, category => category.ticketCategoryId)
    @JoinColumn({ name: "ticketCategory" })
    @Column()
    ticketCategory!: number;

    @ManyToOne(() => TicketSubCategory, subCategory => subCategory.ticketSubCategoryId)
    @JoinColumn({ name: "ticketSubCategory" })
    @Column()
    ticketSubCategory!: number;

    @ManyToOne(() => TicketTask, task => task.ticketTaskId)
    @JoinColumn({ name: "ticketTask" })
    @Column()
    ticketTask!: number;

    @ManyToOne(() => Sector, sector => sector.sectorId)
    @JoinColumn({ name: "ticketSector" })
    @Column()
    ticketSector!: number;

    @ManyToOne(() => TicketState, state => state.ticketStateId)
    @JoinColumn({ name: "ticketState" })
    @Column()
    ticketState!: number;

    @ManyToOne(() => Order, order => order.orderId)
    @JoinColumn({ name: "ticketOrder" })
    @Column({ nullable: true })
    ticketOrder!: number;

    @Column('text')
    ticketDescription!: string;

    @Column('varchar', { length: 127 })
    contactPhone!: string;

    @Column('varchar', { length: 127 })
    contactComputer!: string;

    @Column('varchar', { length: 127 })
    contactEmail!: string;
    
    @OneToMany(() => TicketUpdate, update => update.ticketUpdateId)
    readonly updates!: TicketUpdate[]
};