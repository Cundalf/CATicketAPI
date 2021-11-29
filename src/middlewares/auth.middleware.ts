/*
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/database/user.model';

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
            const user = await User.findByPk(decoded.uid);

            if (!user) {
                return res.status(401).json({
                    error: 1,
                    msg: 'Invalid token'
                });
            }

            if (!user.state) {
                return res.status(401).json({
                    error: 1,
                    msg: 'Invalid token'
                });
            }

            res.locals = {
                ...res.locals,
                session: {
                    user: decoded.user,
                    type: decoded.type
                }
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

const validateAdminJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            error: 1,
            msg: 'Token not received'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.PRIVATEKEY);

        const user = await User.findByPk(uid);

        if (!user) {
            return res.status(401).json({
                error: 1,
                msg: 'Invalid token'
            });
        }

        if (!user.state) {
            return res.status(403).json({
                error: 1,
                msg: 'Unauthorized user'
            });
        }

        if (user.role != process.env.ADMINID) {
            return res.status(403).json({
                error: 1,
                msg: 'Unauthorized user'
            });
        }

        req.user = user;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            error: 1,
            msg: 'Invalid token'
        });
    }

};

module.exports = {
    validateJWT,
    validateAdminJWT
};

*/