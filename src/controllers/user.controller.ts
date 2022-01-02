import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import User, { UserRole } from '../models/entities/user.entity';
import bcrypt from 'bcrypt';
import _ from 'underscore';
import ICrudController from '../interfaces/crudController.interface';
import ICrudResponse from '../interfaces/crudResponse.interface';

export default class UserController implements ICrudController {

    public async getAll(req: Request, res: Response): Promise<void> {
        const userRepository: Repository<User> = getRepository(User);

        const users: User[] = await userRepository.find({
            select: [
                'userId',
                'userFirstName',
                'userLastName',
                'userEmail',
                'userRole',
            ],
            where: {
                userState: true
            }
        });

        const response: ICrudResponse = {
            error: false,
            message: "List of users",
            data: users
        }

        res.json(response);
    };

    public async getOne(req: Request, res: Response): Promise<void> {

        const userRepository: Repository<User> = getRepository(User);

        const { id } = req.params;
        const user: (User | undefined) = await userRepository.findOne(id, {
            select: [
                'userId',
                'userFirstName',
                'userLastName',
                'userEmail',
                'userRole',
            ]
        });

        if (user) {

            const response: ICrudResponse = {
                error: false,
                message: `User #${id} data`,
                data: user
            }

            res.json(response);
        } else {

            const response: ICrudResponse = {
                error: true,
                message: `There is no user with the ID: ${id}`,
                data: null
            }

            res.status(404).json(response);
        }
    }

    public async create(req: Request, res: Response): Promise<void> {

        try {
            const userRepository: Repository<User> = getRepository(User);

            const { body } = req;

            const emailExists: (User | undefined) = await userRepository.findOne({
                where: {
                    userEmail: body.userEmail
                }
            });

            if (emailExists) {
                const response: ICrudResponse = {
                    error: true,
                    message: 'Email already registered: ' + body.userEmail,
                    data: null
                }

                res.status(400).json(response);
                return;
            }

            const salt = bcrypt.genSaltSync();
            body.userPassword = bcrypt.hashSync(body.userPassword, salt);

            if (!body.userRole)
                body.userRole = UserRole.USER;

            const user: User = userRepository.create({ ...body } as Object);
            const results: User = await userRepository.save(user);

            const response: ICrudResponse = {
                error: false,
                message: `User #${results.userId} created`,
                data: null
            }

            res.json(response);

        } catch (error) {
            console.log(error);

            const response: ICrudResponse = {
                error: true,
                message: 'Service not available',
                data: null
            }

            res.status(500).json(response);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { body } = req;

        try {
            const userRepository: Repository<User> = getRepository(User);

            const user: (User | undefined) = await userRepository.findOne(id);
            if (!user) {
                const response: ICrudResponse = {
                    error: true,
                    message: 'There is no user with the ID ' + id,
                    data: null
                }

                res.status(404).json(response);
                return;
            }

            if (body.userPassword) {
                const salt = bcrypt.genSaltSync();
                body.userPassword = bcrypt.hashSync(body.userPassword, salt);
            }

            userRepository.merge(user, body);
            const result: User = await userRepository.save(user);

            const response: ICrudResponse = {
                error: false,
                message: `User #${id} updated`,
                data: {
                    userId: result.userId,
                    userFirstName: result.userFirstName,
                    userLastName: result.userLastName,
                    userRole: result.userRole
                }
            }

            res.json(response);

        } catch (error) {

            console.log(error);

            const response: ICrudResponse = {
                error: true,
                message: 'Service not available',
                data: null
            }

            res.status(500).json(response);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const userRepository: Repository<User> = getRepository(User);

        const user: (User | undefined) = await userRepository.findOne(id);

        if (!user) {

            const response: ICrudResponse = {
                error: true,
                message: 'There is no user with the ID ' + id,
                data: null
            }

            res.status(404).json(response);

            return;
        }

        userRepository.merge(user, { userState: false });
        const results: User = await userRepository.save(user);

        const response: ICrudResponse = {
            error: true,
            message: `User #${results.userId} disabled`,
            data: null
        }

        res.json(response);
    }
}
