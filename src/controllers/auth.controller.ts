import { Request, Response } from 'express';
import { getRepository, Repository } from "typeorm";
import bcrypt from 'bcrypt';

import User from '../models/entities/user.entity';
import { ISession } from '../interfaces/auth.interface';
import generateJWT from '../helpers/jwt.helper';
import IAuthResponse from '../interfaces/authResponse.interface';

export default class AuthController {

    public async auth(req: Request, res: Response): Promise<void> {
        try {
            const userRepository: Repository<User> = getRepository(User);
            let { email, password } = req.body;

            const userDB: (User | undefined) = await userRepository.findOne({
                where: {
                    userEmail: email
                }
            });

            if (!userDB) {
                const response: IAuthResponse = {
                    error: true,
                    message: 'User or password invalid'
                }

                res.status(403).json(response);
                return;
            }

            const validPassword: boolean = bcrypt.compareSync(password, userDB.userPassword);

            if (!validPassword) {

                const response: IAuthResponse = {
                    error: true,
                    message: 'User or password invalid'
                }

                res.status(403).json(response);
                return;
            }

            if (!userDB.userState) {

                const response: IAuthResponse = {
                    error: true,
                    message: 'User disabled'
                }

                res.status(400).json(response);

                return;
            }

            const sessionData: ISession = {
                userId: userDB.userId,
                userRole: userDB.userRole
            };

            const token: string = await generateJWT(sessionData);

            const response: IAuthResponse = {
                error: false,
                message: 'Login successful',
                token
            }

            res.json(response);

        } catch (error) {

            console.log(error);

            const response: IAuthResponse = {
                error: true,
                message: 'Service not available'
            }

            res.status(500).json(response);
        }
    }
}