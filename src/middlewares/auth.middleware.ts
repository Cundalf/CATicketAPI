import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserRole } from '../models/entities/user.entity';
import { Repository, getRepository } from 'typeorm';
import { ISession } from '../interfaces/auth.interface';

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            error: 1,
            msg: 'Token not received'
        });
    }

    jwt.verify(token, process.env.SEED_TOKEN || 'T0k3nD3f49lt', async (err, decoded) => {

        if (err || !decoded) {
            return res.status(401).json({
                status: false,
                err: {
                    message: 'Invalid Token'
                }
            });
        }

        try {
            const userRepository: Repository<User> = getRepository(User);

            const user = await userRepository.findOne(decoded.userId);

            if (!user) {
                return res.status(401).json({
                    error: 1,
                    msg: 'Invalid token'
                });
            }

            if (!user.userState) {
                return res.status(401).json({
                    error: 1,
                    msg: 'Invalid token'
                });
            }

            const session: ISession = {
                userId: decoded.userId,
                userRole: decoded.userRole
            }

            res.locals = {
                ...res.locals,
                session
            };

            next();

        } catch (error) {

            console.log(error);
            res.status(401).json({
                error: 1,
                msg: 'Invalid token'
            });
        }
    });
};

export const validateAdminJWT = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            error: 1,
            msg: 'Token not received'
        });
    }

    jwt.verify(token, process.env.SEED_TOKEN || 'T0k3nD3f49lt', async (err, decoded) => {

        if (err || !decoded) {
            return res.status(401).json({
                status: false,
                err: {
                    message: 'Invalid Token'
                }
            });
        }

        try {

            const userRepository: Repository<User> = getRepository(User);
            const user = await userRepository.findOne(decoded.userId);

            if (!user) {
                return res.status(401).json({
                    error: 1,
                    msg: 'Invalid token'
                });
            }

            if (!user.userState) {
                return res.status(403).json({
                    error: 1,
                    msg: 'Unauthorized user'
                });
            }

            if (user.userRole != UserRole.ADMIN) {
                return res.status(403).json({
                    error: 1,
                    msg: 'Unauthorized user'
                });
            }

            const session: ISession = {
                userId: decoded.userId,
                userRole: decoded.userRole
            }

            res.locals = {
                ...res.locals,
                session
            };
            next();

        } catch (error) {

            console.log(error);
            res.status(401).json({
                error: 1,
                msg: 'Invalid token'
            });
        }
    });
};

module.exports = {
    validateJWT,
    validateAdminJWT
};