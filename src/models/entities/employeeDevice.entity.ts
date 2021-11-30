import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import EmployeeDeviceType from './employeeDeviceType.entity';

@Entity()
export default class EmployeeDevice {
    @PrimaryGeneratedColumn()
    employeeDeviceId!: number;

    @Column()
    employeeDeviceName!: string;

    @ManyToOne(() => EmployeeDeviceType, type => type.employeeDeviceTypeId)
    @JoinColumn({ name: "employeeDeviceType" })
    @Column()
    employeeDeviceType!: number;

    @Column()
    deviceSerialNumber!: string;
    
    @Column()
    deviceIp!: string;

    @Column()
    hostname!: string;

    @Column({
        type: 'tinyint',
        default: 1
    })
    state!: boolean;
};