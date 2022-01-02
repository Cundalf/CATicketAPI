import { UserRole } from '../models/entities/user.entity';

export interface ISession {
    userId: number,
    userRole: UserRole
}
