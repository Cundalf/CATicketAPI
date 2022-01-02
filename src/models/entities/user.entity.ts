export enum UserRole {
    ADMIN = 'admin',
    SUPERVISOR = 'supervisor',
    USER = 'user'
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    userId!: number;
    
    @Column('varchar', { length: 127 })
    userFirstName!: string;
    
    @Column('varchar', { length: 127 })
    userLastName!: string;
    
    @Column('varchar', { length: 127 })
    userEmail!: string;
    
    @Column('text')
    userPassword!: string;
    
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER
    })
    userRole!: UserRole;
    
    @Column({
        type: 'tinyint',
        default: 1
    })
    userState!: boolean;
};