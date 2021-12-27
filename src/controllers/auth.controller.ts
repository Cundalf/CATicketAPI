import { Request, Response } from 'express';
import { getRepository, Repository } from "typeorm";
import User, { UserRole } from '../models/entities/user.entity';
import bcrypt from 'bcrypt';
import { ISession } from '../interfaces/auth.interface';
import generateJWT from '../helpers/jwt.helper';

export default class AuthController {

    public async auth(req: Request, res: Response) {
        try {
            const userRepository: Repository<User> = getRepository(User);
            let { email, password } = req.body;

            const userDB = await userRepository.findOne({
                where: {
                    userEmail: email
                }
            });

            if (!userDB) {
                return res.status(403).json({
                    error: 1,
                    msg: 'User or password invalid'
                });
            }

            const validPassword = bcrypt.compareSync(password, userDB.userPassword);

            if (!validPassword) {
                return res.status(403).json({
                    error: 1,
                    msg: 'User or password invalid'
                });
            }

            if (!userDB.userState) {
                return res.status(400).json({
                    error: 2,
                    msg: 'User disabled'
                });
            }

            const sessionData: ISession = {
                userId: userDB.userId,
                userRole: userDB.userRole
            };

            const token = await generateJWT(sessionData);

            res.json({
                error: 0,
                token
            });

        } catch (error) {
            res.status(500).json({
                error: 3,
                msg: 'Service not available'
            });
        }
    }
}