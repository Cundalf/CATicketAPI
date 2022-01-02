import { UserRole } from '../models/entities/user.entity';

export default interface ISession {
    userId: number,
    userRole: UserRole
}
