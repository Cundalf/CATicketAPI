import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import Sector from './sector.entity';
import EmployeeDevice from './employeeDevice.entity';

@Entity()
export default class Employee {
    @PrimaryGeneratedColumn()
    employeeId!: number;

    @Column()
    employeeRecord!: number;

    @Column()
    employeeDeviceType!: number;

    @Column('varchar', { length: 127 })
    employeeFirstName!: string;

    @Column('varchar', { length: 127 })
    employeeLastName!: string;

    @Column()
    employeeHeadquarter!: number;

    @ManyToOne(() => Sector, sector => sector.sectorId)
    @JoinColumn({ name: 'employeeSector' })
    @Column()
    employeeSector!: number;

    @Column('varchar', { length: 127 })
    employeePhone!: string;

    @Column('varchar', { length: 127 })
    employeeEmail!: string;

    @Column({
        type: 'tinyint',
        default: 1
    })
    state!: boolean;
    
    @OneToMany(() => EmployeeDevice, device => device.employeeDeviceId)
    readonly devices!: EmployeeDevice[]
};