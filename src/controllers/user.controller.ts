import { Request, Response } from 'express';
import { getRepository, Repository } from "typeorm";
import User, { UserRole } from '../models/entities/user.entity';
import bcrypt from 'bcrypt';
import _ from 'underscore';

export default class UserController {

    public async getAllUsers(req: Request, res: Response) {
        const userRepository: Repository<User> = getRepository(User);

        const users = await userRepository.find({
            where: {
                userState: true
            }
        });

        res.json(users);
    };

    public async getUser(req: Request, res: Response) {

        const userRepository: Repository<User> = getRepository(User);

        const { id } = req.params;
        const user = await userRepository.findOne(id);

        if (user) {
            res.json({
                error: 0,
                data: user
            });
        } else {
            res.status(404).json({
                error: 1,
                msg: `There is no user with the ID: ${id}`
            });
        }
    }

    public async createUser(req: Request, res: Response) {

        try {
            const userRepository: Repository<User> = getRepository(User);

            const { body } = req;

            const emailExists = await userRepository.findOne({
                where: {
                    userEmail: body.userEmail
                }
            });

            if (emailExists) {
                return res.status(400).json({
                    error: 1,
                    msg: 'Email already registered: ' + body.userEmail
                });
            }

            const salt = bcrypt.genSaltSync();
            body.userPassword = bcrypt.hashSync(body.userPassword, salt);

            if (!body.userRole)
                body.userRole = UserRole.USER;

            const user: User[] = await userRepository.create(body);
            const results: User[] = await userRepository.save(user);

            res.json({
                error: 0,
                data: results
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: 1,
                msg: 'Service not available'
            });
        }
    }

    public async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { body } = req;

        try {
            const userRepository: Repository<User> = getRepository(User);

            const user = await userRepository.findOne(id);
            if (!user) {
                return res.status(404).json({
                    error: 1,
                    msg: 'There is no user with the ID ' + id
                });
            }

            if (body.userPassword) {
                const salt = bcrypt.genSaltSync();
                body.userPassword = bcrypt.hashSync(body.userPassword, salt);
            }

            userRepository.merge(user, body);
            const results = await userRepository.save(user);

            res.json({
                error: 0,
                data: results
            });

        } catch (error) {

            console.log(error);
            res.status(500).json({
                error: 1,
                msg: 'Service not available'
            });
        }
    }

    public async deleteUser(req: Request, res: Response) {
        const { id } = req.params;

        const userRepository: Repository<User> = getRepository(User);

        const user = await userRepository.findOne(id);
        if (!user) {
            return res.status(404).json({
                error: 1,
                msg: 'There is no user with the ID ' + id
            });
        }

        userRepository.merge(user, { userState: false });
        const results = await userRepository.save(user);

        res.json({
            error: 0,
            msg: "OK",
            data: results
        });
    }
}
