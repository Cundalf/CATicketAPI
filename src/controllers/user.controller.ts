import { Request, Response } from 'express';
import { getRepository, Repository } from "typeorm";
import User, { UserRole } from '../models/entities/user.entity';
import bcrypt from 'bcrypt';
import _ from 'underscore';

export default class UserController {

    public async getAllUsers(req: Request, res: Response) {
        const userRepository: Repository<User> = getRepository(User);

        const users = await userRepository.find();

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
                    email: body.email
                }
            });

            if (emailExists) {
                return res.status(400).json({
                    error: 1,
                    msg: 'Email already registered: ' + body.email
                });
            }

            const salt = bcrypt.genSaltSync();
            body.password = bcrypt.hashSync(body.password, salt);

            if (_.isUndefined(body.role))
                body.role = UserRole.USER;

            /*let user = new User();
            user.userEmail = body.email;
            user.userFirstName = body.firstName;
            user.userLastName = body.lastName;
            user.userPassword = body.password;
            user.userRole = body.role;
            user.state = true;*/

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

            const salt = bcrypt.genSaltSync();
            body.password = bcrypt.hashSync(body.password, salt);

            /*
            if (!_.isUndefined(body.id))
                delete body.id;
            */

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

        userRepository.merge(user, { state: false });
        const results = await userRepository.save(user);

        //await user.update({ state: 0 });
        res.json({
            error: 0,
            msg: "OK",
            data: results
        });
    }
}
